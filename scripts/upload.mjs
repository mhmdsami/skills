#!/usr/bin/env node
// Upload a private skill to skills.sam1.space (R2 + D1). Not stored in the repo.
//
// Usage:
//   SKILLS_TOKEN=... node scripts/upload.mjs <folder|SKILL.md> [--slug name] [--url https://skills.sam1.space]
//
// The folder name (or --slug) becomes the install path: /internal/<slug>
import { readFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { statSync } from "node:fs";

function flag(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  return index !== -1 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

const target = process.argv[2];
if (!target || target.startsWith("--")) {
  console.error("usage: node scripts/upload.mjs <folder|SKILL.md> [--slug name] [--url url]");
  process.exit(1);
}

const token = process.env.SKILLS_TOKEN;
if (!token) {
  console.error("SKILLS_TOKEN is not set");
  process.exit(1);
}

const base = (flag("url", process.env.SKILLS_URL ?? "https://skills.sam1.space")).replace(/\/$/, "");
const isDir = statSync(target).isDirectory();
const file = isDir ? join(target, "SKILL.md") : target;
const slug = flag("slug", isDir ? basename(target) : basename(dirname(file)));
const content = await readFile(file, "utf8");

const response = await fetch(`${base}/api/private`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ slug, content }),
});

const result = await response.json().catch(() => ({}));
if (!response.ok) {
  console.error(result.error ?? `upload failed (${response.status})`);
  process.exit(1);
}

console.log(`uploaded ${slug}`);
console.log(`install: npx skills add ${base}/internal/${slug}`);
