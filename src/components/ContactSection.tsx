import React, { useState } from 'react';
import { PORTFOLIO_CONFIG } from '../config';
import { Mail, Check, Copy, ArrowUpRight, Github, Linkedin, Twitter, MessageSquare, FileText, Send, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-6 sm:px-10 lg:px-16 border-b border-border/50 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
            INITIATE TRANSMISSION
          </span>
        </div>

        {/* Big Editorial Headline */}
        <div className="max-w-4xl mb-16">
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-foreground font-normal tracking-tight leading-[1.05] mb-6">
            Have a circuit board to spin, or an embedded system to architect?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground font-sans font-light max-w-2xl">
            Whether it's bare-metal firmware, high-speed PCB layouts, IoT cloud ingest, or a creative WebGL frontend — let's build something extraordinary.
          </p>
        </div>

        {/* Giant Magnetic Email Link Card */}
        <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-card border border-border/80 shadow-xl relative overflow-hidden group">
          {/* Subtle circuit trace background pulse */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div>
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                DIRECT INBOX TRANSMISSION
              </span>
              <a
                href={`mailto:${PORTFOLIO_CONFIG.email}`}
                className="font-serif text-3xl sm:text-5xl lg:text-6xl text-foreground group-hover:text-primary transition-colors tracking-tight font-normal break-all"
              >
                {PORTFOLIO_CONFIG.email}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-mono text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${PORTFOLIO_CONFIG.email}`}
                className="p-4 rounded-2xl bg-secondary hover:bg-secondary/80 border border-border text-foreground transition-all hover:-translate-y-0.5"
                title="Open default email client"
              >
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        {/* Form and Socials Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <h3 className="font-serif text-2xl text-foreground font-normal mb-4">
              Send a Dispatch
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-muted-foreground mb-1.5 uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ada Lovelace"
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border font-sans text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-muted-foreground mb-1.5 uppercase">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ada@analytical-engine.io"
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border font-sans text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-muted-foreground mb-1.5 uppercase">
                  Telemetry / Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your hardware specs, firmware requirements, or web project..."
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border font-sans text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                disabled={sent}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-foreground text-background font-mono text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {sent ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Signal Received! I'll reply within 24h.</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Socials & Connectivity */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl text-foreground font-normal mb-4">
                Subnets &amp; Networks
              </h3>
              <p className="text-sm text-muted-foreground font-sans mb-6">
                Connect via encrypted chat, professional networks, or open source repositories.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <a
                  href={PORTFOLIO_CONFIG.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-card border border-border hover:border-primary/50 text-foreground transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-primary" />
                    <span>GitHub: @{PORTFOLIO_CONFIG.githubUsername}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>

                <a
                  href={PORTFOLIO_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-card border border-border hover:border-primary/50 text-foreground transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-primary" />
                    <span>LinkedIn: /in/kingsley-atta-yeboah</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>

                <a
                  href={PORTFOLIO_CONFIG.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-card border border-border hover:border-primary/50 text-foreground transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Twitter className="w-4 h-4 text-primary" />
                    <span>X / Twitter: @kingsley_tech</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>

                <a
                  href={PORTFOLIO_CONFIG.socials.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-card border border-border hover:border-primary/50 text-foreground transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>Curriculum Vitae (PDF)</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/60 font-mono text-xs text-muted-foreground">
              <span>LOCATION: {PORTFOLIO_CONFIG.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
