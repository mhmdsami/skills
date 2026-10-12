import assert from "node:assert/strict";
import test from "node:test";
import { parseSkill } from "./catalog.ts";

test("parseSkill reads the discovery metadata", () => {
  const skill = parseSkill("voice", '---\nname: voice\ndescription: "Draft clear writing."\n---\n\n# Voice\n');
  assert.equal(skill.name, "voice");
  assert.equal(skill.description, "Draft clear writing.");
  assert.deepEqual(skill.tags, []);
  assert.equal(skill.internal, false);
});

test("parseSkill reads inline and comma tag lists", () => {
  assert.deepEqual(parseSkill("a", "---\nname: a\ndescription: x\ntags: [Planning, Review]\n---\n").tags, ["planning", "review"]);
  assert.deepEqual(parseSkill("b", "---\nname: b\ndescription: x\ntags: docs, git\n---\n").tags, ["docs", "git"]);
  assert.deepEqual(parseSkill("c", "---\nname: c\ndescription: x\ntags: plain\n---\n").tags, ["plain"]);
});

test("parseSkill flags internal skills", () => {
  assert.equal(parseSkill("secret", "---\nname: secret\ndescription: x\ninternal: true\n---\n").internal, true);
  assert.equal(parseSkill("public", "---\nname: public\ndescription: x\n---\n").internal, false);
});

test("parseSkill reads an optional credit", () => {
  const withCredit = parseSkill("grilling", "---\nname: grilling\ndescription: x\ncredit: Matt Pocock's grilling\ncredit-url: https://github.com/mattpocock/skills\n---\n");
  assert.deepEqual(withCredit.credit, { label: "Matt Pocock's grilling", url: "https://github.com/mattpocock/skills" });
  assert.equal(parseSkill("plain", "---\nname: plain\ndescription: x\n---\n").credit, undefined);
  assert.deepEqual(parseSkill("nolink", "---\nname: nolink\ndescription: x\ncredit: Someone\n---\n").credit, { label: "Someone", url: undefined });
});
