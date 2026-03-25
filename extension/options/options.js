import {
  saveGroqKey, getGroqKey, saveGithubToken, getGithubToken,
  getPrefs, savePrefs, getFavorites, getFolders, getSearchHistory,
  getStorageUsage, clearCache, storageClear
} from '../utils/storage.js';
import { GROQ_MODELS } from '../utils/groq.js';

// --- Onboarding ---
const params = new URLSearchParams(location.search);
if (params.get('onboarding') === 'true') {
  document.getElementById('onboarding-banner').classList.add('visible');
}

// --- Nav ---
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(n => n.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    item.classList.add('active');
    document.getElementById(`section-${item.dataset.section}`).classList.add('active');
    if (item.dataset.section === 'data') loadDataStats();
  });
});

// --- Toast ---
function showToast(msg, type = 'ok') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => { toast.classList.remove('show'); }, 2500);
}

// --- Show/hide toggle ---
function setupToggle(inputId, btnId) {
  const input = document.getElementById(inputId);
  const btn = document.getElementById(btnId);
  btn.addEventListener('click', () => {
    input.type = input.type === 'password' ? 'text' : 'password';
  });
}

setupToggle('groq-key-input', 'groq-show-btn');
setupToggle('github-token-input', 'github-show-btn');

// --- Load existing keys (mask) ---
async function loadKeys() {
  const groqKey = await getGroqKey();
  if (groqKey) {
    document.getElementById('groq-key-input').value = '•'.repeat(24);
    const badge = document.getElementById('groq-status');
    badge.textContent = 'Configurée ✓';
    badge.className = 'status-badge configured';
  }
  const githubToken = await getGithubToken();
  if (githubToken) {
    document.getElementById('github-token-input').value = '•'.repeat(24);
    const badge = document.getElementById('github-status');
    badge.textContent = 'Configuré ✓';
    badge.className = 'status-badge configured';
  }
}

loadKeys();

// --- Groq Save ---
document.getElementById('groq-save-btn').addEventListener('click', async () => {
  const val = document.getElementById('groq-key-input').value.trim();
  if (!val || val.startsWith('•')) return showToast('Entrez une nouvelle clé', 'err');
  await saveGroqKey(val);
  document.getElementById('groq-key-input').value = '•'.repeat(24);
  const badge = document.getElementById('groq-status');
  badge.textContent = 'Configurée ✓';
  badge.className = 'status-badge configured';
  showToast('Clé Groq enregistrée');
});

// --- Groq Validate ---
document.getElementById('groq-validate-btn').addEventListener('click', async () => {
  const val = document.getElementById('groq-key-input').value.trim();
  const msg = document.getElementById('groq-validate-msg');
  if (!val || val.startsWith('•')) {
    const stored = await getGroqKey();
    if (!stored) return (msg.textContent = 'Aucune clé à valider', msg.className = 'validate-msg err');
    const result = await sendMessage({ type: 'VALIDATE_GROQ_KEY', key: stored });
    msg.textContent = result.valid ? '✓ Clé valide' : `✗ ${result.error}`;
    msg.className = `validate-msg ${result.valid ? 'ok' : 'err'}`;
    return;
  }
  const result = await sendMessage({ type: 'VALIDATE_GROQ_KEY', key: val });
  msg.textContent = result.valid ? '✓ Clé valide' : `✗ ${result.error}`;
  msg.className = `validate-msg ${result.valid ? 'ok' : 'err'}`;
});

// --- GitHub Save ---
document.getElementById('github-save-btn').addEventListener('click', async () => {
  const val = document.getElementById('github-token-input').value.trim();
  if (!val || val.startsWith('•')) return showToast('Entrez un nouveau token', 'err');
  await saveGithubToken(val);
  document.getElementById('github-token-input').value = '•'.repeat(24);
  const badge = document.getElementById('github-status');
  badge.textContent = 'Configuré ✓';
  badge.className = 'status-badge configured';
  showToast('Token GitHub enregistré');
});

// --- GitHub Validate ---
document.getElementById('github-validate-btn').addEventListener('click', async () => {
  const val = document.getElementById('github-token-input').value.trim();
  const msg = document.getElementById('github-validate-msg');
  const key = val && !val.startsWith('•') ? val : await getGithubToken();
  if (!key) return (msg.textContent = 'Aucun token à valider', msg.className = 'validate-msg err');
  const result = await sendMessage({ type: 'VALIDATE_GITHUB_TOKEN', token: key });
  msg.textContent = result.valid ? `✓ @${result.login}` : `✗ ${result.error}`;
  msg.className = `validate-msg ${result.valid ? 'ok' : 'err'}`;
});

// --- AI Model ---
const modelList = document.getElementById('model-list');
let selectedModel = null;

async function buildModelCards() {
  const prefs = await getPrefs();
  selectedModel = prefs.model;
  modelList.innerHTML = '';
  GROQ_MODELS.forEach(model => {
    const card = document.createElement('div');
    card.className = `model-card ${model.id === selectedModel ? 'selected' : ''}`;
    card.dataset.id = model.id;
    card.innerHTML = `
      <div class="radio-dot"></div>
      <div class="model-info">
        <div class="model-name">${escHtml(model.name)}</div>
        <div class="model-speed">${escHtml(model.speed)}</div>
      </div>
      <span class="model-status ${model.status}">${escHtml(model.status)}</span>
    `;
    card.addEventListener('click', () => {
      document.querySelectorAll('.model-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedModel = model.id;
    });
    modelList.appendChild(card);
  });
}

buildModelCards();

document.getElementById('save-model-btn').addEventListener('click', async () => {
  if (!selectedModel) return;
  await savePrefs({ model: selectedModel });
  showToast('Modèle enregistré');
});

// --- Preferences ---
async function loadPrefs() {
  const prefs = await getPrefs();
  document.getElementById('pref-language').value = prefs.language || 'fr';
  document.getElementById('pref-results').value = String(prefs.resultsPerPage || 10);
}

loadPrefs();

document.getElementById('save-prefs-btn').addEventListener('click', async () => {
  await savePrefs({
    language: document.getElementById('pref-language').value,
    resultsPerPage: parseInt(document.getElementById('pref-results').value)
  });
  showToast('Préférences enregistrées');
});

// --- Data stats ---
async function loadDataStats() {
  const [favs, folders, history, usage] = await Promise.all([
    getFavorites(), getFolders(), getSearchHistory(), getStorageUsage()
  ]);
  document.getElementById('stat-favs').textContent = favs.length;
  document.getElementById('stat-folders').textContent = folders.length;
  document.getElementById('stat-history').textContent = history.length;
  const kb = (usage / 1024).toFixed(1);
  const display = usage > 1024 * 1024 ? `${(usage / 1024 / 1024).toFixed(1)}M` : `${kb}K`;
  document.getElementById('stat-storage').textContent = display;
}

// --- Export ---
document.getElementById('export-json-btn').addEventListener('click', async () => {
  const [favs, folders] = await Promise.all([getFavorites(), getFolders()]);
  const blob = new Blob([JSON.stringify({ favorites: favs, folders }, null, 2)], { type: 'application/json' });
  downloadBlob(blob, 'reporadar-export.json');
  showToast('Export JSON téléchargé');
});

document.getElementById('export-md-btn').addEventListener('click', async () => {
  const [favs, folders] = await Promise.all([getFavorites(), getFolders()]);
  let md = '# RepoRadar — Favoris\n\n';
  const folderMap = {};
  folders.forEach(f => { folderMap[f.id] = f; });
  const grouped = {};
  favs.forEach(f => {
    const key = f.folderId || '__none__';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(f);
  });
  for (const [folderId, items] of Object.entries(grouped)) {
    const folder = folderMap[folderId];
    md += `## ${folder ? `${folder.icon} ${folder.name}` : '📎 Sans dossier'}\n\n`;
    items.forEach(item => {
      md += `- [${item.repoFullName}](${item.repoUrl}) ⭐${item.repoStars || 0}`;
      if (item.repoLanguage) md += ` · ${item.repoLanguage}`;
      if (item.personalNote) md += `\n  > ${item.personalNote}`;
      md += '\n';
    });
    md += '\n';
  }
  const blob = new Blob([md], { type: 'text/markdown' });
  downloadBlob(blob, 'reporadar-export.md');
  showToast('Export Markdown téléchargé');
});

document.getElementById('clear-cache-btn').addEventListener('click', async () => {
  await clearCache();
  showToast('Cache vidé');
});

document.getElementById('clear-all-btn').addEventListener('click', async () => {
  if (!confirm('Tout effacer ? Cette action est irréversible.')) return;
  await storageClear();
  showToast('Données effacées');
  await loadKeys();
  await buildModelCards();
  await loadPrefs();
});

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// --- Messaging ---
function sendMessage(msg) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(msg, resolve);
  });
}

function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
