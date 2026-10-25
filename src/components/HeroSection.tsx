import React, { useEffect, useState } from 'react';
import { HeroScene } from './HeroScene';
import { PORTFOLIO_CONFIG } from '../config';
import { GitHubRepo } from '../lib/github';
import { Terminal, ArrowDown, Cpu, Code2, Sparkles, ExternalLink, Mail, Check } from 'lucide-react';

interface HeroSectionProps {
  latestRepo: GitHubRepo | null;
  onExploreProjects: () => void;
  onOpenDuality: () => void;
  onOpenCommandPalette: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  latestRepo,
  onExploreProjects,
  onOpenDuality,
  onOpenCommandPalette
}) => {
  // Live typing boot sequence terminal line
  const [bootLineIndex, setBootLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const lines = PORTFOLIO_CONFIG.bootSequence;
    const currentLine = lines[bootLineIndex];
    let charIndex = 0;
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      charIndex++;
      setDisplayedText(currentLine.slice(0, charIndex));

      if (charIndex >= currentLine.length) {
        clearInterval(typeInterval);
        setIsTyping(false);
        // Wait before typing next line
        const timeout = setTimeout(() => {
          setBootLineIndex(prev => (prev + 1) % lines.length);
        }, 3400);
        return () => clearTimeout(timeout);
      }
    }, 28);

    return () => clearInterval(typeInterval);
  }, [bootLineIndex]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-border/50"
    >
      {/* 3D WebGL Background Scene */}
      <HeroScene interactive={true} />

      {/* Subtle radial lighting vignette */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none z-[1] opacity-75" />

      {/* Top telemetry & status bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Currently Building live status badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card/80 border border-primary/25 backdrop-blur-md shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            CURRENTLY BUILDING:
          </span>
          <span className="font-mono text-xs font-medium text-foreground max-w-[200px] sm:max-w-xs truncate">
            {latestRepo ? latestRepo.cleanName : 'aeropulse-avionics-node'}
          </span>
        </div>

        {/* Quick Command Palette trigger badge */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary border border-border text-xs font-mono text-muted-foreground hover:text-foreground transition-all"
        >
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-foreground font-semibold">
            ⌘K
          </kbd>
          <span>for Command Palette</span>
        </button>
      </div>

      {/* Main Hero Typography & Callout */}
      <div className="relative z-10 w-full max-w-5xl mx-auto my-auto py-12">
        {/* Subtitle tag */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="h-[1px] w-8 bg-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
            {PORTFOLIO_CONFIG.title}
          </span>
        </div>

        {/* Editorial Serif Display Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-foreground font-normal leading-[1.04] mb-6">
          Clean intelligence meets{' '}
          <span className="italic text-primary relative inline-block">
            zero gravity.
            <svg
              className="absolute -bottom-2 left-0 w-full h-2 text-primary/30"
              viewBox="0 0 200 8"
              fill="none"
              preserveAspectRatio="none"
            >
              <path d="M0 7 C 50 0, 150 0, 200 7" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        </h1>

        {/* Bio paragraph with high legibility */}
        <p className="max-w-2xl text-base sm:text-xl text-muted-foreground leading-relaxed font-sans font-light mb-8">
          {PORTFOLIO_CONFIG.bio}
        </p>

        {/* Live Boot Sequence Terminal Bar */}
        <div className="max-w-2xl mb-10 p-3.5 rounded-xl bg-card/90 border border-primary/20 backdrop-blur-md shadow-lg shadow-black/5 flex items-center gap-3">
          <div className="flex items-center gap-1.5 pl-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <Terminal className="w-4 h-4 text-primary shrink-0 ml-1" />
          <div className="font-mono text-xs text-foreground/90 truncate flex-1">
            <span className="text-primary font-semibold">&gt; </span>
            {displayedText}
            <span
              className={`inline-block w-1.5 h-3.5 ml-1 bg-primary align-middle ${
                isTyping ? 'opacity-100' : 'animate-pulse'
              }`}
            />
          </div>
          <span className="hidden sm:inline-block font-mono text-[10px] text-primary/70 uppercase px-2 py-0.5 rounded bg-primary/10">
            ONLINE
          </span>
        </div>

        {/* Call to Action Buttons with Magnetic Feel */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreProjects}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-sans font-medium text-sm tracking-wide shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Cpu className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span>Explore Telemetry &amp; Projects</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <button
            onClick={onOpenDuality}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-card hover:bg-secondary border border-border text-foreground font-sans font-medium text-sm tracking-wide hover:-translate-y-0.5 transition-all duration-200"
          >
            <Code2 className="w-4 h-4 text-primary" />
            <span>Hardware/Software Duality</span>
          </button>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-secondary/80 hover:bg-secondary border border-border text-muted-foreground hover:text-foreground text-sm font-mono transition-all"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-500 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                <span>{PORTFOLIO_CONFIG.email}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom specs strip */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/40 font-mono text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center gap-6">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            LOC: {PORTFOLIO_CONFIG.location.split('(')[0].trim()}
          </span>
          <span className="hidden sm:inline">ARCH: ARM Cortex-M7 / ESP-IDF / Cloud</span>
          <span className="hidden md:inline">FREQ: 480MHz Core</span>
        </div>

        <div className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors cursor-pointer" onClick={onExploreProjects}>
          <span>Scroll to enter zero gravity</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
