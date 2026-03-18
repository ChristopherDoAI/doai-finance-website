interface RateLimitEntry {
  tokens: number;
  lastRefill: number;
}

const store = new Map<string, RateLimitEntry>();

const MAX_TOKENS = 10;
const REFILL_RATE = 1;
const REFILL_INTERVAL = 1000;

export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  let entry = store.get(identifier);

  if (!entry) {
    entry = { tokens: MAX_TOKENS - 1, lastRefill: now };
    store.set(identifier, entry);
    return { allowed: true, remaining: entry.tokens };
  }

  const elapsed = now - entry.lastRefill;
  const refill = Math.floor(elapsed / REFILL_INTERVAL) * REFILL_RATE;
  entry.tokens = Math.min(MAX_TOKENS, entry.tokens + refill);
  entry.lastRefill = now;

  if (entry.tokens <= 0) {
    return { allowed: false, remaining: 0 };
  }

  entry.tokens -= 1;
  return { allowed: true, remaining: entry.tokens };
}
