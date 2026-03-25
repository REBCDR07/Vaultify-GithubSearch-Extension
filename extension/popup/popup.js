import { isFavorite, saveFavorite, removeFavorite } from '../utils/storage.js';

// --- DOM refs ---
const searchInput = document.getElementById('search-input');
const clearBtn = document.getElementById('clear-btn');
const filterToggle = document.getElementById('filter-toggle');
const filterPanel = document.getElementById('filter-panel');
const filterReset = document.getElementById('filter-reset');
const stateEmpty = document.getElementById('state-empty');
const stateLoading = document.getElementById('state-loading');
const stateError = document.getElementById('state-error');
const stateResults = document.getElementById('state-results');
const errorMsg = document.getElementById('error-msg');
const cardList = document.getElementById('card-list');
const suggestionsArea = document.getElementById('suggestions-area');
const resultsCountNum = document.getElementById('results-count-num');
const rateLimitInfo = document.getElementById('rate-limit-info');
const notConfiguredBanner = document.getElementById('not-configured-banner');
const settingsBtn = document.getElementById('settings-btn');
const favPageBtn = document.getElementById('fav-page-btn');
const pills = document.querySelectorAll('.pill');

// Filter selects
const filterLanguage = document.getElementById('filter-language');
const filterStars = document.getElementById('filter-stars');
const filterUpdated = document.getElementById('filter-updated');
const filterLicense = document.getElementById('filter-license');

let debounceTimer = null;
let loadingTimer = null;
let activePill = null;

// --- Init ---
async function init() {
  const status = await sendMessage({ type: 'GET_STATUS' });
  if (!status.hasGroqKey) {
    notConfiguredBanner.classList.remove('hidden');
  }
}

// --- Messaging ---
function sendMessage(msg) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(msg, resolve);
  });
}

// --- Loading steps ---
function startLoadingAnimation() {
  const steps = document.querySelectorAll('.load-step');
  steps.forEach(s => { s.classList.remove('active', 'done'); });
  let current = 0;
  steps[0].classList.add('active');

  loadingTimer = setInterval(() => {
    if (current < steps.length - 1) {
      steps[current].classList.remove('active');
      steps[current].classList.add('done');
      current++;
      steps[current].classList.add('active');
    }
  }, 1200);
}

function stopLoadingAnimation() {
  if (loadingTimer) { clearInterval(loadingTimer); loadingTimer = null; }
  document.querySelectorAll('.load-step').forEach(s => {
    s.classList.remove('active', 'done');
  });
}

// --- States ---
function showState(name) {
  stateEmpty.classList.add('hidden');
  stateLoading.classList.add('hidden');
  stateError.classList.add('hidden');
  stateResults.classList.add('hidden');
  if (name === 'empty') stateEmpty.classList.remove('hidden');
  else if (name === 'loading') stateLoading.classList.remove('hidden');
  else if (name === 'error') stateError.classList.remove('hidden');
  else if (name === 'results') stateResults.classList.remove('hidden');
}

// --- Search ---
function getFilters() {
  const f = {};
  if (filterLanguage.value) f.language = filterLanguage.value;
  if (filterStars.value) f.stars = `>${filterStars.value}`;
  if (filterUpdated.value) f.pushed = `>${filterUpdated.value}`;
  if (filterLicense.value) f.license = filterLicense.value;
  return f;
}

async function doSearch(query) {
  if (!query || query.length < 3) { showState('empty'); return; }

  showState('loading');
  startLoadingAnimation();

  const filters = getFilters();
  const result = await sendMessage({ type: 'SEARCH', query, filters });

  stopLoadingAnimation();

  if (result.error) {
    errorMsg.textContent = result.error;
    showState('error');
    return;
  }

  renderResults(result);
}

// --- Render ---
async function renderResults({ repos, summaries, suggestions, rateLimit }) {
  showState('results');
  resultsCountNum.textContent = repos.length;

  if (rateLimit) {
    const rem = parseInt(rateLimit.remaining);
    rateLimitInfo.textContent = `${rateLimit.remaining}/${rateLimit.limit} req`;
    rateLimitInfo.className = 'rate-limit' + (rem < 10 ? ' low' : '');
  }

  suggestionsArea.innerHTML = '';
  if (suggestions && suggestions.length > 0) {
    suggestions.forEach(s => {
      const chip = document.createElement('button');
      chip.className = 'suggestion-chip';
      chip.textContent = s;
      chip.addEventListener('click', () => {
        searchInput.value = s;
        clearBtn.classList.add('visible');
        doSearch(s);
      });
      suggestionsArea.appendChild(chip);
    });
  }

  cardList.innerHTML = '';
  for (const repo of repos) {
    const card = await buildCard(repo, summaries?.[repo.full_name]);
    cardList.appendChild(card);
  }
}

async function buildCard(repo, summary) {
  const fav = await isFavorite(repo.full_name);

  const card = document.createElement('div');
  card.className = 'repo-card';
  card.dataset.repoName = repo.full_name;

  const langBadge = repo.language ? `<span class="lang-badge">${escHtml(repo.language)}</span>` : '';

  const aiBox = summary ? `
    <div class="ai-summary">
      <div class="ai-what"><span class="sparkle">✦</span><span>${escHtml(summary.what || '')}</span></div>
      <div class="ai-tags">
        ${summary.stack ? `<span class="ai-tag">${escHtml(summary.stack)}</span>` : ''}
        ${summary.strengths ? `<span class="ai-tag">${escHtml(summary.strengths)}</span>` : ''}
      </div>
    </div>` : '';

  const topics = (repo.topics || []).slice(0, 5).map(t =>
    `<span class="topic-pill">${escHtml(t)}</span>`
  ).join('');

  card.innerHTML = `
    <div class="card-top">
      <a href="${escHtml(repo.url)}" class="repo-name" target="_blank">${escHtml(repo.full_name)}</a>
      <div class="card-meta">
        <span class="stars">★ ${escHtml(repo.starsFormatted)}</span>
        ${langBadge}
      </div>
    </div>
    ${repo.description ? `<p class="repo-desc">${escHtml(repo.description)}</p>` : ''}
    ${aiBox}
    ${topics ? `<div class="topics">${topics}</div>` : ''}
    <div class="card-footer">
      <span class="pushed-ago">${escHtml(repo.pushedAgo)}</span>
      <div class="card-actions">
        <button class="btn-small fav-btn ${fav ? 'active' : ''}" data-repo='${JSON.stringify(repo)}'>
          <svg viewBox="0 0 24 24" fill="${fav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          Favori
        </button>
        <a class="btn-small" href="${escHtml(repo.url)}" target="_blank">Ouvrir ↗</a>
      </div>
    </div>
  `;

  card.querySelector('.fav-btn').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    const repoData = JSON.parse(btn.dataset.repo);
    const currently = await isFavorite(repoData.full_name);
    if (currently) {
      await removeFavorite(repoData.full_name);
      btn.classList.remove('active');
      btn.querySelector('svg').setAttribute('fill', 'none');
    } else {
      await saveFavorite({
        repoFullName: repoData.full_name,
        repoUrl: repoData.url,
        repoStars: repoData.stars,
        repoLanguage: repoData.language,
        repoTopics: repoData.topics,
        aiSummary: summary || null,
        personalNote: '',
        tags: [],
        folderId: null
      });
      btn.classList.add('active');
      btn.querySelector('svg').setAttribute('fill', 'currentColor');
    }
  });

  return card;
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// --- Event listeners ---
searchInput.addEventListener('input', () => {
  const val = searchInput.value.trim();
  clearBtn.classList.toggle('visible', val.length > 0);
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => doSearch(val), 600);
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.classList.remove('visible');
  showState('empty');
  if (activePill) { activePill.classList.remove('active'); activePill = null; }
});

filterToggle.addEventListener('click', () => {
  filterPanel.classList.toggle('open');
  filterToggle.classList.toggle('active');
});

filterReset.addEventListener('click', () => {
  filterLanguage.value = '';
  filterStars.value = '';
  filterUpdated.value = '';
  filterLicense.value = '';
});

pills.forEach(pill => {
  pill.addEventListener('click', () => {
    if (activePill) activePill.classList.remove('active');
    pill.classList.add('active');
    activePill = pill;
    const query = pill.dataset.query;
    searchInput.value = query;
    clearBtn.classList.add('visible');
    doSearch(query);
  });
});

settingsBtn.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

favPageBtn.addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('favorites/favorites.html') });
});

notConfiguredBanner.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

init();
