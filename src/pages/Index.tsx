import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import TechnicalSupportSection from '../components/TechnicalSupportSection';
import ExperienceSection from '../components/ExperienceSection';
import ServicesSection from '../components/ServicesSection';
import ProjectsSection from '../components/ProjectsSection';
import ProcessSection from '../components/ProcessSection';
import EducationSection from '../components/EducationSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import CommandPalette from '../components/CommandPalette';
import CVPreviewModal from '../components/CVPreviewModal';
import { initSmoothScroll } from '../lib/lenis';
import { fetchGitHubRepos, GitHubRepo } from '../lib/github';
import { PORTFOLIO_CONFIG } from '../config';

const Index: React.FC = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCVPreviewOpen, setIsCVPreviewOpen] = useState(false);
  const [latestRepo, setLatestRepo] = useState<GitHubRepo | null>(null);
  const [repoCount, setRepoCount] = useState<number | null>(null);

  useEffect(() => {
    const scroller = initSmoothScroll();

    fetchGitHubRepos(PORTFOLIO_CONFIG.githubUsername)
      .then(res => {
        if (res.stats.mostRecentRepo) {
          setLatestRepo(res.stats.mostRecentRepo);
        }
        if (res.stats.totalRepos) {
          setRepoCount(res.stats.totalRepos);
        }
      })
      .catch(() => {});

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
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
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-primary-foreground font-mono text-xs rounded-lg shadow-lg"
      >
        Skip to Main Content
      </a>

      {/* Sticky Navigation Bar */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Main Content */}
      <main id="main-content">
        <HeroSection
          latestRepo={latestRepo}
          repoCount={repoCount}
          onExploreProjects={() => scrollToSection('projects')}
          onContactClick={() => scrollToSection('contact')}
          onOpenCVPreview={() => setIsCVPreviewOpen(true)}
        />

        <AboutSection onOpenCVPreview={() => setIsCVPreviewOpen(true)} />

        <SkillsSection />

        <TechnicalSupportSection />

        <ExperienceSection />

        <ServicesSection />

        <ProjectsSection />

        <ProcessSection />

        <EducationSection />

        <ContactSection />
      </main>

      <Footer />

      {/* Command Palette (⌘K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenCVPreview={() => setIsCVPreviewOpen(true)}
      />

      {/* CV Preview Modal */}
      <CVPreviewModal
        isOpen={isCVPreviewOpen}
        onClose={() => setIsCVPreviewOpen(false)}
      />
    </div>
  );
};

export default Index;
