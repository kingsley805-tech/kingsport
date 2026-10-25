import React, { useEffect, useState } from 'react';
import { PORTFOLIO_CONFIG } from '../config';
import { Heart, Flame, ArrowUp, Cpu, Radio } from 'lucide-react';

export const Footer: React.FC = () => {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: PORTFOLIO_CONFIG.timezone || 'Africa/Accra',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
        setLocalTime(timeStr);
      } catch {
        setLocalTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-6 sm:px-10 lg:px-16 bg-card border-t border-border text-muted-foreground font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left identity & tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-serif text-lg text-foreground font-normal tracking-tight">
            {PORTFOLIO_CONFIG.name}
          </span>
          <span className="hidden sm:inline text-border">•</span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            Built with <Heart className="w-3.5 h-3.5 text-primary fill-primary inline" /> and{' '}
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline" /> solder fumes
          </span>
        </div>

        {/* Center Live Local Time Clock */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary border border-border/70 text-foreground">
          <Radio className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span>ACCRA, GHANA (UTC):</span>
          <span className="font-semibold text-primary">{localTime || '12:00:00'}</span>
        </div>

        {/* Right back to top & copyright */}
        <div className="flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 border border-border text-foreground transition-all hover:-translate-y-0.5"
            title="Return to orbital top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
