import {
  getFavorites, saveFavorite, removeFavorite,
  getFolders, saveFolder, deleteFolder
} from '../utils/storage.js';

const EMOJIS = ['📁', '⚡', '🔧', '🎨', '🚀', '📦', '🔬', '💡', '🌐', '🎯'];

let allFavs = [];
let allFolders = [];
let activeFolder = 'all';
let searchQuery = '';
let editingRepoName = null;
let selectedEmoji = EMOJIS[0];

// --- DOM ---
const favGrid = document.getElementById('fav-grid');
const emptyFavs = document.getElementById('empty-favs');
const folderList = document.getElementById('folder-list');
const countAll = document.getElementById('count-all');
const countNone = document.getElementById('count-none');
const favSearch = document.getElementById('fav-search');

const newFolderModal = document.getElementById('new-folder-modal');
const editNoteModal = document.getElementById('edit-note-modal');
const emojiPicker = document.getElementById('emoji-picker');

// --- Init ---
async function init() {
  allFavs = await getFavorites();
  allFolders = await getFolders();
  buildEmojiPicker();
  renderFolderSidebar();
  renderCards();
}

function buildEmojiPicker() {
  emojiPicker.innerHTML = '';
  EMOJIS.forEach(emoji => {
    const btn = document.createElement('button');
    btn.className = `emoji-btn${emoji === selectedEmoji ? ' selected' : ''}`;
    btn.textContent = emoji;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedEmoji = emoji;
    });
    emojiPicker.appendChild(btn);
  });
}

// --- Sidebar ---
function renderFolderSidebar() {
  countAll.textContent = allFavs.length;
  const noFolder = allFavs.filter(f => !f.folderId).length;
  countNone.textContent = noFolder;

  folderList.innerHTML = '';
  allFolders.forEach(folder => {
    const count = allFavs.filter(f => f.folderId === folder.id).length;
    const item = document.createElement('div');
    item.className = `folder-item${activeFolder === folder.id ? ' active' : ''}`;
    item.dataset.folder = folder.id;
    item.innerHTML = `
      <span class="folder-icon">${escHtml(folder.icon)}</span>
      <span class="folder-name">${escHtml(folder.name)}</span>
      <span class="folder-count">${count}</span>
      <button class="folder-delete" data-id="${escHtml(folder.id)}" title="Supprimer">×</button>
    `;
    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('folder-delete')) return;
      setActiveFolder(folder.id);
    });
    item.querySelector('.folder-delete').addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!confirm(`Supprimer le dossier "${folder.name}" ?`)) return;
      await deleteFolder(folder.id);
      allFolders = await getFolders();
      allFavs = await getFavorites();
      if (activeFolder === folder.id) activeFolder = 'all';
      renderFolderSidebar();
      renderCards();
    });
    folderList.appendChild(item);
  });

  document.querySelectorAll('.folder-item').forEach(item => {
    item.classList.toggle('active', item.dataset.folder === activeFolder);
  });
}

function setActiveFolder(id) {
  activeFolder = id;
  renderFolderSidebar();
  renderCards();
}

// --- Static sidebar items ---
document.querySelectorAll('.folder-item[data-folder]').forEach(item => {
  item.addEventListener('click', () => {
    if (item.dataset.folder === 'all' || item.dataset.folder === 'none') {
      setActiveFolder(item.dataset.folder);
    }
  });
});

// --- Search ---
favSearch.addEventListener('input', () => {
  searchQuery = favSearch.value.toLowerCase();
  renderCards();
});

// --- Render cards ---
function filteredFavs() {
  let favs = allFavs;
  if (activeFolder === 'none') favs = favs.filter(f => !f.folderId);
  else if (activeFolder !== 'all') favs = favs.filter(f => f.folderId === activeFolder);
  if (searchQuery) {
    favs = favs.filter(f =>
      f.repoFullName?.toLowerCase().includes(searchQuery) ||
      f.personalNote?.toLowerCase().includes(searchQuery) ||
      (f.tags || []).some(t => t.toLowerCase().includes(searchQuery))
    );
  }
  return favs;
}

function renderCards() {
  const favs = filteredFavs();
  favGrid.innerHTML = '';
  emptyFavs.classList.toggle('hidden', favs.length > 0);

  favs.forEach(fav => {
    const card = document.createElement('div');
    card.className = 'fav-card';
    const date = new Date(fav.savedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
    const tagsHtml = (fav.tags || []).map(t => `<span class="fav-tag">${escHtml(t)}</span>`).join('');
    const starsHtml = fav.repoStars ? `<span class="fav-stars">★ ${formatStars(fav.repoStars)}</span>` : '';
    const langHtml = fav.repoLanguage ? `<span class="fav-lang">${escHtml(fav.repoLanguage)}</span>` : '';

    card.innerHTML = `
      <div class="fav-card-top">
        <a href="${escHtml(fav.repoUrl)}" class="fav-repo-name" target="_blank">${escHtml(fav.repoFullName)}</a>
        <div class="fav-meta">${starsHtml}${langHtml}</div>
      </div>
      <p class="personal-note${!fav.personalNote ? ' empty' : ''}">${escHtml(fav.personalNote || '')}</p>
      ${tagsHtml ? `<div class="fav-tags">${tagsHtml}</div>` : ''}
      <div class="fav-card-footer">
        <span class="saved-date">${date}</span>
        <div class="fav-actions">
          <button class="btn-sm note-btn" data-name="${escHtml(fav.repoFullName)}">Note</button>
          <a href="${escHtml(fav.repoUrl)}" class="btn-sm" target="_blank">Ouvrir ↗</a>
          <button class="btn-sm delete" data-name="${escHtml(fav.repoFullName)}">✕</button>
        </div>
      </div>
    `;

    card.querySelector('.note-btn').addEventListener('click', () => openNoteModal(fav));
    card.querySelector('.delete').addEventListener('click', async () => {
      await removeFavorite(fav.repoFullName);
      allFavs = await getFavorites();
      renderFolderSidebar();
      renderCards();
    });

    favGrid.appendChild(card);
  });
}

function formatStars(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

// --- Note modal ---
function openNoteModal(fav) {
  editingRepoName = fav.repoFullName;
  document.getElementById('note-textarea').value = fav.personalNote || '';
  document.getElementById('tags-input').value = (fav.tags || []).join(', ');
  editNoteModal.classList.add('open');
}

document.getElementById('cancel-note-btn').addEventListener('click', () => {
  editNoteModal.classList.remove('open');
  editingRepoName = null;
});

document.getElementById('save-note-btn').addEventListener('click', async () => {
  if (!editingRepoName) return;
  const note = document.getElementById('note-textarea').value.trim();
  const tagsRaw = document.getElementById('tags-input').value.trim();
  const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
  const existing = allFavs.find(f => f.repoFullName === editingRepoName);
  if (existing) {
    await saveFavorite({ ...existing, personalNote: note, tags });
    allFavs = await getFavorites();
    renderCards();
  }
  editNoteModal.classList.remove('open');
  editingRepoName = null;
});

// --- Folder modal ---
document.getElementById('new-folder-btn').addEventListener('click', () => {
  document.getElementById('folder-name-input').value = '';
  selectedEmoji = EMOJIS[0];
  buildEmojiPicker();
  newFolderModal.classList.add('open');
});

document.getElementById('cancel-folder-btn').addEventListener('click', () => {
  newFolderModal.classList.remove('open');
});

document.getElementById('create-folder-btn').addEventListener('click', async () => {
  const name = document.getElementById('folder-name-input').value.trim();
  if (!name) return;
  await saveFolder({ name, icon: selectedEmoji });
  allFolders = await getFolders();
  renderFolderSidebar();
  newFolderModal.classList.remove('open');
});

// Close modals on overlay click
[newFolderModal, editNoteModal].forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
});

function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

init();
