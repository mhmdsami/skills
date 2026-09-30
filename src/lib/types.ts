export type Skill = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  internal: boolean;
};

export type Recommendation = {
  id: string;
  name: string;
  description: string;
  source: string;
};

export type AccessKeyStatus = "active" | "expired" | "revoked";

export type AccessKeyView = {
  id: string;
  name: string;
  slugs: string[];
  expiresAt: number | null;
  status: AccessKeyStatus;
  lastUsedAt: number | null;
};

export type CatalogPageProps = { skills: Skill[]; recommendations: Recommendation[] };
