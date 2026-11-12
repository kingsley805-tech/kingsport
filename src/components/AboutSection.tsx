import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '../config';
import {
  Code2,
  Wrench,
  CheckCircle2,
  Download,
  FileText,
  Layers,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface AboutSectionProps {
  onOpenCVPreview?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenCVPreview }) => {
  const { about } = PORTFOLIO_CONFIG;

  const softwareCapabilities = [
    'Software architecture & full-stack development',
    'Frontend engineering (React.js, TypeScript, Tailwind CSS)',
    'Backend & RESTful API development (Node.js, Express, PHP)',
    'Database design & performance tuning (PostgreSQL, MongoDB, SQL)',
    'Cross-platform desktop (Electron) & mobile (React Native) apps',
    'Business management, POS & multi-tenant ERP solutions'
  ];

  const supportCapabilities = [
    'Hardware, software & operating system troubleshooting',
    'Software installation, configuration & compatibility testing',
    'System administration, servers & user identity management',
    'Network & connectivity troubleshooting (LAN, Wi-Fi, ISP, Starlink)',
    'Router, managed switch & firewall configuration',
    'Technical problem diagnosis, monitoring & end-user assistance'
  ];

  return (
    <section
      id="about"
      className="relative py-20 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-border/60 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
            About Me
          </span>
        </div>

        {/* Main Split Layout: Biography + Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 space-y-5"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
              Practical engineering grounded in{' '}
              <span className="gradient-text-primary">real-world reliability.</span>
            </h2>

            <p className="text-base sm:text-lg text-foreground/90 font-medium leading-relaxed">
              {about.lead}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {about.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href={PORTFOLIO_CONFIG.socials.resume}
                download={PORTFOLIO_CONFIG.cvFilename}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-sm hover:opacity-95 transition-opacity"
              >
                <Download className="w-4 h-4" />
                <span>Download Full CV</span>
              </a>

              {onOpenCVPreview && (
                <button
                  type="button"
                  onClick={onOpenCVPreview}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-card hover:bg-secondary border border-border text-foreground text-xs sm:text-sm font-medium transition-colors"
                >
                  <FileText className="w-4 h-4 text-primary" />
                  <span>View CV Summary</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Right Column: Portrait Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-primary/20 via-transparent to-cyan-500/20 blur-xl pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-2xl aspect-[4/5] group">
                <img
                  src={PORTFOLIO_CONFIG.altPhotoUrl || PORTFOLIO_CONFIG.photoUrl}
                  alt={`${PORTFOLIO_CONFIG.name} — Software Engineer & Technical Support Specialist`}
                  loading="eager"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                  <span className="text-lg font-bold text-white">
                    {PORTFOLIO_CONFIG.name}
                  </span>
                  <span className="font-mono text-xs text-sky-300 mt-0.5">
                    {PORTFOLIO_CONFIG.title}
                  </span>
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/15 font-mono text-[11px] text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{PORTFOLIO_CONFIG.location} • English (C2)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Two Complementary Professional Identity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Software Engineering Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-semibold block">
                  PRIMARY DISCIPLINE
                </span>
                <h3 className="text-xl font-bold text-foreground">Software Engineering</h3>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Designing, architecting, and shipping reliable software systems from user-facing React &amp; TypeScript interfaces to structured Node.js/Express backends, REST APIs, and PostgreSQL databases.
            </p>

            <ul className="space-y-2.5">
              {softwareCapabilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Technical Support Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-cyan-500/50 transition-colors shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-500 font-semibold block">
                  COMPLEMENTARY DISCIPLINE
                </span>
                <h3 className="text-xl font-bold text-foreground">
                  Technical Support &amp; IT Systems
                </h3>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Keeping hardware, operating systems, enterprise applications, servers, and networks healthy through proactive diagnostics, clean installations, security configurations, and user support.
            </p>

            <ul className="space-y-2.5">
              {supportCapabilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
