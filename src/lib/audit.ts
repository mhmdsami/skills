import { env } from "@/env";

export type AuditAction = "skill.save" | "skill.delete" | "skill.restore" | "key.create" | "key.revoke" | "key.use" | "rec.save" | "rec.delete";

export async function writeAudit(actor: string, action: AuditAction, target: string): Promise<void> {
  await env().DB.prepare("INSERT INTO audit_log (id, actor, action, target, created_at) VALUES (?, ?, ?, ?, ?)")
    .bind(crypto.randomUUID(), actor, action, target, Date.now())
    .run();
}

export async function readAudit(limit = 40) {
  const { results } = await env().DB.prepare(
    "SELECT id, actor, action, target, created_at AS createdAt FROM audit_log ORDER BY created_at DESC LIMIT ?"
  )
    .bind(limit)
    .all<{ id: string; actor: string; action: string; target: string; createdAt: number }>();
  return results ?? [];
}
