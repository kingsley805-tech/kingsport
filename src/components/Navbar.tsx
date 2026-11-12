import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '../config';
import { Sun, Moon, Search, Download, Menu, X, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize theme: Dark mode primary unless user explicitly saved light
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio_theme');
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : true;

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Track scroll position, progress, and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;

      setIsScrolled(totalScroll > 24);
      setScrollProgress(Number.isFinite(scroll) ? Math.min(1, Math.max(0, scroll)) : 0);

      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Toggle with smooth circular reveal if supported
  const toggleTheme = (e: React.MouseEvent) => {
    const nextDark = !isDark;
    const x = e.clientX;
    const y = e.clientY;

    const applyTheme = () => {
      setIsDark(nextDark);
      if (nextDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('portfolio_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('portfolio_theme', 'light');
      }
    };

    if ('startViewTransition' in document) {
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      const transition = (document as any).startViewTransition(applyTheme);
      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
              ]
            },
            {
              duration: 450,
              easing: 'cubic-bezier(0.85, 0, 0.15, 1)',
              pseudoElement: '::view-transition-new(root)'
            }
          );
        })
        .catch(() => {});
    } else {
      applyTheme();
    }
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-border/70 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Brand Profile Logo & Name */}
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl p-1"
          aria-label={`${PORTFOLIO_CONFIG.name} - Return to top`}
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-primary/40 shadow-md shadow-primary/20 group-hover:ring-primary group-hover:scale-105 transition-all shrink-0 bg-secondary">
            <img
              src={PORTFOLIO_CONFIG.photoUrl}
              alt={PORTFOLIO_CONFIG.name}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
          </div>
          <div className="text-left">
            <span className="font-sans text-sm font-semibold text-foreground leading-none block group-hover:text-primary transition-colors">
              {PORTFOLIO_CONFIG.name}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase leading-none mt-1 block">
              Software &amp; IT Support
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-full bg-card/70 backdrop-blur-md border border-border/80"
        >
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-primary -z-10 shadow-sm"
                  />
                )}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Command Palette, Download CV, Theme Toggle, Mobile Hamburger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-card/80 hover:bg-secondary border border-border text-muted-foreground hover:text-foreground text-xs font-mono transition-colors"
            title="Command Palette (⌘K / Ctrl+K)"
            aria-label="Open Command Palette"
          >
            <Search className="w-3.5 h-3.5 text-primary" />
            <kbd className="hidden xl:inline text-[10px] text-muted-foreground">⌘K</kbd>
          </button>

          <a
            href={PORTFOLIO_CONFIG.socials.resume}
            download={PORTFOLIO_CONFIG.cvFilename}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-sm shadow-primary/20 hover:opacity-95 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-card/80 hover:bg-secondary border border-border text-foreground transition-all hover:scale-105 active:scale-95"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
            aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-primary" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden p-2 rounded-xl bg-card/80 hover:bg-secondary border border-border text-foreground transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Scroll Progress Line */}
      <div
        className="h-[2px] bg-gradient-to-r from-primary via-sky-400 to-cyan-400 transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Animated Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden bg-card/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <nav
              aria-label="Mobile Navigation"
              className="px-4 py-4 space-y-1 max-w-7xl mx-auto"
            >
              <div className="grid grid-cols-2 gap-1.5">
                {NAV_LINKS.map(link => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5 opacity-70" />
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 mt-2 border-t border-border/70 flex items-center gap-2">
                <a
                  href={PORTFOLIO_CONFIG.socials.resume}
                  download={PORTFOLIO_CONFIG.cvFilename}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CV (PDF)</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-secondary border border-border text-xs font-mono text-foreground"
                >
                  ⌘K
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
