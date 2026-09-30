import type { Env } from "@/env";

const key = (slug: string) => `skills/${slug}/SKILL.md`;
const versionKey = (slug: string, id: string) => `skills/${slug}/versions/${id}.md`;
const markdown = { httpMetadata: { contentType: "text/markdown; charset=utf-8" } };

export type PrivateSkillMeta = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  updatedAt?: number;
};

export type PrivateSkillVersion = {
  id: string;
  slug: string;
  author: string;
  createdAt: number;
};

function unquote(value: string): string {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  return trimmed;
}

export function parseFrontmatter(slug: string, content: string): PrivateSkillMeta {
  const fields = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? "";
  const name = unquote(fields.match(/^name:\s*(.+)\s*$/m)?.[1] ?? slug);
  const description = unquote(fields.match(/^description:\s*(.+)\s*$/m)?.[1] ?? "");
  const rawTags = (fields.match(/^tags:\s*(.+)\s*$/m)?.[1] ?? "").replace(/^\[/, "").replace(/\]$/, "");
  const tags = rawTags.split(",").map((tag) => unquote(tag).toLowerCase()).filter(Boolean);
  return { slug, name, description, tags };
}

export async function putPrivateSkill(e: Env, slug: string, content: string, author = ""): Promise<PrivateSkillMeta> {
  const meta = parseFrontmatter(slug, content);
  const id = crypto.randomUUID();
  await Promise.all([
    e.BUCKET.put(key(slug), content, markdown),
    e.BUCKET.put(versionKey(slug, id), content, markdown),
  ]);
  await Promise.all([
    e.DB.prepare(
      "INSERT INTO private_skills (slug, name, description, tags, updated_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(slug) DO UPDATE SET name = excluded.name, description = excluded.description, tags = excluded.tags, updated_at = excluded.updated_at"
    )
      .bind(slug, meta.name, meta.description, meta.tags.join(","), Date.now())
      .run(),
    e.DB.prepare("INSERT INTO private_skill_versions (id, slug, author, created_at) VALUES (?, ?, ?, ?)")
      .bind(id, slug, author, Date.now())
      .run(),
  ]);
  return meta;
}

export async function getPrivateSkill(e: Env, slug: string): Promise<string | null> {
  const object = await e.BUCKET.get(key(slug));
  if (!object) return null;
  return object.text();
}

export async function listVersions(e: Env, slug: string): Promise<PrivateSkillVersion[]> {
  const { results } = await e.DB.prepare(
    "SELECT id, slug, author, created_at AS createdAt FROM private_skill_versions WHERE slug = ? ORDER BY created_at DESC"
  )
    .bind(slug)
    .all<PrivateSkillVersion>();
  return results ?? [];
}

export async function getVersionContent(e: Env, slug: string, id: string): Promise<string | null> {
  const object = await e.BUCKET.get(versionKey(slug, id));
  return object ? object.text() : null;
}

export async function deletePrivateSkill(e: Env, slug: string): Promise<void> {
  const { results } = await e.DB.prepare("SELECT id FROM private_skill_versions WHERE slug = ?")
    .bind(slug)
    .all<{ id: string }>();
  await Promise.all((results ?? []).map((version) => e.BUCKET.delete(versionKey(slug, version.id))));
  await e.BUCKET.delete(key(slug));
  await Promise.all([
    e.DB.prepare("DELETE FROM private_skills WHERE slug = ?").bind(slug).run(),
    e.DB.prepare("DELETE FROM private_skill_versions WHERE slug = ?").bind(slug).run(),
  ]);
}

export async function listPrivateSkills(e: Env): Promise<PrivateSkillMeta[]> {
  const rows = await e.DB.prepare("SELECT slug, name, description, tags, updated_at FROM private_skills ORDER BY name").all<{
    slug: string;
    name: string;
    description: string;
    tags: string;
    updated_at: number;
  }>();
  return rows.results.map((row) => ({
    slug: row.slug,
    name: row.name,
    description: row.description,
    tags: row.tags ? row.tags.split(",").filter(Boolean) : [],
    updatedAt: row.updated_at,
  }));
}
