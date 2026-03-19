import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Folder, Wrench, FileText } from 'lucide-react';

const AdminStats = () => {
  const { data: projectCount } = useQuery({
    queryKey: ['admin-project-count'],
    queryFn: async () => {
      const { count } = await supabase.from('projects').select('*', { count: 'exact', head: true });
      return count ?? 0;
    },
  });

  const { data: toolCount } = useQuery({
    queryKey: ['admin-tool-count'],
    queryFn: async () => {
      const { count } = await supabase.from('networking_tools').select('*', { count: 'exact', head: true });
      return count ?? 0;
    },
  });

  const { data: sectionCount } = useQuery({
    queryKey: ['admin-section-count'],
    queryFn: async () => {
      const { count } = await supabase.from('section_content').select('*', { count: 'exact', head: true });
      return count ?? 0;
    },
  });

  const stats = [
    { label: 'Projects', value: projectCount ?? 0, icon: Folder },
    { label: 'Networking Tools', value: toolCount ?? 0, icon: Wrench },
    { label: 'Sections', value: sectionCount ?? 0, icon: FileText },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="glass-card rounded-xl p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg gradient-amber flex items-center justify-center">
            <s.icon size={20} className="text-primary-foreground" />
          </div>
          <div>
            <p className="text-2xl font-display font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
