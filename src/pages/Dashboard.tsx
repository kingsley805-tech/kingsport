import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, LayoutDashboard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import DashboardProjectTable from '@/components/dashboard/DashboardProjectTable';
import ProjectFormModal from '@/components/dashboard/ProjectFormModal';
import DeleteConfirmModal from '@/components/dashboard/DeleteConfirmModal';

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

export default function Dashboard() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  const { data: projects, isLoading } = useQuery({
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

  const createMutation = useMutation({
    mutationFn: async (project: Omit<Project, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created successfully!');
      setIsFormOpen(false);
    },
    onError: (error) => {
      toast.error('Failed to create project: ' + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...project }: Partial<Project> & { id: string }) => {
      const { data, error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project updated successfully!');
      setIsFormOpen(false);
      setEditingProject(null);
    },
    onError: (error) => {
      toast.error('Failed to update project: ' + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted successfully!');
      setIsDeleteOpen(false);
      setDeletingProject(null);
    },
    onError: (error) => {
      toast.error('Failed to delete project: ' + error.message);
    },
  });

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleDelete = (project: Project) => {
    setDeletingProject(project);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = (data: Omit<Project, 'id' | 'created_at'>) => {
    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10"
            >
              <LayoutDashboard className="w-6 h-6 text-primary" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Manage your portfolio projects</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus size={18} />
            Add Project
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm">Total Projects</p>
            <p className="text-3xl font-bold mt-1">{projects?.length ?? 0}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm">Technologies Used</p>
            <p className="text-3xl font-bold mt-1">
              {new Set(projects?.flatMap(p => p.tech_stack) ?? []).size}
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm">Latest Addition</p>
            <p className="text-lg font-semibold mt-1 truncate">
              {projects?.[0]?.title ?? 'No projects yet'}
            </p>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <DashboardProjectTable
            projects={projects ?? []}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isFormOpen && (
          <ProjectFormModal
            project={editingProject}
            onSubmit={handleFormSubmit}
            onClose={handleFormClose}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
          />
        )}
        {isDeleteOpen && deletingProject && (
          <DeleteConfirmModal
            projectTitle={deletingProject.title}
            onConfirm={() => deleteMutation.mutate(deletingProject.id)}
            onCancel={() => { setIsDeleteOpen(false); setDeletingProject(null); }}
            isDeleting={deleteMutation.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
