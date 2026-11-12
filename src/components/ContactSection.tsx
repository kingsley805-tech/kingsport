import React, { useState } from 'react';
import { PORTFOLIO_CONFIG } from '../config';
import {
  Mail,
  Phone,
  MapPin,
  Check,
  Copy,
  ArrowUpRight,
  Github,
  Linkedin,
  FileText,
  Send,
  AlertCircle,
  Download
} from 'lucide-react';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | 'draft' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '' // Honeypot spam trap
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'prepared' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleCopy = (value: string, field: 'email' | 'phone' | 'draft') => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2400);
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (formData.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (formData.subject.trim().length < 3) {
      nextErrors.subject = 'Please provide a brief subject for your inquiry.';
    }
    if (formData.message.trim().length < 10) {
      nextErrors.message = 'Please include a message (at least 10 characters).';
    }
    return nextErrors;
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject.trim()}`);
    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
    );
    return `mailto:${PORTFOLIO_CONFIG.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot check
    if (formData.website.trim() !== '') {
      setSubmitStatus('error');
      setStatusMessage('Submission blocked by spam protection.');
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setSubmitStatus('error');
      setStatusMessage('Please review the highlighted fields before continuing.');
      return;
    }

    // Launch user's default mail client with pre-filled details (honest client-side handoff)
    const mailtoUrl = buildMailtoHref();
    window.location.href = mailtoUrl;

    setSubmitStatus('prepared');
    setStatusMessage(
      `Your email client has been opened with a pre-filled draft to ${PORTFOLIO_CONFIG.email}. If your device has no mail client configured, copy your message below or email directly.`
    );
  };

  const formattedDraft = `To: ${PORTFOLIO_CONFIG.email}\nSubject: [Portfolio Inquiry] ${formData.subject}\nFrom: ${formData.name} (${formData.email})\n\n${formData.message}`;

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-border/60 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
            Get In Touch
          </span>
        </div>

        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.12] mb-4">
            Let&apos;s build reliable software or strengthen your IT systems.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Open to international software engineering roles, remote full-stack opportunities, freelance web/ERP/POS builds, and technical support or network infrastructure collaborations.
          </p>
        </div>

        {/* Direct Email & Phone Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground block">
              Direct Email Address
            </span>
            <a
              href={`mailto:${PORTFOLIO_CONFIG.email}`}
              className="text-xl sm:text-3xl font-bold text-foreground hover:text-primary transition-colors break-all"
            >
              {PORTFOLIO_CONFIG.email}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleCopy(PORTFOLIO_CONFIG.email, 'email')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-semibold hover:opacity-95 transition-opacity"
            >
              {copiedField === 'email' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${PORTFOLIO_CONFIG.email}`}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-foreground font-mono text-xs font-medium transition-colors"
            >
              <Mail className="w-4 h-4 text-primary" />
              <span>Email Directly</span>
            </a>
          </div>
        </div>

        {/* Form & Verified Contact Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-1">Send an Inquiry</h3>
            <p className="text-xs text-muted-foreground mb-6">
              Fill out the fields below to prepare and launch a direct email inquiry.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Honeypot field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={e => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs text-muted-foreground mb-1.5 uppercase"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs text-muted-foreground mb-1.5 uppercase"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block font-mono text-xs text-muted-foreground mb-1.5 uppercase"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={e => {
                    setFormData({ ...formData, subject: e.target.value });
                    if (errors.subject) setErrors({ ...errors, subject: undefined });
                  }}
                  placeholder="Software Engineering Role / Technical Support / Project Inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-destructive">{errors.subject}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs text-muted-foreground mb-1.5 uppercase"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Share details about the role, project scope, or technical challenge..."
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-destructive">{errors.message}</p>
                )}
              </div>

              {submitStatus === 'error' && statusMessage && (
                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-xs text-destructive flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {submitStatus === 'prepared' && statusMessage && (
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-xs text-foreground space-y-3">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{statusMessage}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(formattedDraft, 'draft')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-foreground font-mono text-xs hover:bg-secondary"
                    >
                      {copiedField === 'draft' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Message Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-primary" />
                          <span>Copy Formatted Message</span>
                        </>
                      )}
                    </button>
                    <a
                      href={buildMailtoHref()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-mono text-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Re-open Email Draft</span>
                    </a>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-sm hover:opacity-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Compose Email Inquiry</span>
              </button>
            </form>
          </div>

          {/* Verified Contact Details & Links */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm space-y-5">
              <h3 className="text-xl font-bold text-foreground">Contact Information</h3>

              <div className="space-y-3 text-xs font-mono">
                {/* Phone */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/50 border border-border">
                  <a
                    href={`tel:${PORTFOLIO_CONFIG.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{PORTFOLIO_CONFIG.phone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(PORTFOLIO_CONFIG.phone, 'phone')}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Copy phone number"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-secondary/50 border border-border text-foreground">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{PORTFOLIO_CONFIG.location} (Remote &amp; Global)</span>
                </div>

                {/* GitHub */}
                <a
                  href={PORTFOLIO_CONFIG.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 text-foreground transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-primary" />
                    <span>github.com/{PORTFOLIO_CONFIG.githubUsername}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>

                {/* LinkedIn */}
                <a
                  href={PORTFOLIO_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 text-foreground transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-primary" />
                    <span>linkedin.com/in/kingsley-atta-yeboah</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>

                {/* CV Download */}
                <a
                  href={PORTFOLIO_CONFIG.socials.resume}
                  download={PORTFOLIO_CONFIG.cvFilename}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/15 text-foreground transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="font-semibold">Download Curriculum Vitae (PDF)</span>
                  </div>
                  <Download className="w-4 h-4 text-primary" />
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-secondary/40 border border-border text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground block mb-1">
                Ready for Immediate Collaboration
              </strong>
              Whether hiring for a Software Engineer, Full-Stack Developer, or Technical Support Specialist role—feel free to reach out by email or phone.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
