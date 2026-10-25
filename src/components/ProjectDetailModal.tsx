import React, { useEffect, useState } from 'react';
import { GitHubRepo, fetchRepoReadme, fetchRepoLanguages, LANGUAGE_COLORS, LanguageBreakdown } from '../lib/github';
import { X, ExternalLink, Github, Star, GitFork, Cpu, Code2, Clock, Terminal, Layers } from 'lucide-react';

interface ProjectDetailModalProps {
  repo: GitHubRepo | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ repo, onClose }) => {
  const [readmeHtml, setReadmeHtml] = useState<string | null>(null);
  const [languages, setLanguages] = useState<LanguageBreakdown | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!repo) {
      setReadmeHtml(null);
      setLanguages(null);
      return;
    }

    setIsLoading(true);

    // Fetch README & Languages concurrently
    Promise.all([
      fetchRepoReadme(repo.full_name),
      fetchRepoLanguages(repo.full_name)
    ]).then(([readme, langs]) => {
      setReadmeHtml(readme);
      setLanguages(langs);
      setIsLoading(false);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [repo, onClose]);

  if (!repo) return null;

  // Calculate Language percentages
  const totalBytes = languages ? Object.values(languages).reduce((acc, bytes) => acc + bytes, 0) : 0;
  const languagePercentages = languages && totalBytes > 0
    ? Object.entries(languages)
        .map(([lang, bytes]) => ({
          lang,
          percent: Math.round((bytes / totalBytes) * 1000) / 10,
          color: LANGUAGE_COLORS[lang] || '#8B949E'
        }))
        .filter(item => item.percent >= 0.5)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-2xl h-full bg-card border-l border-border shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between gap-4 bg-secondary/50">
          <div className="flex items-center gap-3">
            <span
              className={`p-2 rounded-lg ${
                repo.isHardware
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  : 'bg-primary/10 text-primary border border-primary/20'
              }`}
            >
              {repo.isHardware ? <Cpu className="w-5 h-5" /> : <Code2 className="w-5 h-5" />}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground uppercase">
                  {repo.category} Telemetry
                </span>
                <span className="font-mono text-xs text-muted-foreground">•</span>
                <span className="font-mono text-xs text-muted-foreground">{repo.relativeTime}</span>
              </div>
              <h2 className="font-serif text-2xl text-foreground font-normal tracking-tight">
                {repo.cleanName}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors"
            title="Close Panel (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-secondary/60 border border-border/80 font-mono text-xs">
            <div>
              <span className="text-muted-foreground block text-[11px]">PRIMARY LANG</span>
              <span className="font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: LANGUAGE_COLORS[repo.language || ''] || '#8B949E' }}
                />
                {repo.language || 'Unknown'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">STARS</span>
              <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {repo.stargazers_count}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">FORKS</span>
              <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                <GitFork className="w-3.5 h-3.5" />
                {repo.forks_count}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">SIZE</span>
              <span className="font-semibold text-foreground mt-0.5 block">
                {(repo.size / 1024).toFixed(1)} MB
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
              OVERVIEW
            </h4>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-sans">
              {repo.description || 'No description provided.'}
            </p>
          </div>

          {/* Topics */}
          {repo.topics.length > 0 && (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                TOPICS &amp; TAGS
              </h4>
              <div className="flex flex-wrap gap-2">
                {repo.topics.map(topic => (
                  <span
                    key={topic}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-secondary text-primary border border-primary/20"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Language Breakdown Bar */}
          {languagePercentages.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  LANGUAGE BREAKDOWN
                </h4>
                <span className="font-mono text-xs text-muted-foreground">
                  Total {(totalBytes / 1024).toFixed(0)} KB
                </span>
              </div>

              {/* Segmented Progress Bar */}
              <div className="w-full h-3 rounded-full overflow-hidden flex bg-secondary border border-border/80">
                {languagePercentages.map(item => (
                  <div
                    key={item.lang}
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: item.color
                    }}
                    title={`${item.lang}: ${item.percent}%`}
                    className="h-full transition-all duration-300"
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-3 font-mono text-xs">
                {languagePercentages.map(item => (
                  <div key={item.lang} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-foreground">{item.lang}</span>
                    <span className="text-muted-foreground">{item.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lazy Loaded README Section */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-primary" />
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                README.md PREVIEW
              </h4>
            </div>

            {isLoading ? (
              <div className="space-y-3 py-6">
                <div className="h-4 bg-muted/60 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-muted/60 rounded animate-pulse w-full" />
                <div className="h-4 bg-muted/60 rounded animate-pulse w-5/6" />
                <div className="h-24 bg-muted/40 rounded-xl animate-pulse mt-4" />
              </div>
            ) : (
              <div
                className="prose dark:prose-invert max-w-none text-sm text-foreground/90 font-sans leading-relaxed border border-border/70 rounded-xl p-5 bg-background/50 overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: readmeHtml || '' }}
              />
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-5 border-t border-border bg-secondary/40 flex items-center justify-between gap-3">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-medium hover:opacity-95 transition-opacity"
          >
            <Github className="w-4 h-4" />
            <span>Open on GitHub</span>
          </a>

          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-card hover:bg-secondary border border-border text-foreground font-mono text-xs font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-primary" />
              <span>Live System</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
