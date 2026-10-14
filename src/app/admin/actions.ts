"use server";

import { revalidatePath } from "next/cache";
import { requireViewer, type Viewer } from "@/lib/session";
import { deletePrivateSkill, getVersionContent, parseFrontmatter, putPrivateSkill } from "@/lib/private-skills";
import { deleteRecommendation, putRecommendation } from "@/lib/recommendations";
import { createKey, revokeKey } from "@/lib/access-keys";
import { writeAudit } from "@/lib/audit";
import { validSlug } from "@/lib/token";
import { parseKeyExpiry } from "@/lib/key-expiry";
import type { FormState } from "@/lib/form-state";
import { env } from "@/env";

function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function mutate(operation: (viewer: Viewer) => Promise<FormState>): Promise<FormState> {
  try {
    const result = await operation(await requireViewer());
    if (result.success) {
      revalidatePath("/");
      revalidatePath("/admin", "layout");
    }
    return result;
  } catch {
    return { error: "Could not complete the request. Refresh to check the result and your session before trying again." };
  }
}

export async function savePrivateSkillAction(formData: FormData): Promise<FormState> {
  return mutate(async (viewer) => {
    const content = String(formData.get("content") ?? "");
    const existing = String(formData.get("slug") ?? "").trim();
    const slug = existing || slugify(parseFrontmatter("", content).name);
    if (!validSlug(slug)) return { error: "Add a valid name to the skill's frontmatter." };
    if (!content.trim()) return { error: "Skill content cannot be empty." };
    if (content.length > 200_000) return { error: "Skill content must be at most 200,000 characters." };
    await putPrivateSkill(env(), slug, content, viewer.email);
    await writeAudit(viewer.email, "skill.save", slug);
    return { success: true, message: "Skill saved.", ...(!existing ? { redirectTo: `/admin/skills/${slug}` } : {}) };
  });
}

export async function restorePrivateSkillAction(formData: FormData): Promise<FormState> {
  return mutate(async (viewer) => {
    const slug = String(formData.get("slug") ?? "");
    const id = String(formData.get("id") ?? "");
    if (!validSlug(slug) || !id) return { error: "This version is invalid." };
    const content = await getVersionContent(env(), slug, id);
    if (content === null) return { error: "This version is no longer available." };
    await putPrivateSkill(env(), slug, content, viewer.email);
    await writeAudit(viewer.email, "skill.restore", slug);
    return { success: true, message: "Version restored." };
  });
}

export async function deletePrivateSkillAction(formData: FormData): Promise<FormState> {
  return mutate(async (viewer) => {
    const slug = String(formData.get("slug") ?? "");
    if (!validSlug(slug)) return { error: "This skill is invalid." };
    await deletePrivateSkill(env(), slug);
    await writeAudit(viewer.email, "skill.delete", slug);
    return { success: true, message: "Skill deleted." };
  });
}

export async function createKeyAction(formData: FormData): Promise<FormState> {
  return mutate(async (viewer) => {
    const name = String(formData.get("name") ?? "").trim();
    const selections = formData.getAll("slugs").map((part) => String(part).trim());
    const allSkills = selections.includes("*") || selections.length === 0;
    const slugs = allSkills ? [] : [...new Set(selections.filter(Boolean))];
    if (!allSkills && selections.some((slug) => slug && !validSlug(slug))) return { error: "Scopes must be lowercase and hyphenated." };
    if (!name) return { error: "Name is required." };
    const expiry = parseKeyExpiry(String(formData.get("ttl") ?? "30"), String(formData.get("expiresOn") ?? ""));
    if (expiry.error) return { error: expiry.error };
    const token = await createKey(name, slugs, expiry.expiresAt);
    await writeAudit(viewer.email, "key.create", name);
    return { success: true, token, message: "Access key created. Copy it before closing." };
  });
}

export async function revokeKeyAction(formData: FormData): Promise<FormState> {
  return mutate(async (viewer) => {
    const id = String(formData.get("id") ?? "").trim();
    if (!id) return { error: "This key is invalid." };
    await revokeKey(id);
    await writeAudit(viewer.email, "key.revoke", id.slice(0, 8));
    return { success: true, message: "Access key revoked." };
  });
}

export async function saveRecommendationAction(formData: FormData): Promise<FormState> {
  return mutate(async (viewer) => {
    const name = String(formData.get("name") ?? "").trim();
    const source = String(formData.get("source") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const id = String(formData.get("id") ?? "").trim() || slugify(name);
    if (!id || !name || !source) return { error: "Name and source are required." };
    await putRecommendation({ id, name, description, source });
    await writeAudit(viewer.email, "rec.save", id);
    return { success: true, message: "Recommendation saved." };
  });
}

export async function deleteRecommendationAction(formData: FormData): Promise<FormState> {
  return mutate(async (viewer) => {
    const id = String(formData.get("id") ?? "").trim();
    if (!id) return { error: "This recommendation is invalid." };
    await deleteRecommendation(id);
    await writeAudit(viewer.email, "rec.delete", id);
    return { success: true, message: "Recommendation deleted." };
  });
}
