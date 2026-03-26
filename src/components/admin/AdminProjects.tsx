import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

type Project = Tables<'projects'>;

const emptyProject: Partial<TablesInsert<'projects'>> = {
  title: '', description: '', url: '', github_url: '', tools: [], visible: true, display_order: 0,
};

const AdminProjects = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [toolsInput, setToolsInput] = useState('');

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*').order('display_order');
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (p: TablesInsert<'projects'>) => {
      if (editing) {
        const { error } = await supabase.from('projects').update(p).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert(p);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-projects'] });
      qc.invalidateQueries({ queryKey: ['admin-project-count'] });
      toast.success(editing ? 'Project updated' : 'Project created');
      closeDialog();
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-projects'] });
      qc.invalidateQueries({ queryKey: ['admin-project-count'] });
      toast.success('Project deleted');
    },
    onError: (e) => toast.error(e.message),
  });

  const moveMutation = useMutation({
    mutationFn: async ({ id, newOrder, otherId, otherNewOrder }: { id: string, newOrder: number, otherId: string, otherNewOrder: number }) => {
      // Use two separate updates as Supabase doesn't support batch update with different values easily in JS client
      const { error: error1 } = await supabase.from('projects').update({ display_order: newOrder }).eq('id', id);
      if (error1) throw error1;

      const { error: error2 } = await supabase.from('projects').update({ display_order: otherNewOrder }).eq('id', otherId);
      if (error2) throw error2;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-projects'] });
    },
    onError: (e) => toast.error(e.message),
  });

  const reorderMutation = useMutation({
    mutationFn: async (updatedProjects: Project[]) => {
      const updates = updatedProjects.map((p, index) => ({
        id: p.id,
        display_order: index,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('projects')
          .update({ display_order: update.display_order })
          .eq('id', update.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success('Order updated');
    },
    onError: (e) => toast.error(e.message),
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    reorderMutation.mutate(items);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const project = projects[index];
    const neighborIndex = direction === 'up' ? index - 1 : index + 1;
    const neighbor = projects[neighborIndex];

    if (!neighbor) return;

    let newOrder = neighbor.display_order;
    let otherNewOrder = project.display_order;

    // If orders are the same, use indices to force a swap
    if (newOrder === otherNewOrder) {
      newOrder = neighborIndex;
      otherNewOrder = index;
    }

    moveMutation.mutate({
      id: project.id,
      newOrder,
      otherId: neighbor.id,
      otherNewOrder
    });
  };

  const openAdd = () => {
    const maxOrder = projects.length > 0 
      ? Math.max(...projects.map(p => p.display_order)) 
      : -1;
    setEditing(null);
    setForm({ ...emptyProject, display_order: maxOrder + 1 });
    setToolsInput('');
    setOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({ title: p.title, description: p.description, url: p.url, github_url: p.github_url, tools: p.tools, visible: p.visible, display_order: p.display_order });
    setToolsInput(p.tools.join(', '));
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditing(null);
    setForm(emptyProject);
    setToolsInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tools = toolsInput.split(',').map(t => t.trim()).filter(Boolean);
    saveMutation.mutate({ ...form, tools, title: form.title! } as TablesInsert<'projects'>);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-lg font-semibold">Manage Projects</h2>
        <Dialog open={open} onOpenChange={(v) => { if (!v) closeDialog(); else openAdd(); }}>
          <DialogTrigger asChild>
            <Button size="sm" className="gradient-amber text-primary-foreground">
              <Plus size={16} /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit Project' : 'New Project'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Project Title" value={form.title ?? ''} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="bg-secondary/50" />
              <Textarea placeholder="Description" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-secondary/50" />
              <Input placeholder="Live URL (https://...)" value={form.url ?? ''} onChange={(e) => setForm({ ...form, url: e.target.value })} className="bg-secondary/50" />
              <Input placeholder="GitHub URL" value={form.github_url ?? ''} onChange={(e) => setForm({ ...form, github_url: e.target.value })} className="bg-secondary/50" />
              <Input placeholder="Tools (comma-separated: React, Node.js, Docker)" value={toolsInput} onChange={(e) => setToolsInput(e.target.value)} className="bg-secondary/50" />
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
      ) : projects.length === 0 ? (
        <p className="text-muted-foreground">No projects yet. Add your first one!</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="projects">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {projects.map((p, index) => (
                  <Draggable key={p.id} draggableId={p.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="glass-card rounded-lg p-4 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-2">
                          <div {...provided.dragHandleProps} className="cursor-grab hover:text-primary transition-colors">
                            <GripVertical size={20} className="text-muted-foreground" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              disabled={index === 0 || moveMutation.isPending || reorderMutation.isPending}
                              onClick={() => handleMove(index, 'up')}
                            >
                              <ArrowUp size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              disabled={index === projects.length - 1 || moveMutation.isPending || reorderMutation.isPending}
                              onClick={() => handleMove(index, 'down')}
                            >
                              <ArrowDown size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold truncate">{p.title}</h3>
                            {!p.visible && <span className="text-xs bg-secondary px-2 py-0.5 rounded text-muted-foreground">Hidden</span>}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{p.url}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil size={16} /></Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(p.id)}><Trash2 size={16} className="text-destructive" /></Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default AdminProjects;
