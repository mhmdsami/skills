CREATE TABLE IF NOT EXISTS private_skills (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  tags TEXT NOT NULL DEFAULT '',
  updated_at INTEGER NOT NULL
);
