INSERT OR IGNORE INTO recommendations (id, name, description, source, sort, updated_at) VALUES
  ('ax', 'ax', 'Fetch URLs and extract structured data from pages.', 'yusukebe/ax', 0, 0),
  ('agent-browser', 'agent-browser', 'Drive a real browser from the command line.', 'vercel-labs/agent-browser', 1, 0),
  ('gh-stack', 'gh-stack', 'Manage stacked pull requests.', 'github/gh-stack', 2, 0),
  ('unslop', 'unslop', 'Remove AI tells from writing.', 'cursor/plugins', 3, 0),
  ('grilling', 'grilling', 'Stress-test a plan with structured questions.', 'mattpocock/skills', 4, 0),
  ('domain-modeling', 'domain-modeling', 'Sharpen a project''s domain language.', 'mattpocock/skills', 5, 0),
  ('find-skills', 'find-skills', 'Discover installable skills.', 'vercel-labs/skills', 6, 0);
