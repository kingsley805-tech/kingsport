export interface VercelProjectDTO {
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

export type SortOption = "newest" | "oldest" | "updated" | "alpha";
