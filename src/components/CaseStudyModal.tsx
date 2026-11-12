import React, { useEffect } from 'react';
import { FeaturedCaseStudy, PORTFOLIO_CONFIG } from '../config';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  Target,
  Lightbulb,
  UserCheck
} from 'lucide-react';

interface CaseStudyModalProps {
  project: FeaturedCaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Case Study`}
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl h-full bg-card border-l border-border shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-border bg-secondary/40 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-mono text-[11px] uppercase px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 font-semibold">
                {project.organization}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                • {project.status}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{project.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-background hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors shrink-0"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Overview */}
          <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
            {project.summary}
          </p>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-secondary/50 border border-border">
              <div className="flex items-center gap-2 font-mono text-xs uppercase text-amber-500 font-semibold mb-2">
                <Target className="w-4 h-4" />
                <span>Problem Addressed</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-secondary/50 border border-border">
              <div className="flex items-center gap-2 font-mono text-xs uppercase text-primary font-semibold mb-2">
                <Lightbulb className="w-4 h-4" />
                <span>Solution Delivered</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* My Contribution */}
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 font-mono text-xs uppercase text-primary font-semibold mb-1.5">
              <UserCheck className="w-4 h-4" />
              <span>Role &amp; Contribution</span>
            </div>
            <p className="text-sm text-foreground/90">{project.contribution}</p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span>Key Features &amp; Scope</span>
            </h3>
            <ul className="grid grid-cols-1 gap-2">
              {project.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-foreground/90 p-2.5 rounded-lg bg-secondary/35 border border-border/60"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2.5">
              Technologies &amp; Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="font-mono text-xs px-3 py-1 rounded-lg bg-secondary text-foreground border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="p-5 border-t border-border bg-secondary/40 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-muted-foreground">
            {PORTFOLIO_CONFIG.name} • Case Study
          </span>

          <div className="flex items-center gap-2.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card hover:bg-secondary border border-border text-foreground font-mono text-xs font-medium transition-colors"
              >
                <Github className="w-4 h-4 text-primary" />
                <span>Source Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-semibold hover:opacity-95 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Deployment</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;

