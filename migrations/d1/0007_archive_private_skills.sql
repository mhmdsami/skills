ALTER TABLE private_skills ADD COLUMN archived_at INTEGER;

CREATE INDEX IF NOT EXISTS private_skills_archived_at ON private_skills (archived_at);
