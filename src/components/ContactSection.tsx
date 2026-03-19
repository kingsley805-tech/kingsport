import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section-padding max-w-7xl mx-auto">
      <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-2">Contact</p>
      <h2 className="text-3xl md:text-5xl font-display font-bold mb-16">
        Let's <span className="gradient-text-amber">Connect</span>
      </h2>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Ready to collaborate? Whether you need software development, network infrastructure, or IT support — I'm here to help.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-primary">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a href="mailto:kingsleyyeboah805@gmail.com" className="text-foreground hover:text-primary transition-colors">
                  kingsleyyeboah805@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-primary">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <a href="tel:+233503688781" className="text-foreground hover:text-primary transition-colors">
                  0503688781
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-primary">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-foreground">Accra, Ghana</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8 space-y-6">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Name</label>
            <input
              type="text"
              required
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Message</label>
            <textarea
              required
              rows={5}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg gradient-amber text-primary-foreground font-display font-semibold hover:opacity-90 transition-opacity amber-glow"
          >
            {submitted ? 'Sent!' : (
              <>
                <Send size={16} /> Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
