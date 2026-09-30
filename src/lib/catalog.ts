import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { Skill } from "./types.ts";

const skillsDir = path.join(process.cwd(), "skills");

function unquote(value: string): string {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    try {
      return JSON.parse(value);
    } catch {
      return value.slice(1, -1);
    }
  }
  return value;
}

function parseTags(raw: string | undefined): string[] {
  if (!raw) return [];
  const inner = raw.replace(/^\[/, "").replace(/\]$/, "");
  return inner
    .split(",")
    .map((tag) => unquote(tag.trim()).trim().toLowerCase())
    .filter(Boolean);
}

export function parseSkill(slug: string, content: string): Skill {
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  const fields = frontmatter?.[1] ?? "";
  const name = unquote(fields.match(/^name:\s*(.+)\s*$/m)?.[1]?.trim() ?? slug);
  const description = unquote(fields.match(/^description:\s*(.+)\s*$/m)?.[1]?.trim() ?? "");
  const tags = parseTags(fields.match(/^tags:\s*(.+)\s*$/m)?.[1]?.trim());
  const internal = /^internal:\s*true\s*$/m.test(fields);
  return { slug, name, description, tags, internal };
}

export async function listSkills(): Promise<Skill[]> {
  let entries;
  try {
    entries = await readdir(skillsDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const skills = await Promise.all(entries.filter((entry) => entry.isDirectory()).map(async (entry) => {
    const filePath = path.join(skillsDir, entry.name, "SKILL.md");
    try {
      return parseSkill(entry.name, await readFile(filePath, "utf8"));
    } catch {
      return null;
    }
  }));

  return skills.filter((skill): skill is Skill => skill !== null).sort((a, b) => a.name.localeCompare(b.name));
}
