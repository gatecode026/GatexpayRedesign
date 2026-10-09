import { CHATBOT_CONFIG } from "./config";

class MemoryCache {
  cache = new Map();

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.response;
  }

  set(key, value, ttlMs = 5 * 60 * 1000) {
    this.cache.set(key, {
      response: value,
      expiresAt: Date.now() + ttlMs,
    });
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }
}

export function buildChatCacheKey({
  normalizedQuery,
  intent,
  activeProduct,
  detectedLanguage,
}) {
  const norm = normalizedQuery?.normalized || "";
  const int = intent || "unclear";
  const prod = activeProduct || "global";
  const lang = detectedLanguage || "en";
  const version = CHATBOT_CONFIG.version || "2.1.0";

  // Prevent caching queries with pronouns if context is ambiguous
  if (normalizedQuery?.hasPronounRef && !activeProduct) {
    return null;
  }

  return `kb_${version}:${lang}:${int}:${prod}:${norm}`;
}

export const chatCache = new MemoryCache();
