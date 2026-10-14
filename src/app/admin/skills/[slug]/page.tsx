import Link from "next/link";
import { env } from "@/env";
import { getPrivateSkill, listVersions } from "@/lib/private-skills";
import { SkillEditor } from "./skill-editor";

export const dynamic = "force-dynamic";

export default async function PrivateSkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isNew = slug === "new";
  const content = isNew ? "" : await getPrivateSkill(env(), slug);
  if (content === null) return <p className="text-[13px] text-muted">Skill not found. <Link href="/admin" className="row-action">Back to skills</Link></p>;
  const versions = isNew ? [] : await listVersions(env(), slug);
  // A restored version remounts the editor so its draft reflects the restored content.
  return <SkillEditor key={`${slug}:${versions[0]?.id ?? "new"}`} slug={slug} initialContent={content} versions={versions} />;
}
