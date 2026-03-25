import { getGroqKey, getGithubToken, getCached, setCache, addSearchHistory, getPrefs } from '../utils/storage.js';
import { reformulateQuery, scoreRepositories, generateSummaries } from '../utils/groq.js';
import { parallelSearch } from '../utils/github.js';

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: chrome.runtime.getURL('options/options.html?onboarding=true') });
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  handleMessage(message).then(sendResponse).catch((err) => {
    sendResponse({ error: err.message || 'Erreur inconnue' });
  });
  return true;
});

async function handleMessage(message) {
  const { type } = message;

  if (type === 'GET_STATUS') {
    const groqKey = await getGroqKey();
    const githubToken = await getGithubToken();
    return {
      hasGroqKey: !!groqKey,
      hasGithubToken: !!githubToken,
      ready: !!groqKey
    };
  }

  if (type === 'VALIDATE_GROQ_KEY') {
    const { key } = message;
    try {
      const response = await fetch('https://api.groq.com/openai/v1/models', {
        headers: { 'Authorization': `Bearer ${key}` }
      });
      if (response.ok) return { valid: true };
      return { valid: false, error: 'Clé API invalide.' };
    } catch {
      return { valid: false, error: 'Impossible de joindre l\'API Groq.' };
    }
  }

  if (type === 'VALIDATE_GITHUB_TOKEN') {
    const { token } = message;
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        return { valid: true, login: data.login };
      }
      return { valid: false, error: 'Token GitHub invalide.' };
    } catch {
      return { valid: false, error: 'Impossible de joindre l\'API GitHub.' };
    }
  }

  if (type === 'SEARCH') {
    return await handleSearch(message);
  }

  throw new Error(`Type de message inconnu: ${type}`);
}

async function handleSearch({ query, filters = {} }) {
  const cacheKey = `search:${query}:${JSON.stringify(filters)}`;
  const cached = await getCached(cacheKey);
  if (cached) return { ...cached, fromCache: true };

  const apiKey = await getGroqKey();
  const token = await getGithubToken();
  const prefs = await getPrefs();

  if (!apiKey) throw new Error('Clé Groq non configurée. Accédez aux paramètres pour la configurer.');

  const model = prefs.model || 'llama-3.3-70b-versatile';
  const totalUsage = { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };

  function accumulateUsage(usage) {
    if (!usage) return;
    totalUsage.prompt_tokens += usage.prompt_tokens || 0;
    totalUsage.completion_tokens += usage.completion_tokens || 0;
    totalUsage.total_tokens += usage.total_tokens || 0;
  }

  // Step 1: Reformulate query
  const { queries, suggestions, usage: u1 } = await reformulateQuery({ apiKey, model, userQuery: query, filters });
  accumulateUsage(u1);

  // Step 2: Parallel GitHub search
  const { repos: allRepos, rateLimit } = await parallelSearch({ queries, token });

  // Step 3: Score repositories
  let topRepos = allRepos;
  if (allRepos.length > 0) {
    const { indices, usage: u3 } = await scoreRepositories({ apiKey, model, userQuery: query, repos: allRepos });
    accumulateUsage(u3);
    topRepos = indices.map(i => allRepos[i]).filter(Boolean);
    if (topRepos.length === 0) topRepos = allRepos.slice(0, 10);
  } else {
    topRepos = [];
  }

  // Step 4: Generate summaries
  let summaries = {};
  if (topRepos.length > 0) {
    const { summaries: s, usage: u4 } = await generateSummaries({ apiKey, model, userQuery: query, repos: topRepos });
    accumulateUsage(u4);
    summaries = s;
  }

  const result = {
    repos: topRepos,
    summaries,
    suggestions,
    queries,
    rateLimit,
    totalUsage,
    fromCache: false
  };

  await setCache(cacheKey, result);
  await addSearchHistory({ query, resultCount: topRepos.length });

  return result;
}
