import { env } from "@/env";
import type { Recommendation } from "./types.ts";

export type { Recommendation };

export async function listRecommendations(): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = [];
  for (let offset = 0; ; offset += 500) {
    const { results } = await env().DB.prepare(
      "SELECT id, name, description, source FROM recommendations ORDER BY sort, name, id LIMIT ? OFFSET ?"
    )
      .bind(500, offset)
      .all<Recommendation>();
    recommendations.push(...results);
    if (results.length < 500) break;
  }
  return recommendations;
}

export async function putRecommendation(input: { id: string; name: string; description: string; source: string }): Promise<void> {
  await env().DB.prepare(
    "INSERT INTO recommendations (id, name, description, source, sort, updated_at) VALUES (?, ?, ?, ?, 0, ?) ON CONFLICT(id) DO UPDATE SET name = excluded.name, description = excluded.description, source = excluded.source, updated_at = excluded.updated_at"
  )
    .bind(input.id, input.name, input.description, input.source, Date.now())
    .run();
}

export async function deleteRecommendation(id: string): Promise<void> {
  await env().DB.prepare("DELETE FROM recommendations WHERE id = ?").bind(id).run();
}
