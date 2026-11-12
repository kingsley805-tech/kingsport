import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '../config';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const experience = PORTFOLIO_CONFIG.experience;

  return (
    <section
      id="experience"
      className="relative py-20 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-border/60 bg-secondary/20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Career Timeline
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Professional Experience
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl">
            Verified software engineering, systems administration, hardware/network engineering, and technology volunteer engagements across local and international teams.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-8">
          {/* Vertical Connecting Line */}
          <div
            aria-hidden="true"
            className="absolute left-2 sm:left-3.5 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-cyan-500/60 to-border"
          />

          {experience.map((item, idx) => (
            <motion.article
              key={`${item.company}-${item.period}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative"
            >
              {/* Timeline Node Dot */}
              <div
                aria-hidden="true"
                className={`absolute -left-[22px] sm:-left-[31px] top-6 w-3.5 h-3.5 rounded-full border-2 border-background shadow-sm ${
                  idx === 0
                    ? 'bg-primary ring-4 ring-primary/20'
                    : item.category === 'support'
                    ? 'bg-cyan-500'
                    : 'bg-primary/80'
                }`}
              />

              {/* Experience Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-primary/45 transition-all shadow-sm">
                {/* Top Metadata Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground px-2.5 py-1 rounded-full bg-secondary border border-border/70">
                      {item.badge}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-primary/80" />
                    {item.location}
                  </span>
                </div>

                {/* Role & Organization */}
                <div className="mb-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                    {item.role}
                  </h3>
                  <p className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm text-primary font-medium mt-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{item.company}</span>
                  </p>
                </div>

                {/* Summary */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Key Responsibilities & Contributions */}
                <ul className="space-y-2 mb-5">
                  {item.responsibilities.map((resp, rIdx) => (
                    <li
                      key={rIdx}
                      className="flex items-start gap-2.5 text-sm text-foreground/90 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="pt-4 border-t border-border/60 flex flex-wrap gap-1.5">
                  {item.technologies.map(tech => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-secondary text-foreground/90 border border-border/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
