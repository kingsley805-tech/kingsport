import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ExternalLink,
  Github,
  Search,
  AlertCircle,
  CircleDot,
  Rocket,
  Layers,
  Activity,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchVercelProjects } from "@/services/vercel";
import type { SortOption, VercelProjectDTO } from "@/types/vercel";

const THIRTY_MIN = 1000 * 60 * 30;

function statusColor(status: string | null) {
  switch ((status ?? "").toUpperCase()) {
    case "READY":
      return "bg-green-500";
    case "BUILDING":
    case "QUEUED":
    case "INITIALIZING":
      return "bg-amber-500";
    case "ERROR":
    case "CANCELED":
      return "bg-red-500";
    default:
      return "bg-muted-foreground";
  }
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const ProjectCard = ({ p }: { p: VercelProjectDTO }) => (
  <Card className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
    <div className="relative h-36 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
      <Rocket className="w-10 h-10 text-muted-foreground/40" />
      <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur px-2 py-1 text-xs">
        <span className={`inline-block w-2 h-2 rounded-full ${statusColor(p.deploymentStatus)}`} />
        <span className="text-foreground/80">{p.deploymentStatus ?? "Unknown"}</span>
      </div>
    </div>
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-base leading-snug truncate">{p.name}</h3>
        {p.framework && (
          <Badge variant="secondary" className="shrink-0">{p.framework}</Badge>
        )}
      </div>
    </CardHeader>
    <CardContent className="flex flex-col gap-3 flex-1">
      <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
        {p.description ?? p.repoName ?? "No description provided."}
      </p>
      <div className="text-xs text-muted-foreground space-y-1">
        <div>Created {formatDate(p.createdAt)}</div>
        <div>Updated {formatDate(p.updatedAt)}</div>
      </div>
      <div className="flex gap-2 mt-auto pt-2">
        {p.productionUrl && (
          <Button asChild size="sm" className="flex-1">
            <a href={p.productionUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3.5 h-3.5" /> Live
            </a>
          </Button>
        )}
        {p.repoUrl && (
          <Button asChild size="sm" variant="outline" className="flex-1">
            <a href={p.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-3.5 h-3.5" /> Repo
            </a>
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

const StatCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Rocket;
  label: string;
  value: string | number;
}) => (
  <Card>
    <CardContent className="p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </CardContent>
  </Card>
);

const VercelPortfolio = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["vercel-projects"],
    queryFn: fetchVercelProjects,
    refetchInterval: THIRTY_MIN,
    staleTime: THIRTY_MIN,
  });

  const projects = data ?? [];

  const stats = useMemo(() => {
    const frameworks = new Map<string, number>();
    let active = 0;
    for (const p of projects) {
      const f = p.framework ?? "Other";
      frameworks.set(f, (frameworks.get(f) ?? 0) + 1);
      if ((p.deploymentStatus ?? "").toUpperCase() === "READY") active++;
    }
    return {
      total: projects.length,
      active,
      frameworks: [...frameworks.entries()].sort((a, b) => b[1] - a[1]),
    };
  }, [projects]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = projects;
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.framework ?? "").toLowerCase().includes(q) ||
          (p.repoName ?? "").toLowerCase().includes(q),
      );
    }
    const sorted = [...list];
    switch (sort) {
      case "newest":
        sorted.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "oldest":
        sorted.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "updated":
        sorted.sort((a, b) => b.updatedAt - a.updatedAt);
        break;
      case "alpha":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return sorted;
  }, [projects, search, sort]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold">Vercel Portfolio</h2>
          <p className="text-sm text-muted-foreground">
            Live projects synced from your Vercel account
            {isFetching && !isLoading ? " · refreshing…" : ""}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={Rocket} label="Total Projects" value={isLoading ? "—" : stats.total} />
        <StatCard icon={Activity} label="Active Deployments" value={isLoading ? "—" : stats.active} />
        <StatCard
          icon={Layers}
          label="Top Framework"
          value={isLoading ? "—" : stats.frameworks[0]?.[0] ?? "—"}
        />
      </div>

      {!isLoading && stats.frameworks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {stats.frameworks.map(([fw, count]) => (
            <Badge key={fw} variant="outline" className="gap-1.5">
              <CircleDot className="w-3 h-3" /> {fw} · {count}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, framework, or repository…"
            className="pl-9"
          />
        </div>
        <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
          <SelectTrigger className="sm:w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="updated">Last Updated</SelectItem>
            <SelectItem value="alpha">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isError && (
        <div className="flex items-start gap-3 p-4 rounded-lg border border-destructive/30 bg-destructive/5 text-sm">
          <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-destructive">Couldn't load Vercel projects</div>
            <div className="text-muted-foreground">{(error as Error)?.message}</div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-36 w-full rounded-none" />
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 flex-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">
          No projects match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VercelPortfolio;
