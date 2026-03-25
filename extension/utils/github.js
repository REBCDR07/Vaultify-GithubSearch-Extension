// GitHub API utilities

const GH_API = 'https://api.github.com';

function githubHeaders(token) {
  const h = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  };
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
}

export async function searchRepositories({ query, token, perPage = 30, page = 1 }) {
  const url = `${GH_API}/search/repositories?q=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}&sort=stars&order=desc`;
  const response = await fetch(url, { headers: githubHeaders(token) });

  if (response.status === 401) {
    throw new Error('Token GitHub invalide. Veuillez vérifier vos paramètres.');
  }
  if (response.status === 403) {
    throw new Error('Limite de taux GitHub atteinte. Ajoutez un token pour augmenter la limite.');
  }
  if (!response.ok) {
    throw new Error(`Erreur GitHub: ${response.status}`);
  }

  const json = await response.json();
  return {
    items: json.items || [],
    totalCount: json.total_count || 0,
    rateLimit: {
      limit: response.headers.get('X-RateLimit-Limit'),
      remaining: response.headers.get('X-RateLimit-Remaining'),
      reset: response.headers.get('X-RateLimit-Reset')
    }
  };
}

export async function parallelSearch({ queries, token }) {
  const results = await Promise.allSettled(
    queries.map(q => searchRepositories({ query: q, token, perPage: 30 }))
  );

  const seen = new Set();
  const repos = [];
  let rateLimit = null;

  for (const result of results) {
    if (result.status === 'fulfilled') {
      rateLimit = result.value.rateLimit;
      for (const item of result.value.items) {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          repos.push(formatRepo(item));
        }
      }
    }
  }

  return { repos, rateLimit };
}

function timeAgo(dateStr) {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "aujourd'hui";
  if (days === 1) return 'il y a 1j';
  if (days < 30) return `il y a ${days}j`;
  const months = Math.floor(days / 30);
  if (months === 1) return 'il y a 1 mois';
  if (months < 12) return `il y a ${months} mois`;
  const years = Math.floor(months / 12);
  return years === 1 ? 'il y a 1 an' : `il y a ${years} ans`;
}

function formatStars(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

export function formatRepo(repo) {
  return {
    id: repo.id,
    full_name: repo.full_name,
    name: repo.name,
    owner: repo.owner?.login || '',
    description: repo.description || '',
    url: repo.html_url,
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    language: repo.language || null,
    topics: repo.topics || [],
    license: repo.license?.spdx_id || null,
    pushed_at: repo.pushed_at,
    pushedAgo: timeAgo(repo.pushed_at),
    starsFormatted: formatStars(repo.stargazers_count || 0)
  };
}
