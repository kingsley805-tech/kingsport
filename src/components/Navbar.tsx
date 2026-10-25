import React, { useEffect, useState, useRef } from 'react';
import { PORTFOLIO_CONFIG } from '../config';
import { Sun, Moon, Search, Cpu, Sparkles, Orbit } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [isDark, setIsDark] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // Initialize theme from system or localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Track scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(Number.isFinite(scroll) ? Math.min(1, Math.max(0, scroll)) : 0);

      // Determine active section
      const sections = ['hero', 'duality', 'projects', 'about', 'experience', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Circular Reveal Theme Toggle
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

    // If browser supports View Transitions API, animate circular reveal
    if ('startViewTransition' in document) {
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = (document as any).startViewTransition(applyTheme);

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 500,
            easing: 'cubic-bezier(0.85, 0, 0.15, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
    } else {
      applyTheme();
    }
  };

  const navLinks = [
    { id: 'hero', label: 'Telemetry' },
    { id: 'duality', label: 'Duality' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'Identity' },
    { id: 'experience', label: 'Timeline' },
    { id: 'contact', label: 'Dispatch' }
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-8 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand / Circuit Chip Icon */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 p-2 rounded-2xl bg-card/85 backdrop-blur-md border border-border hover:border-primary/50 shadow-sm transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="font-serif text-sm font-normal text-foreground leading-none block">
              {PORTFOLIO_CONFIG.shortName}
            </span>
            <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest leading-none mt-0.5 block">
              HW / SW ARCHITECT
            </span>
          </div>
        </button>

        {/* Center Floating Nav Pill with spring indicator */}
        <nav className="relative flex items-center gap-1 p-1.5 rounded-full bg-card/85 backdrop-blur-md border border-border shadow-lg shadow-black/5 overflow-hidden">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-3 sm:px-4 py-1.5 rounded-full font-mono text-xs transition-colors duration-200 z-10 ${
                  isActive
                    ? 'text-primary-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {/* Active spring capsule background */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-primary -z-10 shadow-sm transition-all" />
                )}
                <span>{link.label}</span>
              </button>
            );
          })}

          {/* Circuit trace scroll progress line at bottom of pill */}
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-primary transition-[width] duration-75 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </nav>

        {/* Right Actions: Command Palette trigger & Circular Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="p-2.5 rounded-full bg-card/85 hover:bg-secondary border border-border text-muted-foreground hover:text-foreground shadow-sm transition-all"
            title="Open Command Palette (⌘K / Ctrl+K)"
          >
            <Search className="w-4 h-4 text-primary" />
          </button>

          {/* Theme Toggle with Circular Reveal */}
          <button
            ref={toggleBtnRef}
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-card/85 hover:bg-secondary border border-border text-foreground shadow-sm transition-all hover:scale-105 active:scale-95"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-primary" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
