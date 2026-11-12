import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '../config';
import {
  Code2,
  Layout,
  Server,
  Database,
  Smartphone,
  Cloud,
  Shield,
  Terminal
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  languages: Code2,
  frontend: Layout,
  backend: Server,
  databases: Database,
  'cross-platform': Smartphone,
  'devops-arch': Cloud,
  'support-net': Shield
};

export const SkillsSection: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<'all' | 'engineering' | 'support'>('all');

  const filteredCategories = PORTFOLIO_CONFIG.skillCategories.filter(cat => {
    if (activeTrack === 'all') return true;
    if (activeTrack === 'engineering') return cat.track === 'engineering' || cat.track === 'infrastructure';
    return cat.track === 'support' || cat.track === 'infrastructure';
  });

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-border/60 bg-secondary/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header & Track Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                Technical Skills &amp; Stack
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Tools, Technologies &amp; Capabilities
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl">
              Verified technologies and technical support competencies applied across production web platforms, ERP systems, servers, and network deployments.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="inline-flex items-center p-1 rounded-xl bg-card border border-border self-start">
            {[
              { id: 'all', label: 'All Capabilities' },
              { id: 'engineering', label: 'Software Engineering' },
              { id: 'support', label: 'IT Support & Infra' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTrack(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTrack === tab.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categorized Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, idx) => {
            const Icon = CATEGORY_ICONS[category.id] || Terminal;
            const isSupport = category.track === 'support';

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className={`rounded-2xl bg-card border border-border/90 p-6 shadow-sm hover:border-primary/50 transition-all ${
                  category.id === 'support-net' ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
              >
                <div className="flex items-start gap-3.5 mb-5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSupport
                        ? 'bg-cyan-500/15 text-cyan-500 border border-cyan-500/30'
                        : 'bg-primary/15 text-primary border border-primary/30'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{category.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{category.subtitle}</p>
                  </div>
                </div>

                {/* Technology Badges Grid */}
                <div
                  className={`grid gap-2.5 ${
                    category.id === 'support-net'
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                      : 'grid-cols-1 sm:grid-cols-2'
                  }`}
                >
                  {category.skills.map(skill => (
                    <div
                      key={skill.name}
                      className="px-3 py-2.5 rounded-xl bg-secondary/55 hover:bg-secondary border border-border/70 hover:border-primary/40 transition-all group"
                    >
                      <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                        {skill.name}
                      </div>
                      {skill.context && (
                        <div className="font-mono text-[10px] text-muted-foreground mt-0.5">
                          {skill.context}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

