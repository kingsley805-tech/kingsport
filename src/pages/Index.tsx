import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Palette, Zap, Github, Linkedin, Mail } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function Index() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Code,
      title: 'Full Stack Development',
      description: 'Building robust applications with React, Next.js, Node.js, and modern databases.',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Creating beautiful, intuitive interfaces with attention to detail and user experience.',
    },
    {
      icon: Zap,
      title: 'Performance Focused',
      description: 'Optimizing for speed, accessibility, and seamless user interactions.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <motion.div
          initial="hidden"
          animate={heroInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              👋 Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            I'm <span className="gradient-text">Kingsley Yeboah</span>
            <br />
            Full Stack Developer
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            I craft beautiful, performant web applications with modern technologies. 
            Based in Ghana, passionate about turning ideas into reality.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/portfolio"
              className="group flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all glow-hover"
            >
              View My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="mailto:kingsleyyeboah805@gmail.com"
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              <Mail size={18} />
              Get in Touch
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-4 mt-12"
          >
            <a
              href="https://github.com/kingsley805-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-muted transition-all glow-hover"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/kingsley-atta-yeboah-a27579246/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-muted transition-all glow-hover"
            >
              <Linkedin size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4 bg-muted/30">
        <motion.div
          initial="hidden"
          animate={featuresInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What I Do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I specialize in building modern web applications with a focus on user experience and performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all glow-hover"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 px-4">
        <motion.div
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Ready to see my work?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Check out my portfolio to see the projects I've built using modern technologies.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg hover:bg-primary/90 transition-all glow-hover"
            >
              Explore Portfolio
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Kingsley Yeboah. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/kingsley805-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/kingsley-atta-yeboah-a27579246/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:kingsleyyeboah805@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
