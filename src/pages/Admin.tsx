import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard } from 'lucide-react';
import AdminProjects from '@/components/admin/AdminProjects';
import AdminNetworking from '@/components/admin/AdminNetworking';
import AdminSections from '@/components/admin/AdminSections';
import AdminStats from '@/components/admin/AdminStats';

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="text-primary" size={24} />
          <h1 className="font-display text-xl font-bold">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View Site
          </a>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut size={16} /> Sign Out
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <AdminStats />

        <Tabs defaultValue="projects" className="mt-8">
          <TabsList className="bg-secondary/50 border border-border">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="networking">Networking Tools</TabsTrigger>
            <TabsTrigger value="sections">Section Content</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6">
            <AdminProjects />
          </TabsContent>
          <TabsContent value="networking" className="mt-6">
            <AdminNetworking />
          </TabsContent>
          <TabsContent value="sections" className="mt-6">
            <AdminSections />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
