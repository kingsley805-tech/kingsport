import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Folder, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ProjectCard from '@/components/portfolio/ProjectCard';
import SkeletonCard from '@/components/portfolio/SkeletonCard';
import FilterBar from '@/components/portfolio/FilterBar';

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

export default function Portfolio() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Project[];
    },
  });

  // Get all unique technologies
  const availableTechs = useMemo(() => {
    if (!projects) return [];
    const techs = new Set<string>();
    projects.forEach(p => p.tech_stack.forEach(t => techs.add(t)));
    return Array.from(techs).sort();
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    
    return projects.filter(project => {
      const matchesSearch = !searchQuery || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTech = selectedTechs.length === 0 ||
        selectedTechs.some(tech => project.tech_stack.includes(tech));
      
      return matchesSearch && matchesTech;
    });
  }, [projects, searchQuery, selectedTechs]);

  const handleTechToggle = (tech: string) => {
    setSelectedTechs(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTechs([]);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6"
          >
            <Folder className="w-8 h-8 text-primary" />
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            My <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my latest projects showcasing modern web development with cutting-edge technologies.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTechs={selectedTechs}
            onTechToggle={handleTechToggle}
            availableTechs={availableTechs}
            onClearFilters={handleClearFilters}
          />
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <AlertCircle className="w-16 h-16 text-destructive mb-4" />
            <h3 className="text-xl font-semibold mb-2">Error Loading Projects</h3>
            <p className="text-muted-foreground">Please try refreshing the page.</p>
          </motion.div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <Folder className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {projects?.length === 0 ? 'No Projects Yet' : 'No Matching Projects'}
            </h3>
            <p className="text-muted-foreground">
              {projects?.length === 0
                ? 'Check back later or add projects from the dashboard.'
                : 'Try adjusting your search or filters.'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        )}

        {/* Results count */}
        {!isLoading && !error && projects && projects.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-muted-foreground mt-8"
          >
            Showing {filteredProjects.length} of {projects.length} projects
          </motion.p>
        )}
      </div>
    </div>
  );
}
