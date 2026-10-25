import React, { useState, useEffect } from 'react';
import Preloader from '../components/Preloader';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import DualitySection from '../components/DualitySection';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import CommandPalette from '../components/CommandPalette';
import { initSmoothScroll } from '../lib/lenis';
import { fetchGitHubRepos, GitHubRepo } from '../lib/github';
import { PORTFOLIO_CONFIG } from '../config';

const Index: React.FC = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [latestRepo, setLatestRepo] = useState<GitHubRepo | null>(null);

  useEffect(() => {
    // Initialize smooth scrolling with Lenis / RAF
    const scroller = initSmoothScroll();

    // Fetch initial GitHub telemetry for "Currently Building" status
    fetchGitHubRepos(PORTFOLIO_CONFIG.githubUsername)
      .then(res => {
        if (res.stats.mostRecentRepo) {
          setLatestRepo(res.stats.mostRecentRepo);
        }
      })
      .catch(() => {});

    // Keyboard listener for Cmd+K / Ctrl+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      scroller.destroy();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans bg-grain selection:bg-primary/20 selection:text-primary">
      {/* Skip link for keyboard accessibility */}
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-primary-foreground font-mono text-xs rounded-lg shadow-lg"
      >
        Skip to Projects
      </a>

      {/* Signature Preloader */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Zero Gravity Custom Cursor */}
      <CustomCursor />

      {/* Floating Glassmorphic Navbar */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 1. Hero with WebGL PCB Constellation & Boot Terminal */}
        <HeroSection
          latestRepo={latestRepo}
          onExploreProjects={() => scrollToSection('projects')}
          onOpenDuality={() => scrollToSection('duality')}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* 2. Hardware / Software Duality (Split-morph View) */}
        <DualitySection />

        {/* 3. GitHub Projects Section (Live fetch, Bento, Antigravity Physics) */}
        <ProjectsSection />

        {/* 4. Identity & Foundational Bio (Parallax frame, Skills Matrix) */}
        <AboutSection />

        {/* 5. Experience (Horizontal Timeline) */}
        <ExperienceSection />

        {/* 6. Contact Section (Magnetic CTA, Dispatch Form) */}
        <ContactSection />
      </main>

      {/* 7. Footer with Live Local Time in Accra & Solder Fumes */}
      <Footer />

      {/* Command Palette (⌘K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
};

export default Index;
