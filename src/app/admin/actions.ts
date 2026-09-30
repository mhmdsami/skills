"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireViewer } from "@/lib/session";
import { deletePrivateSkill, getVersionContent, parseFrontmatter, putPrivateSkill } from "@/lib/private-skills";
import { deleteRecommendation, putRecommendation } from "@/lib/recommendations";
import { createKey, revokeKey } from "@/lib/access-keys";
import { writeAudit } from "@/lib/audit";
import { validSlug } from "@/lib/token";
import { env } from "@/env";

function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function revalidate() {
  revalidatePath("/");
  revalidatePath("/admin");
}

const maxContentLength = 200_000;

export async function savePrivateSkillAction(formData: FormData) {
  const viewer = await requireViewer();
  const content = String(formData.get("content") ?? "");
  const existing = String(formData.get("slug") ?? "").trim();
  const slug = existing || slugify(parseFrontmatter("", content).name);

  if (!validSlug(slug)) redirect("/admin/skills/new?error=name");
  if (!content.trim()) redirect(`/admin/skills/${slug}?error=empty`);
  if (content.length > maxContentLength) redirect(`/admin/skills/${slug}?error=size`);

  await putPrivateSkill(env(), slug, content, viewer.email);
  await writeAudit(viewer.email, "skill.save", slug);
  revalidate();
  redirect(`/admin/skills/${slug}?ok=saved`);
}

export async function restorePrivateSkillAction(formData: FormData) {
  const viewer = await requireViewer();
  const slug = String(formData.get("slug") ?? "");
  const id = String(formData.get("id") ?? "");
  if (!validSlug(slug) || !id) redirect("/admin");

  const content = await getVersionContent(env(), slug, id);
  if (!content) redirect(`/admin/skills/${slug}?error=missing`);

  await putPrivateSkill(env(), slug, content, viewer.email);
  await writeAudit(viewer.email, "skill.restore", slug);
  revalidate();
  redirect(`/admin/skills/${slug}?ok=restored`);
}

export async function deletePrivateSkillAction(formData: FormData) {
  const viewer = await requireViewer();
  const slug = String(formData.get("slug") ?? "");
  if (validSlug(slug)) {
    await deletePrivateSkill(env(), slug);
    await writeAudit(viewer.email, "skill.delete", slug);
  }
  revalidate();
  redirect("/admin?ok=deleted");
}

export type KeyFormState = { token?: string; error?: string };

export async function createKeyAction(_prev: KeyFormState, formData: FormData): Promise<KeyFormState> {
  const viewer = await requireViewer();
  const name = String(formData.get("name") ?? "").trim();

  const selections = formData.getAll("slugs").map((part) => String(part).trim());
  const allSkills = selections.includes("*") || selections.length === 0;
  const slugs = allSkills ? [] : selections.filter(Boolean);
  if (!allSkills && selections.some((slug) => slug && !validSlug(slug))) return { error: "Scopes must be lowercase and hyphenated." };
  if (!name) return { error: "Name is required." };

  const expiresOn = String(formData.get("expiresOn") ?? "").trim();
  let expiresAt: number | null = null;
  if (expiresOn) {
    const parsed = new Date(`${expiresOn}T23:59:59Z`).getTime();
    if (Number.isNaN(parsed) || parsed < Date.now()) return { error: "Expiry must be a future date." };
    expiresAt = parsed;
  }

  const token = await createKey(name, slugs, expiresAt);
  await writeAudit(viewer.email, "key.create", name);
  revalidate();
  return { token };
}

export async function revokeKeyAction(formData: FormData) {
  const viewer = await requireViewer();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await revokeKey(id);
    await writeAudit(viewer.email, "key.revoke", id.slice(0, 8));
  }
  revalidate();
  redirect("/admin/keys");
}

export async function saveRecommendationAction(formData: FormData) {
  const viewer = await requireViewer();
  const name = String(formData.get("name") ?? "").trim();
  const source = String(formData.get("source") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const id = String(formData.get("id") ?? "").trim() || slugify(name);

  if (!id || !name || !source) redirect("/admin?error=recommendation");

  await putRecommendation({ id, name, description, source });
  await writeAudit(viewer.email, "rec.save", id);
  revalidate();
  redirect("/admin?ok=recommendation");
}

export async function deleteRecommendationAction(formData: FormData) {
  const viewer = await requireViewer();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await deleteRecommendation(id);
    await writeAudit(viewer.email, "rec.delete", id);
  }
  revalidate();
  redirect("/admin?ok=deleted");
}
