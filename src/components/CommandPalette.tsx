import React, { useEffect, useState } from 'react';
import { PORTFOLIO_CONFIG } from '../config';
import {
  Search,
  Cpu,
  Code2,
  Orbit,
  Moon,
  Sun,
  Mail,
  Github,
  Linkedin,
  FileText,
  Copy,
  Layers,
  ArrowRight,
  Terminal,
  ExternalLink,
  Check
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme?: () => void;
  onToggleAntigravity?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onToggleTheme,
  onToggleAntigravity
}) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_CONFIG.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  const commands = [
    {
      group: 'Navigation',
      items: [
        { label: 'Jump to Hero & Telemetry', icon: Terminal, action: () => scrollTo('hero') },
        { label: 'Hardware/Software Duality', icon: Cpu, action: () => scrollTo('duality') },
        { label: 'GitHub Projects Matrix', icon: Code2, action: () => scrollTo('projects') },
        { label: 'Identity & Architecture Bio', icon: Layers, action: () => scrollTo('about') },
        { label: 'Engineering Timeline', icon: FileText, action: () => scrollTo('experience') },
        { label: 'Contact & Dispatch', icon: Mail, action: () => scrollTo('contact') },
      ]
    },
    {
      group: 'Controls & System State',
      items: [
        {
          label: 'Toggle Zero-Gravity Antigravity Mode',
          icon: Orbit,
          action: () => {
            const btn = document.querySelector('[data-antigravity-toggle]') as HTMLButtonElement;
            if (btn) btn.click();
            if (onToggleAntigravity) onToggleAntigravity();
            onClose();
          }
        },
        {
          label: 'Toggle Theme (Light / Dark Circular Reveal)',
          icon: Moon,
          action: () => {
            if (onToggleTheme) onToggleTheme();
            const btn = document.querySelector('header button[title*="mode"]') as HTMLButtonElement;
            if (btn) btn.click();
            onClose();
          }
        },
        {
          label: copied ? 'Email Copied!' : 'Copy Direct Email Address',
          icon: copied ? Check : Copy,
          action: handleCopyEmail
        }
      ]
    },
    {
      group: 'External Links & Channels',
      items: [
        {
          label: `Open GitHub Profile (@${PORTFOLIO_CONFIG.githubUsername})`,
          icon: Github,
          action: () => window.open(PORTFOLIO_CONFIG.socials.github, '_blank')
        },
        {
          label: 'Open LinkedIn Profile',
          icon: Linkedin,
          action: () => window.open(PORTFOLIO_CONFIG.socials.linkedin, '_blank')
        },
        {
          label: 'Download Curriculum Vitae (PDF)',
          icon: FileText,
          action: () => window.open(PORTFOLIO_CONFIG.socials.resume, '_blank')
        }
      ]
    }
  ];

  const filteredGroups = commands.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.label.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Palette Modal */}
      <div className="relative w-full max-w-xl rounded-2xl bg-card border border-border shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-secondary/50">
          <Search className="w-5 h-5 text-primary shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or jump to section..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded bg-background border border-border font-mono text-[10px] text-muted-foreground uppercase">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 font-mono text-xs">
          {filteredGroups.map(group => (
            <div key={group.group}>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-1 block">
                {group.group}
              </span>
              <div className="space-y-1 mt-1">
                {group.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary text-foreground/90 hover:text-foreground transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                        <span>{item.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredGroups.length === 0 && (
            <div className="py-8 text-center text-muted-foreground font-sans text-xs">
              No matching commands found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-border bg-secondary/30 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span>PORTFOLIO OS // {PORTFOLIO_CONFIG.name}</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>NAVIGATION ONLINE</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
