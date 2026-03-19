import { useEffect, useRef } from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';

const projects = [
  {
    title: 'CloudSync Dashboard',
    description: 'Real-time cloud monitoring platform with live metrics, alerts, and team collaboration features.',
    url: 'https://example.com',
    github: '#',
    tools: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSocket'],
  },
  {
    title: 'NetGuard Analytics',
    description: 'Network security monitoring tool with traffic analysis, threat detection, and reporting.',
    url: 'https://example.com',
    github: '#',
    tools: ['Python', 'Django', 'D3.js', 'Redis', 'Docker'],
  },
  {
    title: 'DevFlow CI/CD',
    description: 'Automated deployment pipeline with GitHub integration, build monitoring, and rollback support.',
    url: 'https://example.com',
    github: '#',
    tools: ['Go', 'React', 'Docker', 'Kubernetes', 'gRPC'],
  },
];

const ProjectsSection = () => {
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
    <section id="projects" ref={sectionRef} className="section-padding max-w-7xl mx-auto">
      <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-2">Portfolio</p>
      <h2 className="text-3xl md:text-5xl font-display font-bold mb-16">
        Software <span className="gradient-text-amber">Projects</span>
      </h2>

      <div className="grid lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="reveal opacity-0 browser-card group hover:border-primary/30 transition-all duration-500"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {/* Browser chrome */}
            <div className="browser-card-header">
              <div className="browser-dot bg-destructive/80" />
              <div className="browser-dot bg-primary/60" />
              <div className="browser-dot bg-green-500/60" />
              <div className="flex-1 ml-3">
                <div className="bg-secondary/50 rounded-md px-3 py-1 text-xs text-muted-foreground flex items-center gap-1 max-w-[200px]">
                  <Globe size={10} />
                  <span className="truncate">{project.url.replace('https://', '')}</span>
                </div>
              </div>
            </div>

            {/* Live iframe preview */}
            <div className="relative w-full h-48 bg-secondary/30 overflow-hidden border-b border-border">
              <iframe
                src={project.url}
                title={project.title}
                className="w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none"
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                {project.description}
              </p>

              {/* Tools */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github size={14} /> GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
