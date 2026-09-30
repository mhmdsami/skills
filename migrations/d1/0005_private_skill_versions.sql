CREATE TABLE IF NOT EXISTS private_skill_versions (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS private_skill_versions_slug_idx
  ON private_skill_versions (slug, created_at);
