export type SearchState = 'idle' | 'loading' | 'results' | 'error'

export type LoadingStep = {
  id: number
  label: string
  state: 'pending' | 'active' | 'done'
}

export type Repo = {
  id: number
  fullName: string
  owner: string
  name: string
  description: string
  stars: number
  starsFormatted: string
  language: string
  topics: string[]
  pushedAgo: string
  url: string
  summary: {
    what: string
    stack: string
    strengths: string
  }
}

export type FilterState = {
  language: string
  starsMin: string
  pushedWithin: string
  license: string
}
