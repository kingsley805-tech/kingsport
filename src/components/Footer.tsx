import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_CONFIG } from '../config';
import { ArrowUp, Github, Linkedin, Mail, Download, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: PORTFOLIO_CONFIG.timezone || 'Africa/Accra',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(new Date());
        setLocalTime(timeStr);
      } catch {
        setLocalTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <footer className="relative py-14 px-4 sm:px-8 lg:px-12 bg-card border-t border-border text-muted-foreground text-xs">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-border/70">
          {/* Brand Summary with Profile Logo */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/40 shadow-sm shrink-0 bg-secondary">
                <img
                  src={PORTFOLIO_CONFIG.photoUrl}
                  alt={PORTFOLIO_CONFIG.name}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="text-base font-bold text-foreground block leading-none">
                  {PORTFOLIO_CONFIG.name}
                </span>
                <span className="font-mono text-[11px] text-primary mt-0.5 block">
                  {PORTFOLIO_CONFIG.title}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
              Designing and delivering scalable web, desktop, and mobile software alongside dependable systems administration, networking, and IT support.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-foreground font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Accra, Ghana (UTC): {localTime || '--:--'}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-foreground font-semibold mb-3">
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors py-0.5"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/portfolio"
                className="text-muted-foreground hover:text-primary transition-colors py-0.5"
              >
                Vercel Portfolio
              </Link>
            </div>
          </div>

          {/* Socials & CV */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-foreground font-semibold mb-3">
              Connect
            </h3>
            <div className="space-y-2 font-mono">
              <a
                href={`mailto:${PORTFOLIO_CONFIG.email}`}
                className="flex items-center gap-2 hover:text-primary transition-colors break-all"
              >
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{PORTFOLIO_CONFIG.email}</span>
              </a>
              <a
                href={PORTFOLIO_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>GitHub (@{PORTFOLIO_CONFIG.githubUsername})</span>
              </a>
              <a
                href={PORTFOLIO_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PORTFOLIO_CONFIG.socials.resume}
                download={PORTFOLIO_CONFIG.cvFilename}
                className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/25 text-primary hover:bg-primary/15 transition-colors font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <span>
            &copy; {new Date().getFullYear()} {PORTFOLIO_CONFIG.name}. All rights reserved.
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 border border-border text-foreground transition-all hover:-translate-y-0.5"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-primary" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
