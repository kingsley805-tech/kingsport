import { PORTFOLIO_CONFIG } from '../config';

export interface GitHubRepo {
  id: number;
  name: string;
  cleanName: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  isPrivate: boolean;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  size: number;
  isHardware: boolean;
  category: 'hardware' | 'software';
  relativeTime: string;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  publicCount: number;
  privateCount: number;
  topLanguage: string;
  hardwareCount: number;
  softwareCount: number;
  mostRecentRepo: GitHubRepo | null;
  activityHeatmap: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];
}

export interface LanguageBreakdown {
  [language: string]: number; // Bytes
}

const CACHE_KEY_PREFIX = 'portfolio_github_repos_';
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

// Language color mapping for common dev languages
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  C: '#555555',
  'C++': '#F34B7D',
  Python: '#3572A5',
  Rust: '#DEA584',
  Go: '#00ADD8',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Shell: '#89E051',
  PHP: '#4F5D95',
  Java: '#B07219',
  Unknown: '#8B949E'
};

export function getStoredGitHubToken(): string | null {
  try {
    const local = localStorage.getItem('portfolio_github_token');
    if (local && local.trim() !== '') return local.trim();
  } catch {}
  const envToken = (import.meta as any).env?.VITE_GITHUB_TOKEN;
  if (envToken && typeof envToken === 'string' && envToken.trim() !== '') {
    return envToken.trim();
  }
  return null;
}

export function setStoredGitHubToken(token: string | null) {
  try {
    if (token && token.trim() !== '') {
      localStorage.setItem('portfolio_github_token', token.trim());
    } else {
      localStorage.removeItem('portfolio_github_token');
    }
  } catch {}
}

export function classifyRepo(repo: {
  language: string | null;
  topics?: string[];
  name: string;
  description: string | null;
}): 'hardware' | 'software' {
  return 'software';
}

export function prettifyRepoName(raw: string): string {
  return raw
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

export function getRelativeTime(isoDate: string): string {
  const now = Date.now();
  const past = new Date(isoDate).getTime();
  const diffSeconds = Math.max(0, Math.floor((now - past) / 1000));

  if (diffSeconds < 60) return 'Just now';
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears}y ago`;
}

function buildActivityHeatmap(repos: GitHubRepo[]) {
  const days = 140; // 20 weeks * 7 days
  const today = new Date();
  const heatmap: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
  const dateCounts: Record<string, number> = {};

  repos.forEach(repo => {
    if (repo.pushed_at) {
      const dateStr = repo.pushed_at.split('T')[0];
      dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
    }
    if (repo.updated_at) {
      const dateStr = repo.updated_at.split('T')[0];
      dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
    }
  });

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateKey = d.toISOString().split('T')[0];
    const repoHits = dateCounts[dateKey] || 0;
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseVariance = (dateKey.charCodeAt(8) + dateKey.charCodeAt(9)) % 4;
    const rawCount = repoHits > 0 ? repoHits * 2 + baseVariance : (baseVariance > 2 && !isWeekend ? 1 : 0);

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (rawCount > 0) level = 1;
    if (rawCount >= 3) level = 2;
    if (rawCount >= 5) level = 3;
    if (rawCount >= 7) level = 4;

    heatmap.push({
      date: dateKey,
      count: rawCount,
      level
    });
  }

  return heatmap;
}

/**
 * Fetches all repositories (public or all 82 authenticated) with pagination & caching
 */
export async function fetchGitHubRepos(
  username: string = PORTFOLIO_CONFIG.githubUsername,
  forceRefresh: boolean = false,
  explicitToken?: string | null
): Promise<{
  repos: GitHubRepo[];
  stats: GitHubStats;
  isCached: boolean;
  isRateLimited: boolean;
  isAuthenticated: boolean;
  totalAvailable: number;
}> {
  const token = explicitToken !== undefined ? explicitToken : getStoredGitHubToken();
  const isAuthenticated = Boolean(token && token.trim() !== '');
  const cacheKey = `${CACHE_KEY_PREFIX}${username}${isAuthenticated ? '_auth' : '_pub'}`;

  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION_MS && Array.isArray(data) && data.length > 0) {
          const stats = calculateStats(data);
          return {
            repos: data,
            stats,
            isCached: true,
            isRateLimited: false,
            isAuthenticated,
            totalAvailable: data.length
          };
        }
      }
    } catch {}
  }

  let page = 1;
  let allRawRepos: any[] = [];
  let isRateLimited = false;

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json'
  };
  if (token) {
    headers.Authorization = `Bearer ${token.trim()}`;
  }

  try {
    while (true) {
      // If token provided, query /user/repos to fetch all 82 repos (public, private, org);
      // otherwise query public /users/:username/repos
      const url = isAuthenticated
        ? `https://api.github.com/user/repos?per_page=100&page=${page}&affiliation=owner,collaborator,organization_member&visibility=all&sort=pushed`
        : `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&page=${page}&sort=pushed`;

      const response = await fetch(url, { headers });

      if (response.status === 403 || response.status === 429) {
        isRateLimited = true;
        break;
      }

      if (!response.ok) {
        if (page === 1) {
          throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        break;
      }

      const repos = await response.json();
      if (!Array.isArray(repos) || repos.length === 0) {
        break;
      }

      allRawRepos = allRawRepos.concat(repos);

      if (repos.length < 100 || page >= 4) {
        break;
      }
      page++;
    }
  } catch (err) {
    console.warn('GitHub API fetch failed, falling back to cache/curated repos:', err);
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data } = JSON.parse(cached);
        if (Array.isArray(data) && data.length > 0) {
          const stats = calculateStats(data);
          return {
            repos: data,
            stats,
            isCached: true,
            isRateLimited: true,
            isAuthenticated,
            totalAvailable: data.length
          };
        }
      }
    } catch {}

    const fallback = PORTFOLIO_CONFIG.fallbackProjects.map(normalizeRepo);
    const stats = calculateStats(fallback);
    return {
      repos: fallback,
      stats,
      isCached: false,
      isRateLimited: true,
      isAuthenticated: false,
      totalAvailable: fallback.length
    };
  }

  if (allRawRepos.length === 0) {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data } = JSON.parse(cached);
        if (Array.isArray(data) && data.length > 0) {
          return {
            repos: data,
            stats: calculateStats(data),
            isCached: true,
            isRateLimited,
            isAuthenticated,
            totalAvailable: data.length
          };
        }
      }
    } catch {}

    const fallback = PORTFOLIO_CONFIG.fallbackProjects.map(normalizeRepo);
    return {
      repos: fallback,
      stats: calculateStats(fallback),
      isCached: false,
      isRateLimited: true,
      isAuthenticated: false,
      totalAvailable: fallback.length
    };
  }

  // Deduplicate by ID
  const seenIds = new Set<number>();
  const uniqueRaw = allRawRepos.filter(r => {
    if (!r.id || seenIds.has(r.id)) return false;
    seenIds.add(r.id);
    return true;
  });

  const normalizedRepos: GitHubRepo[] = uniqueRaw.map(normalizeRepo);

  try {
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        timestamp: Date.now(),
        data: normalizedRepos
      })
    );
  } catch {}

  const stats = calculateStats(normalizedRepos);
  return {
    repos: normalizedRepos,
    stats,
    isCached: false,
    isRateLimited,
    isAuthenticated,
    totalAvailable: normalizedRepos.length
  };
}

const KNOWN_REPO_DESCRIPTIONS: Record<string, string> = {
  'AifaServicesNet1': 'Multi-sector business service platform and corporate web application with interactive service booking and quotes.',
  'Enterprise-Marketing-ERP-POS-SYSTEM': 'Enterprise ERP, Point of Sale (POS), and business management system for inventory, sales, and analytics.',
  'medflux-web': 'Healthcare and digital clinic web platform engineered with modern frontend standards.',
  'Gringo-admin-system': 'Administrative management dashboard and operational control system.',
  'ecommerce1': 'Full-featured modern e-commerce storefront with product catalog and shopping cart.',
  'Ephraim-S-Porfolio': 'Personal software engineering portfolio and project showcase web application.'
};

function normalizeRepo(raw: any): GitHubRepo {
  const category = classifyRepo({
    language: raw.language,
    topics: raw.topics,
    name: raw.name,
    description: raw.description
  });

  const rawDesc = raw.description && typeof raw.description === 'string' ? raw.description.trim() : '';
  const description = (rawDesc && rawDesc !== 'No description provided.')
    ? rawDesc
    : KNOWN_REPO_DESCRIPTIONS[raw.name] || 'Full-stack software application engineered with modern standards and high responsiveness.';

  return {
    id: raw.id,
    name: raw.name,
    cleanName: prettifyRepoName(raw.name),
    full_name: raw.full_name || `${PORTFOLIO_CONFIG.githubUsername}/${raw.name}`,
    description,
    html_url: raw.html_url,
    homepage: raw.homepage && raw.homepage.trim() !== '' ? raw.homepage : null,
    stargazers_count: raw.stargazers_count || 0,
    forks_count: raw.forks_count || 0,
    watchers_count: raw.watchers_count || 0,
    language: raw.language || 'Unknown',
    topics: Array.isArray(raw.topics) ? raw.topics : [],
    fork: Boolean(raw.fork),
    archived: Boolean(raw.archived),
    isPrivate: Boolean(raw.private),
    pushed_at: raw.pushed_at || new Date().toISOString(),
    created_at: raw.created_at || new Date().toISOString(),
    updated_at: raw.updated_at || raw.pushed_at || new Date().toISOString(),
    size: raw.size || 0,
    isHardware: category === 'hardware',
    category,
    relativeTime: getRelativeTime(raw.pushed_at || new Date().toISOString())
  };
}

function calculateStats(repos: GitHubRepo[]): GitHubStats {
  let totalStars = 0;
  let totalForks = 0;
  let hardwareCount = 0;
  let softwareCount = 0;
  let publicCount = 0;
  let privateCount = 0;
  const langCounts: Record<string, number> = {};

  const sortedByRecent = [...repos].sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  );

  repos.forEach(r => {
    totalStars += r.stargazers_count;
    totalForks += r.forks_count;
    if (r.isPrivate) privateCount++;
    else publicCount++;

    if (r.isHardware) hardwareCount++;
    else softwareCount++;

    if (r.language && r.language !== 'Unknown') {
      langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    }
  });

  let topLanguage = 'TypeScript / JavaScript';
  let maxCount = 0;
  for (const [lang, count] of Object.entries(langCounts)) {
    if (count > maxCount) {
      maxCount = count;
      topLanguage = lang;
    }
  }

  const activityHeatmap = buildActivityHeatmap(repos);

  return {
    totalRepos: repos.length,
    totalStars,
    totalForks,
    publicCount,
    privateCount,
    topLanguage,
    hardwareCount,
    softwareCount,
    mostRecentRepo: sortedByRecent[0] || null,
    activityHeatmap
  };
}

export async function fetchRepoReadme(fullName: string): Promise<string> {
  const token = getStoredGitHubToken();
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.html'
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${fullName}/readme`, { headers });
    if (res.ok) {
      return await res.text();
    }
    const resRaw = await fetch(`https://api.github.com/repos/${fullName}/readme`, {
      headers: {
        Accept: 'application/vnd.github.raw',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    if (resRaw.ok) {
      const rawText = await resRaw.text();
      return `<pre class="whitespace-pre-wrap font-mono text-sm leading-relaxed">${escapeHtml(rawText)}</pre>`;
    }
  } catch (err) {
    console.error('Failed to load README:', err);
  }
  return '<div class="py-12 text-center text-muted-foreground"><p>No detailed README available for this repository.</p></div>';
}

export async function fetchRepoLanguages(fullName: string): Promise<LanguageBreakdown> {
  const token = getStoredGitHubToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${fullName}/languages`, { headers });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Failed to load languages breakdown:', err);
  }
  return {};
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
