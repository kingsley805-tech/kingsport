import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

type Tool = Tables<'networking_tools'>;

const emptyTool: Partial<TablesInsert<'networking_tools'>> = {
  name: '', description: '', image_url: '', external_url: '', visible: true, display_order: 0,
};

const AdminNetworking = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Tool | null>(null);
  const [form, setForm] = useState(emptyTool);

  const { data: tools = [], isLoading } = useQuery({
    queryKey: ['admin-networking-tools'],
    queryFn: async () => {
      const { data, error } = await supabase.from('networking_tools').select('*').order('display_order');
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (t: TablesInsert<'networking_tools'>) => {
      if (editing) {
        const { error } = await supabase.from('networking_tools').update(t).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('networking_tools').insert(t);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-networking-tools'] });
      qc.invalidateQueries({ queryKey: ['admin-tool-count'] });
      toast.success(editing ? 'Tool updated' : 'Tool created');
      closeDialog();
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('networking_tools').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-networking-tools'] });
      qc.invalidateQueries({ queryKey: ['admin-tool-count'] });
      toast.success('Tool deleted');
    },
    onError: (e) => toast.error(e.message),
  });

  const moveMutation = useMutation({
    mutationFn: async ({ id, newOrder, otherId, otherNewOrder }: { id: string, newOrder: number, otherId: string, otherNewOrder: number }) => {
      const { error: error1 } = await supabase.from('networking_tools').update({ display_order: newOrder }).eq('id', id);
      if (error1) throw error1;

      const { error: error2 } = await supabase.from('networking_tools').update({ display_order: otherNewOrder }).eq('id', otherId);
      if (error2) throw error2;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-networking-tools'] });
    },
    onError: (e) => toast.error(e.message),
  });

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const tool = tools[index];
    const neighborIndex = direction === 'up' ? index - 1 : index + 1;
    const neighbor = tools[neighborIndex];

    if (!neighbor) return;

    let newOrder = neighbor.display_order;
    let otherNewOrder = tool.display_order;

    // If orders are the same, use indices to force a swap
    if (newOrder === otherNewOrder) {
      newOrder = neighborIndex;
      otherNewOrder = index;
    }

    moveMutation.mutate({
      id: tool.id,
      newOrder,
      otherId: neighbor.id,
      otherNewOrder
    });
  };

  const openAdd = () => {
    const maxOrder = tools.length > 0 
      ? Math.max(...tools.map(t => t.display_order)) 
      : -1;
    setEditing(null);
    setForm({ ...emptyTool, display_order: maxOrder + 1 });
    setOpen(true);
  };

  const openEdit = (t: Tool) => {
    setEditing(t);
    setForm({ name: t.name, description: t.description, image_url: t.image_url ?? '', external_url: t.external_url ?? '', visible: t.visible, display_order: t.display_order });
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditing(null);
    setForm(emptyTool);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({ ...form, name: form.name! } as TablesInsert<'networking_tools'>);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-lg font-semibold">Manage Networking Tools</h2>
        <Dialog open={open} onOpenChange={(v) => { if (!v) closeDialog(); else openAdd(); }}>
          <DialogTrigger asChild>
            <Button size="sm" className="gradient-amber text-primary-foreground">
              <Plus size={16} /> Add Tool
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit Tool' : 'New Tool'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Tool Name" value={form.name ?? ''} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-secondary/50" />
              <Textarea placeholder="Description" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-secondary/50" />
              <Input placeholder="Image URL" value={form.image_url ?? ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="bg-secondary/50" />
              <Input placeholder="External URL" value={form.external_url ?? ''} onChange={(e) => setForm({ ...form, external_url: e.target.value })} className="bg-secondary/50" />
              <div className="flex items-center gap-3">
                <Input type="number" placeholder="Display Order" value={form.display_order ?? 0} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className="bg-secondary/50 w-32" />
                <label className="flex items-center gap-2 text-sm">
                  <Switch checked={form.visible ?? true} onCheckedChange={(v) => setForm({ ...form, visible: v })} />
                  Visible
                </label>
              </div>
              <Button type="submit" disabled={saveMutation.isPending} className="w-full gradient-amber text-primary-foreground">
                {saveMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : tools.length === 0 ? (
        <p className="text-muted-foreground">No tools yet. Add your first one!</p>
      ) : (
        <div className="space-y-3">
          {tools.map((t, index) => (
            <div key={t.id} className="glass-card rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={index === 0 || moveMutation.isPending}
                    onClick={() => handleMove(index, 'up')}
                  >
                    <ArrowUp size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={index === tools.length - 1 || moveMutation.isPending}
                    onClick={() => handleMove(index, 'down')}
                  >
                    <ArrowDown size={14} />
                  </Button>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{t.name}</h3>
                  {!t.visible && <span className="text-xs bg-secondary px-2 py-0.5 rounded text-muted-foreground">Hidden</span>}
                </div>
                <p className="text-sm text-muted-foreground truncate">{t.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => openEdit(t)}><Pencil size={16} /></Button>
                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(t.id)}><Trash2 size={16} className="text-destructive" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNetworking;
