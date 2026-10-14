export function parseKeyExpiry(ttl: string, date: string, now = Date.now()): { expiresAt: number | null; error?: string } {
  if (ttl === "0") return { expiresAt: null };
  if (["7", "30", "90"].includes(ttl)) return { expiresAt: now + Number(ttl) * 86_400_000 };
  if (ttl !== "expires" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { expiresAt: null, error: "Choose a valid expiry." };
  }
  const expiresAt = new Date(`${date}T23:59:59.999Z`).getTime();
  if (!Number.isFinite(expiresAt) || new Date(expiresAt).toISOString().slice(0, 10) !== date || expiresAt <= now) {
    return { expiresAt: null, error: "Expiry must be a valid future date." };
  }
  return { expiresAt };
}
