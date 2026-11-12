import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { HeroScene } from './HeroScene';
import { PORTFOLIO_CONFIG } from '../config';
import { GitHubRepo } from '../lib/github';
import {
  ArrowRight,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Terminal,
  Code2,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface HeroSectionProps {
  latestRepo: GitHubRepo | null;
  repoCount?: number | null;
  onExploreProjects: () => void;
  onContactClick: () => void;
  onOpenCVPreview: () => void;
}

interface CounterProps {
  target: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ target, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setCount(target);
      return;
    }

    let start = 0;
    const duration = 900;
    const stepTime = 20;
    const totalSteps = Math.ceil(duration / stepTime);
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  latestRepo,
  repoCount,
  onExploreProjects,
  onContactClick,
  onOpenCVPreview
}) => {
  // Typing role cycler
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Status terminal line cycler
  const [bootLineIndex, setBootLineIndex] = useState(0);

  useEffect(() => {
    const roles = PORTFOLIO_CONFIG.typingRoles;
    const currentRole = roles[roleIndex];

    const speed = isDeleting ? 35 : 65;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = currentRole.slice(0, typedRole.length + 1);
        setTypedRole(next);
        if (next === currentRole) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        const next = currentRole.slice(0, typedRole.length - 1);
        setTypedRole(next);
        if (next === '') {
          setIsDeleting(false);
          setRoleIndex(prev => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [typedRole, isDeleting, roleIndex]);

  useEffect(() => {
    const lines = PORTFOLIO_CONFIG.bootSequence;
    const interval = setInterval(() => {
      setBootLineIndex(prev => (prev + 1) % lines.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Years Active in Tech', value: 4, suffix: '+', detail: 'Since May 2022' },
    { label: 'Organizations Served', value: 5, suffix: '', detail: 'Engineering & IT Support' },
    { label: 'Verified Certifications', value: 7, suffix: '', detail: 'IT Support, Net & Web' },
    {
      label: 'Public Repositories',
      value: repoCount && repoCount > 0 ? repoCount : 37,
      suffix: '+',
      detail: 'Live GitHub Sync'
    }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-10 px-4 sm:px-8 lg:px-12 overflow-hidden border-b border-border/60 bg-tech-grid"
    >
      {/* Interactive Network Constellation Background */}
      <HeroScene interactive={true} />

      {/* Controlled ambient radial lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[780px] h-[440px] rounded-full bg-primary/15 blur-[130px] z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-10 w-[420px] h-[320px] rounded-full bg-cyan-500/10 blur-[120px] z-0"
      />

      {/* Top Live Status Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 mb-8">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card/85 border border-border backdrop-blur-md shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] text-foreground font-medium">
            {PORTFOLIO_CONFIG.availability}
          </span>
        </div>

        <div className="inline-flex items-center gap-3">
          {latestRepo && (
            <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/85 border border-primary/25 backdrop-blur-md text-xs font-mono">
              <span className="text-muted-foreground">LATEST PUSH:</span>
              <a
                href={latestRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium max-w-[180px] truncate"
              >
                {latestRepo.cleanName}
              </a>
            </div>
          )}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/85 border border-border backdrop-blur-md text-xs font-mono text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>{PORTFOLIO_CONFIG.location}</span>
          </div>
        </div>
      </div>

      {/* Main Hero Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Primary Copy & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Role Typing Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-primary/10 border border-primary/25 text-primary font-mono text-xs sm:text-sm">
            <Terminal className="w-4 h-4 shrink-0" />
            <span className="font-semibold">
              {typedRole || PORTFOLIO_CONFIG.typingRoles[0]}
            </span>
            <span className="w-0.5 h-4 bg-primary animate-pulse" />
          </div>

          {/* Name & Headline */}
          <div className="space-y-3">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-muted-foreground">
              Hello, I&apos;m{' '}
              <span className="text-foreground font-semibold">{PORTFOLIO_CONFIG.name}</span>
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-foreground leading-[1.12]">
              Building Digital Solutions.{' '}
              <span className="gradient-text-primary">Engineering Technology.</span>{' '}
              Solving Real-World Problems.
            </h1>
          </div>

          {/* Supporting Introduction */}
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            {PORTFOLIO_CONFIG.bio}
          </p>

          {/* Dual Discipline Pills */}
          <div className="flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium text-foreground">
              <Code2 className="w-3.5 h-3.5 text-primary" />
              Software Engineering &amp; Full-Stack Development
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium text-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
              Technical Support &amp; Systems Administration
            </span>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onExploreProjects}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
            >
              <span>View My Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={PORTFOLIO_CONFIG.socials.resume}
              download={PORTFOLIO_CONFIG.cvFilename}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-card hover:bg-secondary border border-border text-foreground font-semibold text-sm transition-all hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4 text-primary" />
              <span>Download CV</span>
            </a>

            <button
              type="button"
              onClick={onOpenCVPreview}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-secondary/70 hover:bg-secondary border border-border/80 text-foreground text-sm font-medium transition-colors"
            >
              <FileText className="w-4 h-4 text-primary" />
              <span>Preview CV</span>
            </button>
          </div>

          {/* Secondary Contact & Socials Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-muted-foreground">
            <button
              type="button"
              onClick={onContactClick}
              className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>Contact Me</span>
            </button>
            <span className="text-border">|</span>
            <a
              href={PORTFOLIO_CONFIG.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-primary" />
              <span>GitHub</span>
            </a>
            <a
              href={PORTFOLIO_CONFIG.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-primary" />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Executive Engineer Card & Live Stack Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="relative rounded-2xl bg-card/90 border border-border/90 p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-4 pb-5 border-b border-border/70">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full sm:rounded-2xl overflow-hidden ring-2 ring-primary/40 shadow-md shrink-0 bg-secondary">
                <img
                  src={PORTFOLIO_CONFIG.photoUrl}
                  alt={PORTFOLIO_CONFIG.name}
                  loading="eager"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold text-lg text-foreground truncate">
                  {PORTFOLIO_CONFIG.name}
                </h2>
                <p className="text-xs text-primary font-medium mt-0.5">
                  Software Engineer &amp; Technical Support
                </p>
                <p className="font-mono text-[11px] text-muted-foreground mt-1">
                  B.Sc. Computer Science • UoPeople (12/2025)
                </p>
              </div>
            </div>

            {/* Core Disciplines Summary */}
            <div className="grid grid-cols-2 gap-3 py-4 border-b border-border/70 text-xs">
              <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                <span className="font-mono text-[10px] uppercase text-primary font-semibold block">
                  PRIMARY FOCUS
                </span>
                <span className="font-semibold text-foreground mt-1 block">
                  Full-Stack &amp; ERP/POS
                </span>
                <span className="text-[11px] text-muted-foreground mt-0.5 block">
                  React, Node.js, PostgreSQL
                </span>
              </div>
              <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                <span className="font-mono text-[10px] uppercase text-cyan-500 font-semibold block">
                  IT OPERATIONS
                </span>
                <span className="font-semibold text-foreground mt-1 block">
                  Systems &amp; Tech Support
                </span>
                <span className="text-[11px] text-muted-foreground mt-0.5 block">
                  Networks, Starlink, Servers
                </span>
              </div>
            </div>

            {/* Rotating Telemetry Terminal */}
            <div className="mt-4 p-3 rounded-xl bg-background/80 border border-border font-mono text-[11px] text-muted-foreground flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0 animate-pulse" />
              <span className="truncate text-foreground/90">
                {PORTFOLIO_CONFIG.bootSequence[bootLineIndex]}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Professional Statistics Strip */}
      <div className="relative z-10 w-full max-w-7xl mx-auto mt-8 pt-6 border-t border-border/60">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-card/75 backdrop-blur-md border border-border/80 flex flex-col justify-between"
            >
              <span className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs font-medium text-foreground/90 mt-1">{stat.label}</span>
              <span className="font-mono text-[10px] text-muted-foreground mt-0.5">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="hidden sm:flex justify-center mt-5">
          <a
            href="#about"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Scroll to explore</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
