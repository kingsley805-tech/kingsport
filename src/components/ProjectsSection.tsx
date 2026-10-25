import React, { useEffect, useState, useMemo, useRef } from 'react';
import { PORTFOLIO_CONFIG } from '../config';
import {
  GitHubRepo,
  GitHubStats,
  fetchGitHubRepos,
  LANGUAGE_COLORS
} from '../lib/github';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import {
  Search,
  SlidersHorizontal,
  Flame,
  Star,
  GitFork,
  Cpu,
  Code2,
  RefreshCw,
  Orbit,
  RotateCcw,
  Sparkles,
  Layers,
  AlertCircle,
  Clock,
  Calendar,
  Globe
} from 'lucide-react';

interface PhysicsBody {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vRot: number;
}

export const ProjectsSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isCached, setIsCached] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters & Sorting state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'live' | 'starred'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'pushed' | 'created' | 'oldest' | 'stars'>('pushed');
  const [showForks, setShowForks] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  // Detail Modal
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  // Signature Antigravity Physics Mode
  const [isAntigravity, setIsAntigravity] = useState(false);
  const [physicsBodies, setPhysicsBodies] = useState<Record<number, PhysicsBody>>({});
  const physicsContainerRef = useRef<HTMLDivElement>(null);
  const draggingId = useRef<number | null>(null);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastMousePos = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  // Load repositories
  const loadRepos = async (force: boolean = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchGitHubRepos(PORTFOLIO_CONFIG.githubUsername, force);
      setRepos(result.repos);
      setStats(result.stats);
      setIsCached(result.isCached);
      setIsRateLimited(result.isRateLimited);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch repositories.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRepos();
  }, []);

  // Extract unique languages for filter chips
  const availableLanguages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach(r => {
      if (r.language && r.language !== 'Unknown') set.add(r.language);
    });
    return Array.from(set).sort();
  }, [repos]);

  // Filtered & Sorted repositories
  const filteredRepos = useMemo(() => {
    return repos
      .filter(repo => {
        // Fork filter
        if (!showForks && repo.fork) return false;
        // Archived filter
        if (!showArchived && repo.archived) return false;
        // Category filter (All software, Live web apps, Starred)
        if (categoryFilter === 'live' && !repo.homepage) return false;
        if (categoryFilter === 'starred' && repo.stargazers_count === 0) return false;
        // Language filter
        if (selectedLanguage !== 'all' && repo.language !== selectedLanguage) return false;
        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = repo.name.toLowerCase().includes(q) || repo.cleanName.toLowerCase().includes(q);
          const matchDesc = (repo.description || '').toLowerCase().includes(q);
          const matchTopic = repo.topics.some(t => t.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchTopic) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'pushed') {
          return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
        }
        if (sortBy === 'created') {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }
        if (sortBy === 'stars') {
          return b.stargazers_count - a.stargazers_count;
        }
        return 0;
      });
  }, [repos, showForks, showArchived, categoryFilter, selectedLanguage, searchQuery, sortBy]);

  // Split into Top 3 Featured (Bento layout) and Remaining Grid
  const { featuredRepos, gridRepos } = useMemo(() => {
    if (categoryFilter !== 'all' || selectedLanguage !== 'all' || searchQuery.trim() !== '') {
      // If filtering, treat all as uniform grid
      return { featuredRepos: [], gridRepos: filteredRepos };
    }
    return {
      featuredRepos: filteredRepos.slice(0, 3),
      gridRepos: filteredRepos.slice(3)
    };
  }, [filteredRepos, categoryFilter, selectedLanguage, searchQuery]);

  // Antigravity Mode Initializer & Loop
  useEffect(() => {
    if (!isAntigravity || !physicsContainerRef.current) return;

    const container = physicsContainerRef.current;
    const rect = container.getBoundingClientRect();

    // Initialize positions scattered across container
    const initialBodies: Record<number, PhysicsBody> = {};
    const visibleCards = filteredRepos.slice(0, 16); // Limit to top 16 in antigravity mode for buttery 60fps

    visibleCards.forEach((repo, i) => {
      const padding = 160;
      const x = padding + Math.random() * (rect.width - padding * 2);
      const y = padding + (i / visibleCards.length) * (rect.height - padding * 2);
      initialBodies[repo.id] = {
        id: repo.id,
        x,
        y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        rot: (Math.random() - 0.5) * 12,
        vRot: (Math.random() - 0.5) * 0.4
      };
    });

    setPhysicsBodies(initialBodies);

    // Physics Animation Frame Loop
    let animId: number;
    const friction = 0.985;

    const step = () => {
      setPhysicsBodies(prev => {
        const next = { ...prev };
        const w = rect.width;
        const h = rect.height;

        Object.values(next).forEach(b => {
          if (draggingId.current === b.id) return; // Skip currently dragged body

          b.x += b.vx;
          b.y += b.vy;
          b.rot += b.vRot;

          b.vx *= friction;
          b.vy *= friction;
          b.vRot *= friction;

          // Zero-gravity slight thermal jitter
          b.vx += (Math.random() - 0.5) * 0.05;
          b.vy += (Math.random() - 0.5) * 0.05;

          // Boundary bounce
          const r = 140;
          if (b.x < r) {
            b.x = r;
            b.vx = Math.abs(b.vx) * 0.8;
          } else if (b.x > w - r) {
            b.x = w - r;
            b.vx = -Math.abs(b.vx) * 0.8;
          }

          if (b.y < r) {
            b.y = r;
            b.vy = Math.abs(b.vy) * 0.8;
          } else if (b.y > h - r) {
            b.y = h - r;
            b.vy = -Math.abs(b.vy) * 0.8;
          }
        });

        return next;
      });

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animId);
  }, [isAntigravity, filteredRepos]);

  // Pointer Dragging for Antigravity items
  const handleDragStart = (e: React.PointerEvent, id: number) => {
    if (!isAntigravity || !physicsContainerRef.current) return;
    draggingId.current = id;
    const rect = physicsContainerRef.current.getBoundingClientRect();
    const curBody = physicsBodies[id];
    if (curBody) {
      dragOffset.current = {
        x: (e.clientX - rect.left) - curBody.x,
        y: (e.clientY - rect.top) - curBody.y
      };
      lastMousePos.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    }
  };

  const handlePointerMoveContainer = (e: React.PointerEvent) => {
    if (!isAntigravity || draggingId.current === null || !physicsContainerRef.current) return;
    const rect = physicsContainerRef.current.getBoundingClientRect();
    const id = draggingId.current;

    const newX = (e.clientX - rect.left) - dragOffset.current.x;
    const newY = (e.clientY - rect.top) - dragOffset.current.y;

    // Calculate throw velocity
    const now = performance.now();
    const dt = Math.max(1, now - lastMousePos.current.time);
    const vx = (e.clientX - lastMousePos.current.x) / dt * 14;
    const vy = (e.clientY - lastMousePos.current.y) / dt * 14;

    lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };

    setPhysicsBodies(prev => {
      const b = prev[id];
      if (!b) return prev;
      return {
        ...prev,
        [id]: {
          ...b,
          x: newX,
          y: newY,
          vx: Math.max(-15, Math.min(15, vx)),
          vy: Math.max(-15, Math.min(15, vy)),
          vRot: (vx * 0.1)
        }
      };
    });
  };

  const handlePointerUpContainer = () => {
    draggingId.current = null;
  };

  return (
    <section
      id="projects"
      className="relative py-24 px-6 sm:px-10 lg:px-16 border-b border-border/50 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
                SOFTWARE SYSTEMS &amp; WEB APPLICATIONS
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground font-normal tracking-tight">
              Software Projects
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-xl font-sans">
              Live synchronized directly from GitHub REST API. Rendered as interactive browser window cards with live links, source code, and telemetry.
            </p>
          </div>

          {/* Action Toolbar: Antigravity mode toggle + Refresh button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAntigravity(!isAntigravity)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono font-medium transition-all ${
                isAntigravity
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-2 ring-primary'
                  : 'bg-card hover:bg-secondary border border-border text-foreground'
              }`}
            >
              {isAntigravity ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>Snap to Grid</span>
                </>
              ) : (
                <>
                  <Orbit className="w-4 h-4 text-primary" />
                  <span>Antigravity Mode</span>
                </>
              )}
            </button>

            <button
              onClick={() => loadRepos(true)}
              disabled={isLoading}
              className="p-2.5 rounded-full bg-card hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-all disabled:opacity-50"
              title="Sync live GitHub data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-primary' : ''}`} />
            </button>
          </div>
        </div>

        {/* Rate limit / Cache banner */}
        {(isRateLimited || isCached) && (
          <div className="mb-8 p-3.5 rounded-xl bg-secondary/70 border border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              <span>
                {isRateLimited
                  ? 'GitHub API rate limit reached. Displaying cached & curated firmware showcase.'
                  : 'Serving live snapshot cached within the last 10 minutes.'}
              </span>
            </div>
            <button
              onClick={() => loadRepos(true)}
              className="text-primary hover:underline font-semibold"
            >
              Force Sync
            </button>
          </div>
        )}

        {/* GitHub Stats Strip & Activity Heatmap */}
        {stats && (
          <div className="mb-12 p-6 rounded-2xl bg-card border border-border/80 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-6 border-b border-border/60">
              <div>
                <span className="font-mono text-xs text-muted-foreground block">TOTAL REPOSITORIES</span>
                <span className="font-serif text-3xl sm:text-4xl text-foreground font-normal mt-1 block">
                  {stats.totalRepos}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground mt-0.5 block">
                  100% Software Engineering • Full-Stack &amp; Web
                </span>
              </div>

              <div>
                <span className="font-mono text-xs text-muted-foreground block">TOTAL STARS</span>
                <span className="font-serif text-3xl sm:text-4xl text-amber-500 font-normal mt-1 block flex items-baseline gap-1.5">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500 inline self-center" />
                  {stats.totalStars}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground mt-0.5 block">
                  Across public repositories
                </span>
              </div>

              <div>
                <span className="font-mono text-xs text-muted-foreground block">TOP LANGUAGE</span>
                <span className="font-serif text-2xl sm:text-3xl text-foreground font-normal mt-1 block truncate">
                  {stats.topLanguage}
                </span>
                <span className="font-mono text-[11px] text-primary mt-0.5 block">
                  Polyglot Architecture
                </span>
              </div>

              <div>
                <span className="font-mono text-xs text-muted-foreground block">COMMITS &amp; TELEMETRY</span>
                <span className="font-serif text-3xl sm:text-4xl text-emerald-500 font-normal mt-1 block">
                  Active
                </span>
                <span className="font-mono text-[11px] text-muted-foreground mt-0.5 block">
                  Last push: {stats.mostRecentRepo ? stats.mostRecentRepo.relativeTime : 'Recent'}
                </span>
              </div>
            </div>

            {/* Contribution-style Heatmap */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>REPOSITORY ACTIVITY (LAST 20 WEEKS)</span>
                </span>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-secondary border border-border" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-primary/30" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-primary/60" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-primary" />
                  <span>More</span>
                </div>
              </div>

              {/* Heatmap Grid */}
              <div className="w-full overflow-x-auto pb-2">
                <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-[680px]">
                  {stats.activityHeatmap.map(cell => (
                    <div
                      key={cell.date}
                      title={`${cell.date}: ${cell.count} events`}
                      className={`w-3 h-3 rounded-[2px] transition-colors ${
                        cell.level === 0
                          ? 'bg-secondary/70 border border-border/40'
                          : cell.level === 1
                          ? 'bg-primary/25'
                          : cell.level === 2
                          ? 'bg-primary/50'
                          : cell.level === 3
                          ? 'bg-primary/80'
                          : 'bg-primary shadow-[0_0_6px_hsl(var(--primary))]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search, Filter, Category and Sort Controls */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search software repos, web apps, stacks..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Software Category Segmented Control */}
            <div className="flex items-center p-1 rounded-xl bg-secondary/80 border border-border self-start">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  categoryFilter === 'all'
                    ? 'bg-card text-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                All Software ({repos.length})
              </button>
              <button
                onClick={() => setCategoryFilter('live')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  categoryFilter === 'live'
                    ? 'bg-card text-emerald-500 font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-500" />
                <span>Live Apps</span>
              </button>
              <button
                onClick={() => setCategoryFilter('starred')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  categoryFilter === 'starred'
                    ? 'bg-card text-amber-500 font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Starred</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-muted-foreground hidden sm:inline">SORT:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-card border border-border text-foreground font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="pushed">Recently Updated</option>
                <option value="created">Newest Created</option>
                <option value="oldest">Oldest First</option>
                <option value="stars">Most Starred</option>
              </select>
            </div>
          </div>

          {/* Language Chips & Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-xs text-muted-foreground mr-1">LANG:</span>
              <button
                onClick={() => setSelectedLanguage('all')}
                className={`px-2.5 py-1 rounded-md font-mono text-xs transition-all ${
                  selectedLanguage === 'all'
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'bg-card hover:bg-secondary border border-border text-muted-foreground'
                }`}
              >
                All
              </button>
              {availableLanguages.map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-xs transition-all ${
                    selectedLanguage === lang
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'bg-card hover:bg-secondary border border-border text-muted-foreground'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: LANGUAGE_COLORS[lang] || '#8B949E' }}
                  />
                  <span>{lang}</span>
                </button>
              ))}
            </div>

            {/* Forks & Archived toggles */}
            <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showForks}
                  onChange={e => setShowForks(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span>Show Forks</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showArchived}
                  onChange={e => setShowArchived(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span>Show Archived</span>
              </label>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-card border border-border p-6 flex flex-col justify-between animate-pulse"
              >
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-muted rounded-full" />
                  <div className="h-6 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted/60 rounded" />
                  <div className="h-4 w-2/3 bg-muted/60 rounded" />
                </div>
                <div className="h-4 w-1/3 bg-muted rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="p-8 rounded-2xl bg-card border border-destructive/30 text-center max-w-md mx-auto">
            <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
            <h3 className="font-serif text-xl font-normal text-foreground mb-1">
              Could not load GitHub telemetry
            </h3>
            <p className="font-mono text-xs text-muted-foreground mb-4">{error}</p>
            <button
              onClick={() => loadRepos(true)}
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-mono text-xs font-semibold"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* ANTIGRAVITY FREE-FLOATING PHYSICS VIEW */}
        {isAntigravity && !isLoading && (
          <div
            ref={physicsContainerRef}
            onPointerMove={handlePointerMoveContainer}
            onPointerUp={handlePointerUpContainer}
            className="relative w-full h-[750px] rounded-3xl border-2 border-dashed border-primary/40 bg-secondary/20 overflow-hidden select-none cursor-crosshair shadow-inner"
          >
            <div className="absolute top-6 left-6 z-20 pointer-events-none">
              <span className="font-mono text-xs font-semibold text-primary uppercase flex items-center gap-2 bg-background/80 px-3 py-1.5 rounded-full border border-primary/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                ZERO-GRAVITY PHYSICS ONLINE // GRAB &amp; TOSS CARDS
              </span>
            </div>

            {filteredRepos.slice(0, 16).map(repo => (
              <ProjectCard
                key={repo.id}
                repo={repo}
                onSelect={setSelectedRepo}
                isAntigravity={true}
                physicsPos={physicsBodies[repo.id]}
                onDragStart={handleDragStart}
              />
            ))}
          </div>
        )}

        {/* STANDARD GRID VIEW (with Featured Bento top 3) */}
        {!isAntigravity && !isLoading && (
          <div className="space-y-8">
            {/* Featured Bento Section */}
            {featuredRepos.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4 font-mono text-xs text-muted-foreground uppercase">
                  <Star className="w-3.5 h-3.5 text-primary" />
                  <span>PINNED BROWSER APPS // BENTO SHOWCASE</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* First card large bento */}
                  <ProjectCard
                    repo={featuredRepos[0]}
                    featured={true}
                    onSelect={setSelectedRepo}
                  />
                  {/* Remaining 2 cards */}
                  {featuredRepos.slice(1).map(repo => (
                    <ProjectCard
                      key={repo.id}
                      repo={repo}
                      featured={false}
                      onSelect={setSelectedRepo}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Standard Grid */}
            {gridRepos.length > 0 && (
              <div>
                {featuredRepos.length > 0 && (
                  <div className="flex items-center gap-2 mb-4 pt-6 font-mono text-xs text-muted-foreground uppercase">
                    <Layers className="w-3.5 h-3.5 text-primary" />
                    <span>ALL SYNCHRONIZED SOFTWARE APPLICATIONS ({gridRepos.length})</span>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gridRepos.map(repo => (
                    <ProjectCard
                      key={repo.id}
                      repo={repo}
                      featured={false}
                      onSelect={setSelectedRepo}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Empty Search Results */}
            {filteredRepos.length === 0 && (
              <div className="py-16 text-center text-muted-foreground font-mono text-xs">
                <p>No repositories match your active filter criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                    setSelectedLanguage('all');
                  }}
                  className="mt-3 text-primary hover:underline font-semibold"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Slide-over README & Details Modal */}
      <ProjectDetailModal
        repo={selectedRepo}
        onClose={() => setSelectedRepo(null)}
      />
    </section>
  );
};

export default ProjectsSection;
