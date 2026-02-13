import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, LayoutDashboard, FolderOpen, User, Bell } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import DashboardProjectTable from '@/components/dashboard/DashboardProjectTable';
import ProjectFormModal from '@/components/dashboard/ProjectFormModal';
import DeleteConfirmModal from '@/components/dashboard/DeleteConfirmModal';
import AboutEditor from '@/components/dashboard/AboutEditor';
import AccessRequestsPanel from '@/components/dashboard/AccessRequestsPanel';
import { useAuth } from '@/contexts/AuthContext';

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

type Tab = 'projects' | 'about' | 'requests';

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('projects');
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

  const { data: pendingRequests } = useQuery({
    queryKey: ['access_requests_count'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('github_access_requests')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');
        
        if (error) {
          console.warn('Silent fetch error for pending requests (likely RLS):', error.message);
          return 0;
        }
        return count ?? 0;
      } catch (err) {
        console.warn('Silent catch for pending requests:', err);
        return 0;
      }
    },
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: async (project: Omit<Project, 'id' | 'created_at'>) => {
      if (!user) {
        throw new Error('You must be logged in to add projects');
      }
      
      const { error } = await supabase
        .from('projects')
        .insert([project]);
      
      if (error) {
        throw new Error(error.message || 'Failed to create project');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created successfully!');
      setIsFormOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create project');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: Omit<Project, 'created_at'>) => {
      if (!user) {
        throw new Error('You must be logged in to update projects');
      }
      
      const { error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', id);
      
      if (error) {
        throw new Error(error.message || 'Failed to update project');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project updated successfully!');
      setIsFormOpen(false);
      setEditingProject(null);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update project');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!user) {
        throw new Error('You must be logged in to delete projects');
      }
      
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw new Error(error.message || 'Failed to delete project');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted successfully!');
      setIsDeleteOpen(false);
      setDeletingProject(null);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete project');
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

  const handleFormSubmit = async (data: Omit<Project, 'id' | 'created_at'>) => {
    try {
      if (editingProject) {
        await updateMutation.mutateAsync({ id: editingProject.id, ...data });
      } else {
        await createMutation.mutateAsync(data);
      }
    } catch (error) {
      console.error('Mutation error:', error);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: 'projects', label: 'Projects', icon: <FolderOpen size={18} /> },
    { key: 'about', label: 'About Me', icon: <User size={18} /> },
    { key: 'requests', label: 'Access Requests', icon: <Bell size={18} />, badge: pendingRequests ?? 0 },
  ];

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
              <p className="text-muted-foreground">Manage your portfolio</p>
            </div>
          </div>

          {activeTab === 'projects' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus size={18} />
              Add Project
            </motion.button>
          )}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-2 mb-8 overflow-x-auto"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border hover:bg-muted'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-destructive text-destructive-foreground">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'projects' && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-card border border-border rounded-xl p-6">
                  <p className="text-muted-foreground text-sm">Total Projects</p>
                  <p className="text-3xl font-bold mt-1">{projects?.length ?? 0}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <p className="text-muted-foreground text-sm">Technologies Used</p>
                  <p className="text-3xl font-bold mt-1">
                    {new Set(projects?.flatMap(p => p.tech_stack ?? []) ?? []).size}
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <p className="text-muted-foreground text-sm">Latest Addition</p>
                  <p className="text-lg font-semibold mt-1 truncate">
                    {projects?.[0]?.title ?? 'No projects yet'}
                  </p>
                </div>
              </div>

              <DashboardProjectTable
                projects={projects ?? []}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </>
          )}

          {activeTab === 'about' && <AboutEditor />}
          {activeTab === 'requests' && <AccessRequestsPanel />}
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
