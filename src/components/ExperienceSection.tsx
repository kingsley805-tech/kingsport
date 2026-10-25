import React, { useRef } from 'react';
import { PORTFOLIO_CONFIG } from '../config';
import { Briefcase, Calendar, ChevronRight, ChevronLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const experience = PORTFOLIO_CONFIG.experience;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="experience"
      className="relative py-24 px-6 sm:px-10 lg:px-16 border-b border-border/50 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
                CHRONICLE OF WORK
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground font-normal tracking-tight">
              Engineering Experience
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-xl font-sans">
              A timeline of production embedded telemetry, cloud systems, and board-level hardware design.
            </p>
          </div>

          {/* Timeline Navigation Arrows */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full bg-card hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors"
              title="Scroll timeline left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full bg-card hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors"
              title="Scroll timeline right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Timeline Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
        >
          {experience.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[320px] sm:min-w-[400px] max-w-[420px] rounded-2xl bg-card border border-border/80 p-7 flex flex-col justify-between shrink-0 snap-start shadow-sm hover:border-primary/50 transition-all hover:-translate-y-1"
            >
              <div>
                {/* Timeline Tag & Period */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-primary font-medium px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                    {item.period}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground uppercase px-2 py-0.5 rounded bg-secondary">
                    {item.badge}
                  </span>
                </div>

                {/* Role & Company */}
                <h3 className="font-serif text-2xl text-foreground font-normal mb-1">
                  {item.role}
                </h3>
                <p className="font-mono text-xs text-muted-foreground mb-4">
                  @ {item.company}
                </p>

                {/* Description */}
                <p className="text-sm text-foreground/80 font-sans font-light leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Technologies Stack */}
              <div className="pt-4 border-t border-border/60">
                <span className="font-mono text-[10px] uppercase text-muted-foreground block mb-2">
                  TOOLCHAIN:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.map(tech => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2.5 py-1 rounded-md bg-secondary text-foreground/90 border border-border/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
