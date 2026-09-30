import type { Skill } from "./types.ts";
import { publicSkillFiles } from "./public-skills.generated.ts";

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

function parseTags(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((tag) => unquote(tag).trim().toLowerCase())
    .filter(Boolean);
}

export function parseSkill(slug: string, content: string): Skill {
  const fields = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? "";
  const name = unquote(fields.match(/^name:\s*(.+)\s*$/m)?.[1] ?? slug);
  const description = unquote(fields.match(/^description:\s*(.+)\s*$/m)?.[1] ?? "");
  const tags = parseTags(fields.match(/^tags:\s*(.+)\s*$/m)?.[1]);
  const internal = /^internal:\s*true\s*$/m.test(fields);
  return { slug, name, description, tags, internal };
}

export async function listSkills(): Promise<Skill[]> {
  return Object.entries(publicSkillFiles)
    .map(([slug, content]) => parseSkill(slug, content))
    .sort((a, b) => a.name.localeCompare(b.name));
}
