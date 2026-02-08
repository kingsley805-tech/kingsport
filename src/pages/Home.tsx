import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Github, Linkedin, Twitter, Globe, Mail } from 'lucide-react';
import meImage from '@/img/me.png';

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/', label: 'Instagram' },
  { icon: Github, href: 'https://github.com/kingsley805-tech', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/kingsley-atta-yeboah-a27579246/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/', label: 'Twitter' },
];

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex items-center pt-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
              Portfolio · a Full Stack Developer
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I'm{' '}
              <span className="text-gradient">Kingsley</span>
              <span className="inline-block ml-2">👋</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              I build clean, modern digital experiences that feel fast and intuitive.
            </p>

            <div className="flex flex-col gap-3 text-muted-foreground">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <span>based in Ghana</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:kingsleyyeboah805@gmail.com" className="hover:text-foreground transition-colors">
                  kingsleyyeboah805@gmail.com
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/portfolio"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                View my works
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 border border-border rounded-full font-medium hover:bg-secondary transition-colors"
              >
                View more
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right content - Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Purple circle background */}
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary overflow-hidden animate-float">
                <img
                  src={meImage}
                  alt="Kingsley Yeboah"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-8 -right-4 md:right-0 bg-card shadow-lg rounded-xl p-4 border border-border"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Currently available
                  </span>
                </div>
                <p className="text-sm text-foreground">
                  Open to frontend & full‑stack opportunities.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
