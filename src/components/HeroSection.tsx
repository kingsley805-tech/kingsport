import { useEffect, useRef } from 'react';
import HeroScene from './HeroScene';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene />

      <div ref={ref} className="relative z-10 text-center px-6 max-w-4xl">
        <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4">
          Software Engineer · Network Engineer · IT Technician
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6">
          Kingsley Atta
          <br />
          <span className="gradient-text-amber">Yeboah</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Building robust software, designing resilient networks, and crafting immersive 3D experiences from Accra, Ghana.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 rounded-lg gradient-amber text-primary-foreground font-display font-semibold hover:opacity-90 transition-opacity amber-glow"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg glass-card text-foreground font-display font-semibold hover:border-primary transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-muted-foreground hover:text-primary transition-colors animate-float"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
};

export default HeroSection;
