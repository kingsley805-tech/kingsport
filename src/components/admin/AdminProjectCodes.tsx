import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Lock, Save, Trash2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { fetchVercelProjects } from '@/services/vercel';

type CodeRow = { project_id: string; code: string; github_url: string | null };

const AdminProjectCodes = () => {
  const [search, setSearch] = useState('');
  const [codes, setCodes] = useState<Record<string, CodeRow>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['vercel-projects'],
    queryFn: fetchVercelProjects,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('project_access_codes' as any)
        .select('project_id, code, github_url');
      if (error) {
        toast.error('Failed to load saved codes');
        return;
      }
      const map: Record<string, CodeRow> = {};
      (data as CodeRow[] | null)?.forEach((row) => {
        map[row.project_id] = row;
      });
      setCodes(map);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.repoName ?? '').toLowerCase().includes(q),
    );
  }, [projects, search]);

  const updateField = (id: string, patch: Partial<CodeRow>) => {
    setCodes((prev) => ({
      ...prev,
      [id]: { project_id: id, code: '', github_url: null, ...prev[id], ...patch },
    }));
  };

  const save = async (projectId: string, projectName: string, defaultRepoUrl: string | null) => {
    const row = codes[projectId];
    if (!row || !row.code?.trim()) {
      toast.error('Enter a code first');
      return;
    }
    setSavingId(projectId);
    const { error } = await supabase.from('project_access_codes' as any).upsert(
      {
        project_id: projectId,
        project_name: projectName,
        code: row.code.trim(),
        github_url: row.github_url?.trim() || defaultRepoUrl,
      },
      { onConflict: 'project_id' },
    );
    setSavingId(null);
    if (error) toast.error(error.message);
    else toast.success('Saved');
  };

  const remove = async (projectId: string) => {
    const { error } = await supabase
      .from('project_access_codes' as any)
      .delete()
      .eq('project_id', projectId);
    if (error) return toast.error(error.message);
    setCodes((prev) => {
      const next = { ...prev };
      delete next[projectId];
      return next;
    });
    toast.success('Removed');
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Vercel projects…"
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading Vercel projects…</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => {
            const row = codes[p.id];
            return (
              <Card key={p.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="font-semibold flex items-center gap-2">
                        {p.name}
                        {p.framework && <Badge variant="secondary">{p.framework}</Badge>}
                        {row?.code && (
                          <Badge variant="outline" className="gap-1">
                            <Lock className="w-3 h-3" /> Code set
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {p.repoName ?? '— no repo —'}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => save(p.id, p.name, p.repoUrl)}
                        disabled={savingId === p.id}
                      >
                        <Save className="w-3.5 h-3.5" />
                        {savingId === p.id ? 'Saving…' : 'Save'}
                      </Button>
                      {row?.code && (
                        <Button size="sm" variant="outline" onClick={() => remove(p.id)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Unlock code</label>
                      <Input
                        type="text"
                        value={row?.code ?? ''}
                        onChange={(e) => updateField(p.id, { code: e.target.value })}
                        placeholder="e.g. friends2026"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        GitHub URL (optional override)
                      </label>
                      <Input
                        type="url"
                        value={row?.github_url ?? ''}
                        onChange={(e) => updateField(p.id, { github_url: e.target.value })}
                        placeholder={p.repoUrl ?? 'https://github.com/...'}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminProjectCodes;
