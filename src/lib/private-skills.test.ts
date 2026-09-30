import assert from "node:assert/strict";
import test from "node:test";
import { parseFrontmatter } from "./private-skills.ts";

test("parseFrontmatter reads name, description, and tags", () => {
  const meta = parseFrontmatter("fallback", '---\nname: "With Payload API"\ndescription: Use the Payload API.\ntags: [api, docs]\n---\n\n# Body\n');
  assert.equal(meta.name, "With Payload API");
  assert.equal(meta.description, "Use the Payload API.");
  assert.deepEqual(meta.tags, ["api", "docs"]);
});

test("parseFrontmatter falls back to the slug", () => {
  assert.equal(parseFrontmatter("no-name", "# No frontmatter\n").name, "no-name");
});
