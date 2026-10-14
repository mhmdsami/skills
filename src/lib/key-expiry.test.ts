import assert from "node:assert/strict";
import test from "node:test";
import { parseKeyExpiry } from "./key-expiry.ts";

const now = Date.parse("2026-10-14T12:00:00Z");

test("relative expiry choices expire after the selected number of days", () => {
  for (const days of [7, 30, 90]) {
    assert.deepEqual(parseKeyExpiry(String(days), "", now), { expiresAt: now + days * 86_400_000 });
  }
});

test("only the explicit no-expiry choice creates a permanent key", () => {
  assert.deepEqual(parseKeyExpiry("0", "", now), { expiresAt: null });
  for (const choice of ["", "invalid", "-1", "31"]) assert.ok(parseKeyExpiry(choice, "", now).error);
});

test("custom expiry uses the end of the chosen UTC day", () => {
  assert.deepEqual(parseKeyExpiry("expires", "2026-10-15", now), { expiresAt: Date.parse("2026-10-15T23:59:59.999Z") });
});

test("custom expiry rejects missing, impossible, malformed, and past dates", () => {
  for (const date of ["", "2026-02-30", "2026-13-01", "2026-10-13", "2026-1-1", "invalid"]) {
    assert.ok(parseKeyExpiry("expires", date, now).error, date);
  }
});
