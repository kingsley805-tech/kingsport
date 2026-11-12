import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '../config';
import {
  Code2,
  Globe,
  Server,
  Database,
  Building2,
  Smartphone,
  Wrench,
  Wifi,
  ShieldCheck,
  Check
} from 'lucide-react';

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'custom-software': Code2,
  'fullstack-web': Globe,
  'backend-api': Server,
  'database-design': Database,
  'pos-erp': Building2,
  'desktop-mobile': Smartphone,
  'tech-support': Wrench,
  'network-setup': Wifi,
  sysadmin: ShieldCheck
};

export const ServicesSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'software' | 'support'>('all');

  const services = PORTFOLIO_CONFIG.services.filter(
    s => filter === 'all' || s.track === filter
  );

  return (
    <section
      id="services"
      className="relative py-20 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-border/60 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                Practical Solutions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Services &amp; Capabilities
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl">
              Helping organizations, startups, and teams build dependable software products and maintain resilient IT &amp; network operations.
            </p>
          </div>

          {/* Track Filter */}
          <div className="inline-flex items-center p-1 rounded-xl bg-secondary border border-border self-start">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'software', label: 'Software Engineering' },
              { id: 'support', label: 'IT & Technical Support' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === tab.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = SERVICE_ICONS[service.id] || Code2;
            const isSupport = service.track === 'support';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:-translate-y-1 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        isSupport
                          ? 'bg-cyan-500/12 text-cyan-500 border border-cyan-500/25'
                          : 'bg-primary/12 text-primary border border-primary/25'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`font-mono text-[10px] uppercase px-2.5 py-0.5 rounded-full border ${
                        isSupport
                          ? 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20'
                          : 'text-primary bg-primary/10 border-primary/20'
                      }`}
                    >
                      {isSupport ? 'Technical Support' : 'Software Eng'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {service.description}
                  </p>
                </div>

                <ul className="pt-4 border-t border-border/60 space-y-1.5">
                  {service.capabilities.map(cap => (
                    <li
                      key={cap}
                      className="flex items-center gap-2 text-xs text-foreground/85 font-medium"
                    >
                      <Check
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isSupport ? 'text-cyan-500' : 'text-primary'
                        }`}
                      />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

