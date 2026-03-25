// Storage utilities — chrome.storage.local wrappers

export function storageGet(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => resolve(result[key]));
  });
}

export function storageSet(key, value) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, resolve);
  });
}

export function storageRemove(key) {
  return new Promise((resolve) => {
    chrome.storage.local.remove(key, resolve);
  });
}

export function storageClear() {
  return new Promise((resolve) => {
    chrome.storage.local.clear(resolve);
  });
}

// --- API Keys (obfuscated with btoa) ---

export async function saveGroqKey(key) {
  await storageSet('groq_key', btoa(key));
}

export async function getGroqKey() {
  const raw = await storageGet('groq_key');
  if (!raw) return null;
  try { return atob(raw); } catch { return null; }
}

export async function saveGithubToken(token) {
  await storageSet('github_token', btoa(token));
}

export async function getGithubToken() {
  const raw = await storageGet('github_token');
  if (!raw) return null;
  try { return atob(raw); } catch { return null; }
}

// --- Favorites ---

export async function getFavorites() {
  return (await storageGet('favorites')) || [];
}

export async function saveFavorite(fav) {
  const favs = await getFavorites();
  const idx = favs.findIndex(f => f.repoFullName === fav.repoFullName);
  if (idx >= 0) {
    favs[idx] = { ...favs[idx], ...fav };
  } else {
    favs.push({ id: Date.now().toString(), savedAt: new Date().toISOString(), ...fav });
  }
  await storageSet('favorites', favs);
}

export async function removeFavorite(repoFullName) {
  const favs = await getFavorites();
  await storageSet('favorites', favs.filter(f => f.repoFullName !== repoFullName));
}

export async function isFavorite(repoFullName) {
  const favs = await getFavorites();
  return favs.some(f => f.repoFullName === repoFullName);
}

// --- Folders ---

export async function getFolders() {
  return (await storageGet('folders')) || [];
}

export async function saveFolder(folder) {
  const folders = await getFolders();
  const idx = folders.findIndex(f => f.id === folder.id);
  if (idx >= 0) {
    folders[idx] = folder;
  } else {
    folders.push({ id: Date.now().toString(), createdAt: new Date().toISOString(), ...folder });
  }
  await storageSet('folders', folders);
}

export async function deleteFolder(folderId) {
  const folders = await getFolders();
  await storageSet('folders', folders.filter(f => f.id !== folderId));
  const favs = await getFavorites();
  const updated = favs.map(f => f.folderId === folderId ? { ...f, folderId: null } : f);
  await storageSet('favorites', updated);
}

// --- Cache (TTL 30 min) ---

const CACHE_TTL = 30 * 60 * 1000;

export async function getCached(queryKey) {
  const cache = (await storageGet('cache')) || {};
  const entry = cache[queryKey];
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) return null;
  return entry.data;
}

export async function setCache(queryKey, data) {
  const cache = (await storageGet('cache')) || {};
  cache[queryKey] = { data, timestamp: Date.now() };
  await storageSet('cache', cache);
}

export async function clearCache() {
  await storageRemove('cache');
}

// --- Preferences ---

const DEFAULT_PREFS = {
  language: 'fr',
  resultsPerPage: 10,
  model: 'llama-3.3-70b-versatile'
};

export async function getPrefs() {
  const stored = (await storageGet('prefs')) || {};
  return { ...DEFAULT_PREFS, ...stored };
}

export async function savePrefs(prefs) {
  const current = await getPrefs();
  await storageSet('prefs', { ...current, ...prefs });
}

// --- Storage usage ---

export function getStorageUsage() {
  return new Promise((resolve) => {
    chrome.storage.local.getBytesInUse(null, resolve);
  });
}

// --- Search History ---

const MAX_HISTORY = 50;

export async function addSearchHistory(entry) {
  const history = (await storageGet('search_history')) || [];
  history.unshift({ ...entry, timestamp: Date.now() });
  if (history.length > MAX_HISTORY) history.splice(MAX_HISTORY);
  await storageSet('search_history', history);
}

export async function getSearchHistory() {
  return (await storageGet('search_history')) || [];
}
