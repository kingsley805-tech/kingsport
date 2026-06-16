import { supabase } from "@/integrations/supabase/client";
import type { VercelProjectDTO } from "@/types/vercel";

export async function fetchVercelProjects(): Promise<VercelProjectDTO[]> {
  const { data, error } = await supabase.functions.invoke("vercel-projects");
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return (data?.projects ?? []) as VercelProjectDTO[];
}
