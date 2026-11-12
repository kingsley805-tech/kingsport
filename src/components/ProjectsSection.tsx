import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FeaturedCaseStudy, PORTFOLIO_CONFIG } from '../config';
import {
  GitHubRepo,
  GitHubStats,
  fetchGitHubRepos,
  LANGUAGE_COLORS
} from '../lib/github';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { CaseStudyModal } from './CaseStudyModal';
import { GitHubTokenModal } from './GitHubTokenModal';
import {
  Search,
  Star,
  RefreshCw,
  Orbit,
  RotateCcw,
  Sparkles,
  Layers,
  AlertCircle,
  Calendar,
  Globe,
  ExternalLink,
  Github,
  ArrowUpRight,
  Rocket,
  Building2,
  Code2,
  Wifi,
  Key,
  Lock,
  ShieldCheck
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Featured Case Studies Filter & Modal
  const [caseStudyFilter, setCaseStudyFilter] = useState<'all' | 'erp-pos' | 'software' | 'infrastructure'>('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<FeaturedCaseStudy | null>(null);

  // Filters & Sorting state (Preserved)
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'live' | 'starred' | 'private' | 'public'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'pushed' | 'created' | 'oldest' | 'stars'>('pushed');
  const [showForks, setShowForks] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  // Detail Modal
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  // Signature Antigravity Physics Mode (Preserved)
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
      setIsAuthenticated(result.isAuthenticated);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch repositories.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleOpenToken = () => setIsTokenModalOpen(true);
    window.addEventListener('open-github-token-modal', handleOpenToken);
    return () => window.removeEventListener('open-github-token-modal', handleOpenToken);
  }, []);

  useEffect(() => {
    loadRepos();
  }, []);

  const filteredCaseStudies = useMemo(() => {
    if (caseStudyFilter === 'all') return PORTFOLIO_CONFIG.featuredCaseStudies;
    return PORTFOLIO_CONFIG.featuredCaseStudies.filter(p => p.category === caseStudyFilter);
  }, [caseStudyFilter]);

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
        if (!showForks && repo.fork) return false;
        if (!showArchived && repo.archived) return false;
        if (categoryFilter === 'live' && !repo.homepage) return false;
        if (categoryFilter === 'starred' && repo.stargazers_count === 0) return false;
        if (categoryFilter === 'private' && !repo.isPrivate) return false;
        if (categoryFilter === 'public' && repo.isPrivate) return false;
        if (selectedLanguage !== 'all' && repo.language !== selectedLanguage) return false;
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName =
            repo.name.toLowerCase().includes(q) || repo.cleanName.toLowerCase().includes(q);
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

    const initialBodies: Record<number, PhysicsBody> = {};
    const visibleCards = filteredRepos.slice(0, 16);

    visibleCards.forEach((repo, i) => {
      const padding = 160;
      const x = padding + Math.random() * Math.max(100, rect.width - padding * 2);
      const y = padding + (i / Math.max(1, visibleCards.length)) * Math.max(100, rect.height - padding * 2);
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

    let animId: number;
    const friction = 0.985;

    const step = () => {
      setPhysicsBodies(prev => {
        const next = { ...prev };
        const w = rect.width;
        const h = rect.height;

        Object.values(next).forEach(b => {
          if (draggingId.current === b.id) return;

          b.x += b.vx;
          b.y += b.vy;
          b.rot += b.vRot;

          b.vx *= friction;
          b.vy *= friction;
          b.vRot *= friction;

          b.vx += (Math.random() - 0.5) * 0.05;
          b.vy += (Math.random() - 0.5) * 0.05;

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
        x: e.clientX - rect.left - curBody.x,
        y: e.clientY - rect.top - curBody.y
      };
      lastMousePos.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    }
  };

  const handlePointerMoveContainer = (e: React.PointerEvent) => {
    if (!isAntigravity || draggingId.current === null || !physicsContainerRef.current) return;
    const rect = physicsContainerRef.current.getBoundingClientRect();
    const id = draggingId.current;

    const newX = e.clientX - rect.left - dragOffset.current.x;
    const newY = e.clientY - rect.top - dragOffset.current.y;

    const now = performance.now();
    const dt = Math.max(1, now - lastMousePos.current.time);
    const vx = ((e.clientX - lastMousePos.current.x) / dt) * 14;
    const vy = ((e.clientY - lastMousePos.current.y) / dt) * 14;

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
          vRot: vx * 0.1
        }
      };
    });
  };

  const handlePointerUpContainer = () => {
    draggingId.current = null;
  };

  const categoryIcon = (cat: FeaturedCaseStudy['category']) => {
    if (cat === 'erp-pos') return Building2;
    if (cat === 'infrastructure') return Wifi;
    return Code2;
  };

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-border/60 bg-secondary/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                Featured Work &amp; Live Repositories
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Projects &amp; Case Studies
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl">
              Production enterprise platforms, network infrastructure deployments, and live-synchronized GitHub applications with interactive previews.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              data-github-token-trigger="true"
              onClick={() => setIsTokenModalOpen(true)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-mono font-medium transition-all ${
                isAuthenticated || (stats && stats.privateCount > 0)
                  ? 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                  : 'bg-card hover:bg-secondary border-primary/40 hover:border-primary text-foreground'
              }`}
              title={
                isAuthenticated || (stats && stats.privateCount > 0)
                  ? 'GitHub token active. All 82 repositories synchronized. Click to manage permissions.'
                  : 'Click to connect your GitHub token and synchronize all 82 repositories (public & private)'
              }
            >
              {isAuthenticated || (stats && stats.privateCount > 0) ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>82 Repos Synced</span>
                </>
              ) : (
                <>
                  <Key className="w-3.5 h-3.5 text-primary" />
                  <span>Sync All 82 Repos</span>
                  <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-semibold">
                    Auth
                  </span>
                </>
              )}
            </button>

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card hover:bg-secondary border border-border text-foreground text-xs font-mono font-medium transition-colors"
            >
              <Rocket className="w-3.5 h-3.5 text-primary" />
              <span>Vercel Deployments</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
            </Link>

            <button
              type="button"
              data-antigravity-toggle="true"
              onClick={() => setIsAntigravity(!isAntigravity)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
                isAntigravity
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-2 ring-primary'
                  : 'bg-card hover:bg-secondary border border-border text-foreground'
              }`}
            >
              {isAntigravity ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Snap to Grid</span>
                </>
              ) : (
                <>
                  <Orbit className="w-3.5 h-3.5 text-primary" />
                  <span>Antigravity Mode</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => loadRepos(true)}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-card hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-all disabled:opacity-50"
              title="Sync live GitHub data"
              aria-label="Sync live GitHub data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-primary' : ''}`} />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PART 1: FEATURED CV SYSTEMS & INFRASTRUCTURE CASE STUDIES      */}
        {/* ============================================================== */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                Flagship Systems &amp; Infrastructure Engagements
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Select any card to inspect the problem statement, architecture solution, and role details.
              </p>
            </div>

            <div className="inline-flex flex-wrap items-center p-1 rounded-xl bg-card border border-border self-start">
              {[
                { id: 'all', label: 'All Featured' },
                { id: 'erp-pos', label: 'ERP & POS' },
                { id: 'software', label: 'Software Systems' },
                { id: 'infrastructure', label: 'Network & IT Infra' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCaseStudyFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    caseStudyFilter === tab.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaseStudies.map(study => {
              const Icon = categoryIcon(study.category);
              const isInfra = study.category === 'infrastructure';

              return (
                <article
                  key={study.id}
                  onClick={() => setSelectedCaseStudy(study)}
                  className="group cursor-pointer rounded-2xl bg-card border border-border hover:border-primary/60 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isInfra
                            ? 'bg-cyan-500/12 text-cyan-500 border border-cyan-500/25'
                            : 'bg-primary/12 text-primary border border-primary/25'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] uppercase px-2.5 py-1 rounded-full bg-secondary border border-border text-muted-foreground">
                        {study.organization}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-1.5">
                      {study.title}
                    </h4>
                    <p className="font-mono text-[11px] text-primary/90 mb-3">
                      {study.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                      {study.summary}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {study.technologies.slice(0, 4).map(tech => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary text-foreground/85 border border-border/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2 text-xs font-mono">
                      <span className="text-primary font-semibold group-hover:underline">
                        View Case Study →
                      </span>

                      <div
                        className="flex items-center gap-2"
                        onClick={e => e.stopPropagation()}
                      >
                        {study.githubUrl && (
                          <a
                            href={study.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-secondary hover:bg-primary/15 text-foreground hover:text-primary transition-colors"
                            title="GitHub Repository"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {study.liveUrl && (
                          <a
                            href={study.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-secondary hover:bg-primary/15 text-foreground hover:text-primary transition-colors"
                            title="Live Deployment"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* PART 2: LIVE GITHUB REPOSITORY EXPLORER (PRESERVED FULL FUNC)  */}
        {/* ============================================================== */}
        <div className="pt-10 border-t border-border/70">
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Open-Source &amp; Live Deployed Web Applications
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Synchronized directly from GitHub REST API (@{PORTFOLIO_CONFIG.githubUsername}). Filter by live apps, language, or inspect any repository README.
            </p>
          </div>

          {/* Rate limit / Cache banner */}
          {(isRateLimited || isCached) && (
            <div className="mb-8 p-3.5 rounded-xl bg-card border border-border flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-primary shrink-0" />
                <span>
                  {isRateLimited
                    ? 'GitHub API rate limit reached. Displaying cached & curated software projects.'
                    : 'Serving live repository snapshot cached within the last 10 minutes.'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => loadRepos(true)}
                className="text-primary hover:underline font-semibold"
              >
                Force Sync
              </button>
            </div>
          )}

          {/* GitHub Stats Strip & Activity Heatmap */}
          {stats && (
            <div className="mb-10 p-6 rounded-2xl bg-card border border-border/90 shadow-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-6 border-b border-border/60">
                <div>
                  <span className="font-mono text-xs text-muted-foreground block">
                    TOTAL REPOSITORIES
                  </span>
                  <span className="text-3xl sm:text-4xl font-bold text-foreground mt-1 block">
                    {stats.totalRepos}
                  </span>
                  {stats.privateCount > 0 ? (
                    <span className="font-mono text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1.5">
                      <span>{stats.publicCount} Public</span>
                      <span>•</span>
                      <span className="text-amber-500 font-semibold">{stats.privateCount} Private</span>
                    </span>
                  ) : (
                    <span className="font-mono text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1.5">
                      <span>{stats.totalRepos} Public</span>
                      <button
                        type="button"
                        onClick={() => setIsTokenModalOpen(true)}
                        className="text-primary hover:underline font-medium"
                      >
                        (Sync all 82)
                      </button>
                    </span>
                  )}
                </div>

                <div>
                  <span className="font-mono text-xs text-muted-foreground block">TOTAL STARS</span>
                  <span className="text-3xl sm:text-4xl font-bold text-amber-500 mt-1 flex items-center gap-1.5">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                    {stats.totalStars}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground mt-0.5 block">
                    Across public repositories
                  </span>
                </div>

                <div>
                  <span className="font-mono text-xs text-muted-foreground block">TOP LANGUAGE</span>
                  <span className="text-2xl sm:text-3xl font-bold text-foreground mt-1 block truncate">
                    {stats.topLanguage}
                  </span>
                  <span className="font-mono text-[11px] text-primary mt-0.5 block">
                    Primary Stack
                  </span>
                </div>

                <div>
                  <span className="font-mono text-xs text-muted-foreground block">
                    LATEST ACTIVITY
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-emerald-500 mt-1 block">
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
                    <Calendar className="w-3.5 h-3.5 text-primary" />
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

          {/* Search, Filter, Category and Sort Controls (All Preserved) */}
          <div className="space-y-4 mb-10">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  aria-label="Search repositories"
                  placeholder="Search software repos, web apps, stacks..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-16 py-2.5 rounded-xl bg-card border border-border text-foreground font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/60"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Software Category Segmented Control */}
              <div className="flex flex-wrap items-center p-1 rounded-xl bg-card border border-border self-start">
                <button
                  type="button"
                  onClick={() => setCategoryFilter('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    categoryFilter === 'all'
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  All Software ({repos.length})
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryFilter('live')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    categoryFilter === 'live'
                      ? 'bg-emerald-500/15 text-emerald-500 font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Live Apps</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryFilter('starred')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    categoryFilter === 'starred'
                      ? 'bg-amber-500/15 text-amber-500 font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>Starred</span>
                </button>
                {stats && stats.privateCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setCategoryFilter('private')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      categoryFilter === 'private'
                        ? 'bg-amber-500/15 text-amber-500 font-semibold shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Private ({stats.privateCount})</span>
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <label htmlFor="project-sort" className="text-muted-foreground hidden sm:inline">
                  SORT:
                </label>
                <select
                  id="project-sort"
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
                  type="button"
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
                    type="button"
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
              <h3 className="text-xl font-semibold text-foreground mb-1">
                Could not load GitHub telemetry
              </h3>
              <p className="font-mono text-xs text-muted-foreground mb-4">{error}</p>
              <button
                type="button"
                onClick={() => loadRepos(true)}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-mono text-xs font-semibold"
              >
                Retry Connection
              </button>
            </div>
          )}

          {/* ANTIGRAVITY FREE-FLOATING PHYSICS VIEW (Preserved) */}
          {isAntigravity && !isLoading && (
            <div
              ref={physicsContainerRef}
              onPointerMove={handlePointerMoveContainer}
              onPointerUp={handlePointerUpContainer}
              className="relative w-full h-[750px] rounded-3xl border-2 border-dashed border-primary/40 bg-card/30 overflow-hidden select-none cursor-crosshair shadow-inner"
            >
              <div className="absolute top-6 left-6 z-20 pointer-events-none">
                <span className="font-mono text-xs font-semibold text-primary uppercase flex items-center gap-2 bg-background/85 px-3 py-1.5 rounded-full border border-primary/30 backdrop-blur-md">
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
              {featuredRepos.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4 font-mono text-xs text-muted-foreground uppercase">
                    <Star className="w-3.5 h-3.5 text-primary" />
                    <span>RECENT &amp; FEATURED REPOSITORIES</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ProjectCard
                      repo={featuredRepos[0]}
                      featured={true}
                      onSelect={setSelectedRepo}
                    />
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

              {gridRepos.length > 0 && (
                <div>
                  {featuredRepos.length > 0 && (
                    <div className="flex items-center gap-2 mb-4 pt-6 font-mono text-xs text-muted-foreground uppercase">
                      <Layers className="w-3.5 h-3.5 text-primary" />
                      <span>ALL SYNCHRONIZED REPOSITORIES ({gridRepos.length})</span>
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

              {filteredRepos.length === 0 && (
                <div className="py-16 text-center text-muted-foreground font-mono text-xs">
                  <p>No repositories match your active filter criteria.</p>
                  <button
                    type="button"
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
      </div>

      {/* Slide-over README & Details Modal (Preserved) */}
      <ProjectDetailModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />

      {/* Featured Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* GitHub Access Token Modal (Sync All 82 Repos) */}
      <GitHubTokenModal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
        onTokenSaved={() => loadRepos(true)}
      />
    </section>
  );
};

export default ProjectsSection;
