import { motion } from 'framer-motion';
import { ExternalLink, Github, Edit, Trash2, Loader2 } from 'lucide-react';
import TechBadge from '@/components/portfolio/TechBadge';

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

interface DashboardProjectTableProps {
  projects: Project[];
  isLoading: boolean;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export default function DashboardProjectTable({
  projects,
  isLoading,
  onEdit,
  onDelete,
}: DashboardProjectTableProps) {
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-12 text-center">
        <p className="text-muted-foreground">No projects yet — add one above!</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left py-4 px-6 font-medium text-sm">Title</th>
              <th className="text-left py-4 px-6 font-medium text-sm hidden md:table-cell">Live URL</th>
              <th className="text-left py-4 px-6 font-medium text-sm hidden lg:table-cell">GitHub</th>
              <th className="text-left py-4 px-6 font-medium text-sm hidden xl:table-cell">Tech Stack</th>
              <th className="text-left py-4 px-6 font-medium text-sm hidden sm:table-cell">Date Added</th>
              <th className="text-right py-4 px-6 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium">{project.title}</p>
                    {project.description && (
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                        {project.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6 hidden md:table-cell">
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-primary hover:underline max-w-[200px] truncate"
                  >
                    <ExternalLink size={14} />
                    {new URL(project.live_url).hostname}
                  </a>
                </td>
                <td className="py-4 px-6 hidden lg:table-cell">
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Github size={14} />
                    View
                  </a>
                </td>
                <td className="py-4 px-6 hidden xl:table-cell">
                  <div className="flex flex-wrap gap-1 max-w-[250px]">
                    {project.tech_stack.slice(0, 3).map((tech) => (
                      <TechBadge key={tech} tech={tech} />
                    ))}
                    {project.tech_stack.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-muted rounded-full">
                        +{project.tech_stack.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-muted-foreground hidden sm:table-cell">
                  {new Date(project.created_at).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(project);
                      }}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(project);
                      }}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
