import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, X, Mail, Clock, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AccessRequest {
  id: string;
  requester_name: string;
  requester_email: string;
  project_id: string | null;
  request_type: string;
  message: string | null;
  status: string;
  created_at: string;
  responded_at: string | null;
}

interface Project {
  id: string;
  title: string;
  github_url: string;
}

export default function AccessRequestsPanel() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'pending' | 'approved' | 'denied' | 'all'>('pending');

  const { data: requests, isLoading } = useQuery({
    queryKey: ['access_requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('github_access_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as AccessRequest[];
    },
  });

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, github_url');
      if (error) throw error;
      return data as Project[];
    },
  });

  const respondMutation = useMutation({
    mutationFn: async ({ id, status, github_url, requester_email }: { id: string; status: string; github_url?: string; requester_email?: string }) => {
      const { error } = await supabase
        .from('github_access_requests')
        .update({ status, responded_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;

      // Send notification email via edge function
      if (status === 'approved' && github_url && requester_email) {
        await supabase.functions.invoke('notify-access-response', {
          body: { requester_email, status, github_url },
        });
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['access_requests'] });
      toast.success(`Request ${variables.status}!`);
    },
    onError: (error) => {
      toast.error('Failed: ' + error.message);
    },
  });

  const filteredRequests = requests?.filter(r => filter === 'all' ? true : r.status === filter) ?? [];
  const pendingCount = requests?.filter(r => r.status === 'pending').length ?? 0;

  const getProjectTitle = (projectId: string | null) => {
    if (!projectId) return 'General GitHub';
    return projects?.find(p => p.id === projectId)?.title ?? 'Unknown Project';
  };

  const getProjectGithubUrl = (projectId: string | null) => {
    if (!projectId) return null;
    return projects?.find(p => p.id === projectId)?.github_url ?? null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['pending', 'approved', 'denied', 'all'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              filter === f
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {f} {f === 'pending' && pendingCount > 0 && `(${pendingCount})`}
          </button>
        ))}
      </div>

      {filteredRequests.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No {filter} requests</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRequests.map((req, index) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{req.requester_name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      req.status === 'pending' ? 'bg-yellow-500/10 text-yellow-600' :
                      req.status === 'approved' ? 'bg-green-500/10 text-green-600' :
                      'bg-red-500/10 text-red-600'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <Mail size={14} />
                    {req.requester_email}
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Requesting:</span>{' '}
                    {req.request_type === 'github_profile' ? 'GitHub Profile Access' : `Code for "${getProjectTitle(req.project_id)}"`}
                  </p>
                  {req.message && (
                    <p className="text-sm text-muted-foreground mt-1 italic">"{req.message}"</p>
                  )}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                    <Clock size={12} />
                    {new Date(req.created_at).toLocaleString()}
                  </div>
                </div>

                {req.status === 'pending' && (
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => respondMutation.mutate({
                        id: req.id,
                        status: 'approved',
                        github_url: getProjectGithubUrl(req.project_id) ?? undefined,
                        requester_email: req.requester_email,
                      })}
                      disabled={respondMutation.isPending}
                      className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <Check size={16} />
                      Allow
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => respondMutation.mutate({ id: req.id, status: 'denied' })}
                      disabled={respondMutation.isPending}
                      className="flex items-center gap-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium hover:bg-destructive/90 transition-colors disabled:opacity-50"
                    >
                      <X size={16} />
                      Deny
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
