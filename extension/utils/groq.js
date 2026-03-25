// Groq API utilities

export const GROQ_MODELS = [
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile', speed: '~280 t/s', status: 'recommended' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', speed: '~560 t/s', status: 'stable' },
  { id: 'meta-llama/llama-4-maverick-17b-128e-instruct', name: 'Llama 4 Maverick 17B', speed: '—', status: 'preview' },
  { id: 'meta-llama/llama-4-scout-17b-16e-instruct', name: 'Llama 4 Scout 17B', speed: '—', status: 'preview' },
  { id: 'qwen-qwq-32b', name: 'Qwen 3 32B', speed: '—', status: 'preview' },
  { id: 'moonshotai/kimi-k2-instruct', name: 'Kimi K2', speed: '—', status: 'preview' }
];

export async function groqChat({ apiKey, model, messages, temperature = 0.3, maxTokens = 1024 }) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Erreur Groq: ${response.status}`);
  }

  const json = await response.json();
  return {
    data: json.choices[0].message.content,
    usage: json.usage
  };
}

export async function reformulateQuery({ apiKey, model, userQuery, filters = {} }) {
  const filtersStr = Object.entries(filters)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}:${v}`)
    .join(' ');

  const { data, usage } = await groqChat({
    apiKey,
    model,
    messages: [
      {
        role: 'system',
        content: `Tu es un expert de l'API GitHub Search. Génère exactement 3 requêtes de recherche GitHub optimisées et 4 suggestions de recherche similaires.
Utilise les qualificateurs : language:, stars:>, pushed:>, topic:, in:readme, in:description.
Réponds UNIQUEMENT avec du JSON valide : {"queries":["q1","q2","q3"],"suggestions":["s1","s2","s3","s4"]}
Aucun texte avant ou après le JSON.`
      },
      {
        role: 'user',
        content: `Requête utilisateur : "${userQuery}"${filtersStr ? `\nFiltres actifs : ${filtersStr}` : ''}`
      }
    ],
    temperature: 0.4,
    maxTokens: 512
  });

  try {
    const parsed = JSON.parse(data);
    return { queries: parsed.queries || [], suggestions: parsed.suggestions || [], usage };
  } catch {
    return { queries: [userQuery], suggestions: [], usage };
  }
}

export async function scoreRepositories({ apiKey, model, userQuery, repos }) {
  const repoList = repos.map((r, i) =>
    `${i}: ${r.full_name} | ⭐${r.stars} | ${r.language || 'N/A'} | ${r.description?.slice(0, 80) || ''}`
  ).join('\n');

  const { data, usage } = await groqChat({
    apiKey,
    model,
    messages: [
      {
        role: 'system',
        content: `Tu es un expert en évaluation de dépôts GitHub. Classe les dépôts par pertinence, maintenance et popularité.
Réponds UNIQUEMENT avec un tableau JSON d'indices (max 10) : [0,3,7,2,...]
Aucun texte avant ou après.`
      },
      {
        role: 'user',
        content: `Requête : "${userQuery}"\n\nDépôts :\n${repoList}`
      }
    ],
    temperature: 0.1,
    maxTokens: 256
  });

  try {
    const indices = JSON.parse(data);
    return { indices: Array.isArray(indices) ? indices.slice(0, 10) : [], usage };
  } catch {
    return { indices: repos.slice(0, 10).map((_, i) => i), usage };
  }
}

export async function generateSummaries({ apiKey, model, userQuery, repos }) {
  const repoList = repos.map(r =>
    `${r.full_name}: ${r.description?.slice(0, 120) || ''} | topics: ${(r.topics || []).join(', ')}`
  ).join('\n');

  const { data, usage } = await groqChat({
    apiKey,
    model,
    messages: [
      {
        role: 'system',
        content: `Tu es un expert en analyse de dépôts GitHub. Génère des résumés concis en anglais (chaque champ < 80 chars).
Réponds UNIQUEMENT avec du JSON : {"repo/name":{"name":"","what":"","usecases":"","stack":"","strengths":""}, ...}
Aucun texte avant ou après.`
      },
      {
        role: 'user',
        content: `Contexte de recherche : "${userQuery}"\n\nDépôts :\n${repoList}`
      }
    ],
    temperature: 0.3,
    maxTokens: 2048
  });

  try {
    const summaries = JSON.parse(data);
    return { summaries, usage };
  } catch {
    const fallback = {};
    repos.forEach(r => { fallback[r.full_name] = { name: r.name, what: r.description?.slice(0, 80) || '', usecases: '', stack: r.language || '', strengths: '' }; });
    return { summaries: fallback, usage };
  }
}
