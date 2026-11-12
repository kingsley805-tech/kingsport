import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '../config';

export const ProcessSection: React.FC = () => {
  return (
    <section
      id="process"
      className="relative py-20 px-4 sm:px-8 lg:px-12 border-b border-border/60 bg-secondary/20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Delivery Workflow
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Engineering &amp; Support Process
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
            A structured methodology from initial discovery and architecture through testing, deployment, and long-term technical support.
          </p>
        </div>

        {/* Horizontal Grid on Desktop, Vertical Stack on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {PORTFOLIO_CONFIG.processSteps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="relative p-5 rounded-2xl bg-card border border-border hover:border-primary/45 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-primary px-2.5 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                    {item.step}
                  </span>
                  {idx < PORTFOLIO_CONFIG.processSteps.length - 1 && (
                    <span className="hidden lg:inline font-mono text-xs text-muted-foreground/50">
                      →
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1.5">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

