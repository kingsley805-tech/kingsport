import { useEffect, useRef } from 'react';
import { Code2, Network, Monitor } from 'lucide-react';

const roles = [
  {
    icon: Code2,
    title: 'Software Engineer',
    desc: 'Full-stack development with modern frameworks. Clean code, scalable architecture, and pixel-perfect interfaces.',
  },
  {
    icon: Network,
    title: 'Network Engineer',
    desc: 'Enterprise network design, configuration, and troubleshooting. Cisco, MikroTik, and beyond.',
  },
  {
    icon: Monitor,
    title: 'IT Technician',
    desc: 'Hardware diagnostics, system administration, and technical support for mission-critical environments.',
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.reveal');
    cards?.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
        {/* Profile image */}
        <div className="reveal opacity-0 flex-shrink-0">
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-primary/30 amber-glow">
            <img
              src="/IMG_20260108_145926_631~2.jpg"
              alt="Kingsley Atta Yeboah"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-2">About Me</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Crafting Digital <span className="gradient-text-amber">Excellence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Based in Accra, Ghana, I bring a multidisciplinary approach to technology — combining software engineering, networking infrastructure, and hands-on IT expertise to deliver end-to-end solutions.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {roles.map((role, i) => (
          <div
            key={role.title}
            className="reveal opacity-0 glass-card rounded-xl p-8 hover:border-primary/30 transition-all duration-500 group"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="w-12 h-12 rounded-lg gradient-amber flex items-center justify-center mb-6 group-hover:amber-glow transition-shadow">
              <role.icon size={24} className="text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">{role.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{role.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
