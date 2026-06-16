// Vercel projects proxy — keeps VERCEL_TOKEN server-side
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const VERCEL_TOKEN = Deno.env.get("VERCEL_TOKEN");

interface VercelDeployment {
  url?: string;
  readyState?: string;
  createdAt?: number;
}

interface VercelProject {
  id: string;
  name: string;
  framework: string | null;
  createdAt: number;
  updatedAt: number;
  link?: {
    type?: string;
    repo?: string;
    org?: string;
    repoId?: number;
  } | null;
  targets?: {
    production?: {
      url?: string;
      alias?: string[];
      readyState?: string;
      createdAt?: number;
    };
  };
  latestDeployments?: VercelDeployment[];
  description?: string | null;
}

interface NormalizedProject {
  id: string;
  name: string;
  framework: string | null;
  description: string | null;
  productionUrl: string | null;
  latestDeploymentUrl: string | null;
  deploymentStatus: string | null;
  createdAt: number;
  updatedAt: number;
  repoName: string | null;
  repoUrl: string | null;
}

function pickProductionUrl(p: VercelProject): string | null {
  const prod = p.targets?.production;
  if (prod?.alias && prod.alias.length > 0) return `https://${prod.alias[0]}`;
  if (prod?.url) return `https://${prod.url}`;
  return null;
}

function pickRepoUrl(link: VercelProject["link"]): string | null {
  if (!link || !link.repo) return null;
  switch (link.type) {
    case "github":
      return `https://github.com/${link.org}/${link.repo}`;
    case "gitlab":
      return `https://gitlab.com/${link.org}/${link.repo}`;
    case "bitbucket":
      return `https://bitbucket.org/${link.org}/${link.repo}`;
    default:
      return null;
  }
}

function normalize(p: VercelProject): NormalizedProject {
  const latest = p.latestDeployments?.[0];
  return {
    id: p.id,
    name: p.name,
    framework: p.framework ?? null,
    description: p.description ?? null,
    productionUrl: pickProductionUrl(p),
    latestDeploymentUrl: latest?.url ? `https://${latest.url}` : null,
    deploymentStatus: latest?.readyState ?? p.targets?.production?.readyState ?? null,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    repoName: p.link?.repo ? `${p.link.org}/${p.link.repo}` : null,
    repoUrl: pickRepoUrl(p.link),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (!VERCEL_TOKEN) {
    return new Response(
      JSON.stringify({ error: "VERCEL_TOKEN is not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const all: VercelProject[] = [];
    let until: string | undefined;
    // paginate
    for (let i = 0; i < 10; i++) {
      const u = new URL("https://api.vercel.com/v9/projects");
      u.searchParams.set("limit", "100");
      if (until) u.searchParams.set("until", until);

      const res = await fetch(u.toString(), {
        headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      });
      if (!res.ok) {
        const body = await res.text();
        return new Response(
          JSON.stringify({ error: "Vercel API error", status: res.status, body }),
          { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const json = await res.json();
      const batch: VercelProject[] = json.projects ?? [];
      all.push(...batch);
      const next = json.pagination?.next;
      if (!next) break;
      until = String(next);
    }

    const projects = all.map(normalize);

    return new Response(JSON.stringify({ projects }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
