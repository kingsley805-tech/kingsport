import React, { useRef, useState, useEffect } from 'react';
import { GitHubRepo, LANGUAGE_COLORS } from '../lib/github';
import {
  Star,
  GitFork,
  ExternalLink,
  Github,
  Code2,
  Clock,
  Lock,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Globe,
  Maximize2,
  MousePointerClick,
  Sparkles
} from 'lucide-react';

interface ProjectCardProps {
  repo: GitHubRepo;
  featured?: boolean;
  onSelect: (repo: GitHubRepo) => void;
  // Antigravity physics mode properties
  isAntigravity?: boolean;
  physicsPos?: { x: number; y: number; vx: number; vy: number; rot: number };
  onDragStart?: (e: React.PointerEvent, id: number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  repo,
  featured = false,
  onSelect,
  isAntigravity = false,
  physicsPos,
  onDragStart
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glareX: 50, glareY: 50, glareOpacity: 0 });
  const [isInteractive, setIsInteractive] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  useEffect(() => {
    if (!viewportRef.current) return;
    const updateSize = () => {
      if (viewportRef.current) {
        setViewportSize({
          width: viewportRef.current.clientWidth,
          height: viewportRef.current.clientHeight
        });
      }
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  // Compute full responsive desktop scaling to display the complete page
  const targetDesktopWidth = featured ? 1200 : 960;
  const scale = viewportSize.width > 0 ? Math.min(1, viewportSize.width / targetDesktopWidth) : (featured ? 0.625 : 0.4);
  const iframeWidth = targetDesktopWidth;
  const iframeHeight = viewportSize.height > 0 && scale > 0
    ? Math.round(viewportSize.height / scale)
    : (featured ? 800 : 600);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isAntigravity || isInteractive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tilt angle max +/- 6 degrees for stability with iframe
    const rx = ((y - centerY) / centerY) * -6;
    const ry = ((x - centerX) / centerX) * 6;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rx, ry, glareX, glareY, glareOpacity: 0.12 });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50, glareOpacity: 0 });
  };

  const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || '#3178C6' : '#3178C6';

  // Live URL from GitHub homepage or fallback
  const liveUrl = repo.homepage && repo.homepage.trim() !== '' ? repo.homepage : null;

  // Format clean URL for browser omnibox
  const displayUrl = liveUrl
    ? liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `github.com/${repo.full_name}`;

  // Reload iframe function
  const handleReload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsIframeLoaded(false);
    setIframeKey(prev => prev + 1);
  };

  // Card style: if in antigravity mode, absolute floating position
  const cardStyle: React.CSSProperties = isAntigravity && physicsPos
    ? {
        position: 'absolute',
        left: `${physicsPos.x}px`,
        top: `${physicsPos.y}px`,
        transform: `translate3d(-50%, -50%, 0) rotate(${physicsPos.rot}deg)`,
        zIndex: 30,
        width: '380px',
        touchAction: 'none',
        cursor: 'grab'
      }
    : {
        transform: isInteractive
          ? 'none'
          : `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
        transition: 'transform 0.18s cubic-bezier(0.2, 0.8, 0.4, 1), box-shadow 0.18s ease'
      };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={isAntigravity && onDragStart ? (e) => onDragStart(e, repo.id) : undefined}
      data-cursor={isAntigravity ? 'drag' : isInteractive ? 'default' : 'view'}
      style={cardStyle}
      className={`group relative rounded-2xl bg-card border border-border/90 hover:border-primary/60 transition-colors flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5 ${
        featured ? 'w-full h-full min-h-[560px] lg:min-h-[620px]' : 'min-h-[400px]'
      }`}
    >
      {/* 3D Specular Glare Highlight */}
      {!isAntigravity && !isInteractive && (
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.28) 0%, transparent 60%)`,
            opacity: tilt.glareOpacity
          }}
        />
      )}

      {/* ============================================================== */}
      {/* BROWSER TOP BAR (Chrome / Address Bar / Controls)              */}
      {/* ============================================================== */}
      <div className="w-full bg-secondary/90 border-b border-border/80 px-4 py-2.5 flex items-center justify-between gap-3 select-none z-20">
        {/* macOS Style Traffic Lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 shadow-sm" />
        </div>

        {/* Browser Navigation Arrows & Reload */}
        <div className="flex items-center gap-1 text-muted-foreground/70 shrink-0">
          <button
            type="button"
            className="p-1 hover:text-foreground transition-colors disabled:opacity-40"
            disabled
            title="Back"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 hover:text-foreground transition-colors disabled:opacity-40"
            disabled
            title="Forward"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          {liveUrl && (
            <button
              type="button"
              onClick={handleReload}
              className="p-1 hover:text-primary transition-colors"
              title="Reload live page in card"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Address Bar (Omnibox) */}
        <div
          className="flex-1 max-w-[340px] flex items-center gap-2 px-3 py-1 rounded-full bg-background/90 border border-border/80 text-[11px] font-mono text-muted-foreground group-hover:border-primary/40 transition-colors truncate"
          title={liveUrl || repo.html_url}
        >
          {repo.isPrivate ? (
            <Lock className="w-3 h-3 text-amber-500 shrink-0" />
          ) : (
            <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
          )}
          <span className="truncate text-foreground/90 font-medium">{displayUrl}</span>
        </div>

        {/* Top-Right Badges: Live Status & New Tab Launcher */}
        <div className="flex items-center gap-2 font-mono text-[11px] shrink-0">
          {repo.isPrivate && (
            <span
              className="inline-flex items-center gap-1 text-amber-500 font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25"
              title="Private Repository"
            >
              <Lock className="w-2.5 h-2.5 text-amber-500" />
              <span>PRIVATE</span>
            </span>
          )}
          {liveUrl ? (
            <span className="inline-flex items-center gap-1 text-emerald-500 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">LIVE</span>
            </span>
          ) : !repo.isPrivate ? (
            <span className="inline-flex items-center gap-1 text-muted-foreground px-2 py-0.5 rounded-full bg-secondary">
              <span>SOURCE</span>
            </span>
          ) : null}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1 text-muted-foreground hover:text-primary transition-colors"
              title="Open full page in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* LIVE WEBPAGE VIEWPORT (Embedded Interactive Live Page)         */}
      {/* ============================================================== */}
      <div
        ref={viewportRef}
        className={`relative w-full overflow-hidden bg-background border-b border-border/70 group/viewport ${
          featured ? 'flex-1 min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]' : 'h-56 sm:h-64'
        }`}
      >
        {liveUrl ? (
          <>
            {/* Embedded Live Web Application via Iframe */}
            <iframe
              key={iframeKey}
              src={liveUrl}
              title={repo.cleanName}
              loading="lazy"
              onLoad={() => setIsIframeLoaded(true)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              style={{
                width: `${iframeWidth}px`,
                height: `${iframeHeight}px`,
                transform: `scale(${scale})`,
                transformOrigin: '0 0'
              }}
              className={`border-0 transition-opacity duration-300 ${
                isIframeLoaded ? 'opacity-100' : 'opacity-20'
              } ${isInteractive ? 'pointer-events-auto' : 'pointer-events-none'}`}
            />

            {/* Shimmer loading skeleton while iframe initialises */}
            {!isIframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <RotateCw className="w-4 h-4 animate-spin text-primary" />
                  <span>Loading live deployment...</span>
                </div>
              </div>
            )}

            {/* Interactive Toggle Pill on Hover */}
            <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsInteractive(!isInteractive);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium shadow-md transition-all ${
                  isInteractive
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                    : 'bg-card/90 hover:bg-card border border-border text-foreground backdrop-blur-md'
                }`}
              >
                <MousePointerClick className="w-3.5 h-3.5 text-primary" />
                <span>{isInteractive ? 'Interacting (Click to Lock)' : 'Interact with Page'}</span>
              </button>
            </div>
          </>
        ) : (
          /* High-Fidelity Web Application Preview for Repos without direct live URL */
          <div
            onClick={() => onSelect(repo)}
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-secondary/40 via-background to-secondary/20 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-3 shadow-inner">
              <Code2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg text-foreground font-normal mb-1">
              {repo.cleanName}
            </h4>
            <p className="text-xs text-muted-foreground font-sans max-w-xs line-clamp-2 mb-3">
              {repo.description || 'Full-stack software application codebase.'}
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary border border-border text-[11px] font-mono text-primary">
              <Sparkles className="w-3 h-3" />
              <span>Click to Inspect README &amp; Telemetry</span>
            </span>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* BROWSER CARD METADATA (Details, Tags, Language, Source Code)   */}
      {/* ============================================================== */}
      <div
        className="p-5 shrink-0 flex flex-col justify-between cursor-pointer bg-card"
        onClick={() => {
          if (!isInteractive) onSelect(repo);
        }}
      >
        <div>
          {/* Header row: title and stars */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3
              className={`font-serif text-foreground font-normal tracking-tight group-hover:text-primary transition-colors ${
                featured ? 'text-xl sm:text-2xl' : 'text-lg'
              }`}
            >
              {repo.cleanName}
            </h3>

            {/* Stars pill */}
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground shrink-0 mt-1">
              {repo.stargazers_count > 0 && (
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{repo.stargazers_count}</span>
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground font-sans text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3">
            {repo.description || 'Full-stack application engineered with modern web standards and high responsiveness.'}
          </p>

          {/* Topic chips */}
          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {repo.topics.slice(0, 4).map(topic => (
                <span
                  key={topic}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/50"
                >
                  #{topic}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer info: Language dot, push time, direct action buttons */}
        <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-foreground/90 font-medium">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: langColor }}
              />
              {repo.language || 'TypeScript'}
            </span>

            <span className="flex items-center gap-1 text-muted-foreground text-[11px]">
              <Clock className="w-3 h-3" />
              {repo.relativeTime}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-medium hover:opacity-95 shadow-sm transition-all"
                title="Open live app in new tab"
              >
                <Globe className="w-3 h-3" />
                <span>Demo</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            )}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors border border-border"
              title="View source on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
