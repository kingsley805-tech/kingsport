import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import type { Tables } from '@/integrations/supabase/types';

type Section = Tables<'section_content'>;

const AdminSections = () => {
  const qc = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Section>>({});

  const { data: sections = [], isLoading } = useQuery({
    queryKey: ['admin-sections'],
    queryFn: async () => {
      const { data, error } = await supabase.from('section_content').select('*').order('section_key');
      if (error) throw error;
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Section> & { id: string }) => {
      const { error } = await supabase.from('section_content').update(updates).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-sections'] });
      toast.success('Section updated');
      setEditingId(null);
    },
    onError: (e) => toast.error(e.message),
  });

  const startEdit = (s: Section) => {
    setEditingId(s.id);
    setForm({ title: s.title, subtitle: s.subtitle, body: s.body, visible: s.visible });
  };

  const handleSave = () => {
    if (!editingId) return;
    updateMutation.mutate({ id: editingId, ...form });
  };

  return (
    <div>
      <h2 className="font-display text-lg font-semibold mb-6">Manage Section Content</h2>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="space-y-4">
          {sections.map((s) => (
            <div key={s.id} className="glass-card rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono bg-secondary px-2 py-1 rounded text-muted-foreground uppercase">
                  {s.section_key}
                </span>
                <label className="flex items-center gap-2 text-sm">
                  <Switch
                    checked={editingId === s.id ? form.visible ?? true : s.visible}
                    onCheckedChange={(v) => {
                      if (editingId === s.id) {
                        setForm({ ...form, visible: v });
                      } else {
                        updateMutation.mutate({ id: s.id, visible: v });
                      }
                    }}
                  />
                  Visible
                </label>
              </div>

              {editingId === s.id ? (
                <div className="space-y-3">
                  <Input placeholder="Title" value={form.title ?? ''} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-secondary/50" />
                  <Input placeholder="Subtitle" value={form.subtitle ?? ''} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="bg-secondary/50" />
                  <Textarea placeholder="Body text" value={form.body ?? ''} onChange={(e) => setForm({ ...form, body: e.target.value })} className="bg-secondary/50" rows={3} />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSave} disabled={updateMutation.isPending} className="gradient-amber text-primary-foreground">
                      {updateMutation.isPending ? 'Saving...' : 'Save'}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="cursor-pointer" onClick={() => startEdit(s)}>
                  <p className="font-semibold">{s.title || '(No title)'}</p>
                  {s.subtitle && <p className="text-sm text-muted-foreground">{s.subtitle}</p>}
                  {s.body && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{s.body}</p>}
                  <p className="text-xs text-primary mt-2">Click to edit</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSections;
