import React, { useEffect, useState } from 'react';
import { PORTFOLIO_CONFIG } from '../config';
import {
  Search,
  Code2,
  Orbit,
  Moon,
  Mail,
  Github,
  Linkedin,
  FileText,
  Copy,
  Layers,
  ArrowRight,
  Terminal,
  Check,
  Wrench,
  GraduationCap,
  Briefcase,
  Download,
  Key
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCVPreview?: () => void;
  onToggleTheme?: () => void;
  onToggleAntigravity?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenCVPreview,
  onToggleTheme,
  onToggleAntigravity
}) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
    }, 1000);
  };

  const triggerDownloadCV = () => {
    const link = document.createElement('a');
    link.href = PORTFOLIO_CONFIG.socials.resume;
    link.download = PORTFOLIO_CONFIG.cvFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  const commands = [
    {
      group: 'Navigation',
      items: [
        { label: 'Home & Hero Overview', icon: Terminal, action: () => scrollTo('hero') },
        { label: 'About Me & Dual Identity', icon: Layers, action: () => scrollTo('about') },
        { label: 'Technical Skills & Stack', icon: Code2, action: () => scrollTo('skills') },
        { label: 'Technical Support & IT Operations', icon: Wrench, action: () => scrollTo('technical-support') },
        { label: 'Professional Experience', icon: Briefcase, action: () => scrollTo('experience') },
        { label: 'Services & Capabilities', icon: Layers, action: () => scrollTo('services') },
        { label: 'Projects & Case Studies', icon: Code2, action: () => scrollTo('projects') },
        { label: 'Education & Certifications', icon: GraduationCap, action: () => scrollTo('education') },
        { label: 'Contact & Inquiry Form', icon: Mail, action: () => scrollTo('contact') }
      ]
    },
    {
      group: 'Actions & Controls',
      items: [
        {
          label: 'Download Curriculum Vitae (PDF)',
          icon: Download,
          action: triggerDownloadCV
        },
        ...(onOpenCVPreview
          ? [
              {
                label: 'Preview Curriculum Vitae in Modal',
                icon: FileText,
                action: () => {
                  onOpenCVPreview();
                  onClose();
                }
              }
            ]
          : []),
        {
          label: 'Sync All 82 GitHub Repositories (Public & Private)',
          icon: Key,
          action: () => {
            window.dispatchEvent(new CustomEvent('open-github-token-modal'));
            onClose();
          }
        },
        {
          label: 'Toggle Antigravity Mode in Projects',
          icon: Orbit,
          action: () => {
            const btn = document.querySelector('[data-antigravity-toggle]') as HTMLButtonElement;
            if (btn) btn.click();
            if (onToggleAntigravity) onToggleAntigravity();
            onClose();
          }
        },
        {
          label: 'Toggle Theme (Light / Dark)',
          icon: Moon,
          action: () => {
            if (onToggleTheme) onToggleTheme();
            const btn = document.querySelector('header button[title*="mode"]') as HTMLButtonElement;
            if (btn) btn.click();
            onClose();
          }
        },
        {
          label: copied ? 'Email Copied!' : `Copy Email (${PORTFOLIO_CONFIG.email})`,
          icon: copied ? Check : Copy,
          action: handleCopyEmail
        }
      ]
    },
    {
      group: 'External Profiles',
      items: [
        {
          label: `Open GitHub (@${PORTFOLIO_CONFIG.githubUsername})`,
          icon: Github,
          action: () => {
            window.open(PORTFOLIO_CONFIG.socials.github, '_blank', 'noopener,noreferrer');
            onClose();
          }
        },
        {
          label: 'Open LinkedIn Profile',
          icon: Linkedin,
          action: () => {
            window.open(PORTFOLIO_CONFIG.socials.linkedin, '_blank', 'noopener,noreferrer');
            onClose();
          }
        }
      ]
    }
  ];

  const filteredGroups = commands
    .map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    }))
    .filter(group => group.items.length > 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl rounded-2xl bg-card border border-border shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
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
                      type="button"
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

        <div className="px-4 py-2.5 border-t border-border bg-secondary/30 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span>{PORTFOLIO_CONFIG.name}</span>
          <span>Quick Navigation</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
