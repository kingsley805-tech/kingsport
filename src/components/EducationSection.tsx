import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '../config';
import {
  GraduationCap,
  Award,
  MapPin,
  Calendar,
  Languages,
  UserCheck,
  ShieldCheck,
  Code2,
  BookOpen
} from 'lucide-react';

export const EducationSection: React.FC = () => {
  const focusStyle = (focus: string) => {
    if (focus === 'IT Support & Networking') {
      return {
        icon: ShieldCheck,
        badge: 'bg-cyan-500/12 text-cyan-500 border-cyan-500/25'
      };
    }
    if (focus === 'Web & Software Development') {
      return {
        icon: Code2,
        badge: 'bg-primary/12 text-primary border-primary/25'
      };
    }
    return {
      icon: BookOpen,
      badge: 'bg-secondary text-muted-foreground border-border'
    };
  };

  return (
    <section
      id="education"
      className="relative py-20 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-border/60 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Education Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Academic &amp; Professional Credentials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Education &amp; Certifications
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl">
            Formal Computer Science education paired with verified IT support, networking, systems administration, and web engineering certifications.
          </p>
        </div>

        {/* Academic Degree + Language & Reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-14">
          {/* University Degree Card */}
          <div className="lg:col-span-7">
            {PORTFOLIO_CONFIG.education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="h-full p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/12 border border-primary/25 flex items-center justify-center text-primary">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.date}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-primary mb-2">
                    {edu.institution}
                  </p>
                  <p className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground mb-4">
                    <MapPin className="w-3.5 h-3.5 text-primary/80" />
                    {edu.location}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-border/60">
                    {edu.highlights.map((h, hIdx) => (
                      <p key={hIdx} className="text-sm text-muted-foreground leading-relaxed">
                        {h}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Languages & Professional Reference */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Language Proficiency */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
              <div className="flex items-center gap-2.5 mb-3">
                <Languages className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Language Proficiency</h3>
              </div>
              {PORTFOLIO_CONFIG.languages.map(lang => (
                <div
                  key={lang.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border/60"
                >
                  <span className="text-sm font-semibold text-foreground">{lang.name}</span>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-primary/15 text-primary font-semibold">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>

            {/* Verified Reference */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm flex-1">
              <div className="flex items-center gap-2.5 mb-3">
                <UserCheck className="w-5 h-5 text-cyan-500" />
                <h3 className="text-base font-bold text-foreground">Professional Reference</h3>
              </div>
              <div className="space-y-1 text-sm">
                <p className="font-semibold text-foreground">{PORTFOLIO_CONFIG.reference.name}</p>
                <p className="text-xs text-primary font-medium">
                  {PORTFOLIO_CONFIG.reference.role}
                </p>
                <p className="text-xs text-muted-foreground">
                  {PORTFOLIO_CONFIG.reference.location}
                </p>
                <p className="font-mono text-xs text-muted-foreground pt-1">
                  {PORTFOLIO_CONFIG.reference.phone} • {PORTFOLIO_CONFIG.reference.emails[0]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Subsection */}
        <div id="certifications" className="scroll-mt-24">
          <div className="flex items-center gap-2.5 mb-6">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">
              Certifications &amp; Professional Development
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO_CONFIG.certifications.map((cert, idx) => {
              const style = focusStyle(cert.focus);
              const Icon = style.icon;
              return (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="p-5 rounded-2xl bg-card border border-border hover:border-primary/45 transition-all shadow-sm flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-primary shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full border ${style.badge}`}
                    >
                      {cert.focus}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-foreground leading-snug">
                    {cert.name}
                  </h4>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

