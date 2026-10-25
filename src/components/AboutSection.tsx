import React, { useState } from 'react';
import { PORTFOLIO_CONFIG } from '../config';
import { Cpu, Code2, Wrench, Shield, Layers, Award, Terminal } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'hardware' | 'software'>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const { about, skills } = PORTFOLIO_CONFIG;

  const displayedSkills = [
    ...(activeTab === 'all' || activeTab === 'hardware'
      ? skills.hardware.map(s => ({ ...s, group: 'hardware' }))
      : []),
    ...(activeTab === 'all' || activeTab === 'software'
      ? skills.software.map(s => ({ ...s, group: 'software' }))
      : [])
  ];

  return (
    <section
      id="about"
      className="relative py-24 px-6 sm:px-10 lg:px-16 border-b border-border/50 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
            IDENTITY &amp; FOUNDATIONS
          </span>
        </div>

        {/* Top Grid: Bio & Floating Parallax Portrait Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground font-normal tracking-tight mb-6 leading-[1.08]">
              Operating at the intersection of{' '}
              <span className="italic text-primary">atoms and bits.</span>
            </h2>

            <p className="text-lg text-foreground/90 font-sans font-light leading-relaxed mb-6">
              {about.lead}
            </p>

            <div className="space-y-4 text-base text-muted-foreground font-sans font-light leading-relaxed">
              {about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Quick Core Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-border/60">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-secondary text-primary shrink-0 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-semibold text-foreground">
                    Hardware Determinism
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Hard real-time ISR response, minimal jitter, and fail-safe watchdog systems.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-secondary text-primary shrink-0 mt-0.5">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-semibold text-foreground">
                    Tactile Software
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Sub-second UI response, fluid 60fps animations, and zero-compromise UX.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Floating Parallax Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 sm:w-84">
              {/* Circuit hair-line decorative border frame */}
              <div className="absolute -inset-4 rounded-3xl border border-primary/30 -rotate-2 animate-levitate pointer-events-none" />
              <div className="absolute -inset-1 rounded-2xl border border-border rotate-1 animate-levitate-slow pointer-events-none" />

              {/* Photo Container */}
              <div className="relative rounded-2xl overflow-hidden bg-card border-2 border-border shadow-2xl aspect-[4/5] group">
                <img
                  src="/IMG_20260108_145926_631~2.jpg"
                  alt={PORTFOLIO_CONFIG.name}
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  onError={e => {
                    // Fallback avatar if local photo not found
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Ambient glow at bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                  <span className="font-serif text-lg text-white font-normal">
                    {PORTFOLIO_CONFIG.name}
                  </span>
                  <span className="font-mono text-xs text-primary/90">
                    {PORTFOLIO_CONFIG.title}
                  </span>
                </div>
              </div>

              {/* Hardware Test Point chip floating overlay */}
              <div className="absolute -bottom-5 -right-4 px-3.5 py-2 rounded-xl bg-card border border-border shadow-xl backdrop-blur-md flex items-center gap-2 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-muted-foreground">STATUS:</span>
                <span className="text-foreground font-semibold">ALL SYSTEMS NOMINAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-card border border-border/80 mb-20 shadow-sm">
          {about.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="font-serif text-4xl sm:text-5xl text-foreground font-normal block tracking-tight">
                {stat.value}
              </span>
              <span className="font-mono text-xs text-muted-foreground block uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Skills & Toolchain Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 font-mono text-xs text-primary uppercase">
                <Wrench className="w-3.5 h-3.5" />
                <span>TECHNICAL TOOLCHAIN &amp; STACK</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-foreground font-normal">
                Silicon, Firmware &amp; Cloud Matrix
              </h3>
            </div>

            {/* Filter Pill */}
            <div className="flex items-center p-1 rounded-full bg-secondary border border-border self-start">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeTab === 'all'
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                All Domains
              </button>
              <button
                onClick={() => setActiveTab('hardware')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeTab === 'hardware'
                    ? 'bg-amber-500 text-white font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Cpu className="w-3 h-3" />
                <span>Hardware</span>
              </button>
              <button
                onClick={() => setActiveTab('software')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeTab === 'software'
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Code2 className="w-3 h-3" />
                <span>Software</span>
              </button>
            </div>
          </div>

          {/* Interactive Floating / Orbiting Tag Cloud */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedSkills.map((skill, index) => {
              const isHw = skill.group === 'hardware';
              return (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`group relative p-4 rounded-xl border bg-card transition-all duration-200 hover:-translate-y-1 ${
                    isHw ? 'hover:border-amber-500/50' : 'hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground uppercase">
                      {skill.category}
                    </span>
                  </div>

                  {/* Level progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isHw ? 'bg-amber-500' : 'bg-primary'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2 font-mono text-[11px] text-muted-foreground">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
