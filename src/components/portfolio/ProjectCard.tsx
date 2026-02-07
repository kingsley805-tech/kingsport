import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import ProjectPreview from './ProjectPreview';
import TechBadge from './TechBadge';

interface Project {
  id: string;
  title: string;
  description: string | null;
  live_url: string;
  github_url: string;
  tech_stack: string[];
  thumbnail_url: string | null;
  created_at: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 glow-hover"
    >
      {/* Preview */}
      <div className="relative" style={{ transform: 'translateZ(50px)' }}>
        <ProjectPreview
          liveUrl={project.live_url}
          title={project.title}
          thumbnailUrl={project.thumbnail_url || undefined}
        />
        
        {/* Gradient border sweep on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6" style={{ transform: 'translateZ(30px)' }}>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        {project.description && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech_stack.map((tech, i) => (
            <TechBadge key={tech} tech={tech} index={i} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <ExternalLink size={16} />
            Live Project
          </motion.a>
          
          <motion.a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
          >
            <Github size={16} />
            View Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
