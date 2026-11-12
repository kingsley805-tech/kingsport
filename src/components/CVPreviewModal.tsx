import React, { useEffect, useState } from 'react';
import { PORTFOLIO_CONFIG } from '../config';
import {
  X,
  Download,
  FileText,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Award,
  Briefcase
} from 'lucide-react';

interface CVPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVPreviewModal: React.FC<CVPreviewModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'summary' | 'pdf'>('summary');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Curriculum Vitae Preview"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-border bg-secondary/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/40 shrink-0 bg-secondary shadow-sm">
              <img
                src={PORTFOLIO_CONFIG.photoUrl}
                alt={PORTFOLIO_CONFIG.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <h2 className="font-sans font-semibold text-base text-foreground">
                {PORTFOLIO_CONFIG.name} — Curriculum Vitae
              </h2>
              <p className="font-mono text-[11px] text-muted-foreground">
                {PORTFOLIO_CONFIG.cvFilename}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle View Mode */}
            <div className="hidden sm:flex items-center p-1 rounded-lg bg-background border border-border text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('summary')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewMode === 'summary'
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Web View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('pdf')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewMode === 'pdf'
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Original PDF
              </button>
            </div>

            <a
              href={PORTFOLIO_CONFIG.socials.resume}
              download={PORTFOLIO_CONFIG.cvFilename}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-semibold hover:opacity-95 transition-opacity"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-background hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close CV Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-background/50">
          {viewMode === 'pdf' ? (
            <div className="w-full h-[68vh] rounded-xl overflow-hidden border border-border bg-white">
              <iframe
                src={PORTFOLIO_CONFIG.socials.resume}
                title="Kingsley Atta Yeboah CV PDF"
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="space-y-6 text-sm text-foreground">
              {/* Top CV Header */}
              <div className="p-5 rounded-xl bg-card border border-border">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  {PORTFOLIO_CONFIG.name}
                </h3>
                <p className="text-primary font-medium mt-1">{PORTFOLIO_CONFIG.cvTitle}</p>
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground font-mono">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    {PORTFOLIO_CONFIG.email}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    {PORTFOLIO_CONFIG.phone}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {PORTFOLIO_CONFIG.location}
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Senior Frontend Developer and Full Stack Engineer with expertise in building modern web, desktop, and mobile applications. Proficient in frontend architecture and backend development, leveraging JavaScript, React.js, and RESTful APIs to deliver scalable solutions that enhance user experience and drive business performance.
                </p>
              </div>

              {/* Experience Summary */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-wider text-primary flex items-center gap-2 font-semibold">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Professional Experience</span>
                </h4>
                <div className="space-y-3">
                  {PORTFOLIO_CONFIG.experience.map((exp, i) => (
                    <div key={i} className="p-4 rounded-xl bg-card border border-border">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold text-foreground">{exp.role}</span>
                        <span className="font-mono text-xs text-primary">{exp.period}</span>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5">
                        {exp.company} • {exp.location}
                      </p>
                      <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc list-inside">
                        {exp.responsibilities.map((r, idx) => (
                          <li key={idx}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-card border border-border">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-primary flex items-center gap-2 font-semibold mb-3">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Education</span>
                  </h4>
                  {PORTFOLIO_CONFIG.education.map((edu, i) => (
                    <div key={i}>
                      <p className="font-semibold text-foreground">{edu.degree}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{edu.institution}</p>
                      <p className="font-mono text-xs text-primary mt-1">
                        {edu.location} • {edu.date}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-card border border-border">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-primary flex items-center gap-2 font-semibold mb-3">
                    <Award className="w-3.5 h-3.5" />
                    <span>Certifications</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {PORTFOLIO_CONFIG.certifications.map((cert, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{cert.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border bg-secondary/30 flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>Verified from Kingsley_Atta_Yeboah_CV.pdf</span>
          <a
            href={PORTFOLIO_CONFIG.socials.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <span>Open PDF in new tab</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CVPreviewModal;

