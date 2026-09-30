import { env } from "@/env";
import type { AccessKeyStatus, AccessKeyView } from "./types.ts";

const TOKEN_PREFIX = "sk_";

function hash(token: string): Promise<string> {
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(token)).then((digest) => {
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  });
}

function rows<T>(query: { results?: T[] }): T[] {
  return query.results ?? [];
}

/** Constant-time enough: both sides are fixed-length hex digests of a high-entropy token. */
function digestEqual(a: string, b: string): boolean {
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function statusOf(expiresAt: number | null, revokedAt: number | null): AccessKeyStatus {
  if (revokedAt) return "revoked";
  if (expiresAt && expiresAt <= Date.now()) return "expired";
  return "active";
}

async function findKey(token: string) {
  return env().DB.prepare(
    "SELECT id, slugs, expires_at AS expiresAt, revoked_at AS revokedAt FROM access_keys WHERE hash = ?"
  )
    .bind(await hash(token))
    .first<{ id: string; slugs: string; expiresAt: number | null; revokedAt: number | null }>()
    .then((row) => {
      if (!row) return null;
      if (statusOf(row.expiresAt ?? null, row.revokedAt ?? null) !== "active") return null;
      return row;
    });
}

function tokenFromRequest(request: Request): string {
  const header = request.headers.get("authorization") ?? "";
  const urlToken = new URL(request.url).searchParams.get("key");
  if (urlToken) return urlToken;
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
}

/** Returns the key id when the request carries a valid, unrevoked, unexpired key for the slug. */
export async function authorizeSlug(request: Request, slug: string): Promise<string | null> {
  const token = tokenFromRequest(request);
  if (!token) return null;
  const grant = await findKey(token);
  if (!grant) return null;
  if (grant.slugs !== "*" && !grant.slugs.split(",").includes(slug)) return null;
  await env().DB.prepare("UPDATE access_keys SET last_used_at = ? WHERE id = ?").bind(Date.now(), grant.id).run();
  return grant.id;
}

export async function createKey(name: string, slugs: string[], expiresAt: number | null): Promise<string> {
  const token = `${TOKEN_PREFIX}${crypto.randomUUID()}${crypto.randomUUID()}`;
  const id = crypto.randomUUID();
  await env().DB.prepare("INSERT INTO access_keys (id, name, hash, slugs, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(id, name, await hash(token), slugs.length ? slugs.join(",") : "*", Date.now(), expiresAt)
    .run();
  return token;
}

export async function listKeys(): Promise<AccessKeyView[]> {
  const stored = rows(
    await env().DB.prepare(
      "SELECT id, name, slugs, expires_at AS expiresAt, revoked_at AS revokedAt, last_used_at AS lastUsedAt FROM access_keys ORDER BY created_at DESC"
    ).all<{
      id: string;
      name: string;
      slugs: string;
      expiresAt: number | null;
      revokedAt: number | null;
      lastUsedAt: number | null;
    }>()
  );
  return stored.map((row) => ({
    id: row.id,
    name: row.name,
    slugs: row.slugs === "*" ? [] : row.slugs.split(",").filter(Boolean),
    expiresAt: row.expiresAt,
    status: statusOf(row.expiresAt, row.revokedAt),
    lastUsedAt: row.lastUsedAt,
  }));
}

export async function revokeKey(id: string): Promise<void> {
  await env().DB.prepare("UPDATE access_keys SET revoked_at = ? WHERE id = ? AND revoked_at IS NULL").bind(Date.now(), id).run();
}
