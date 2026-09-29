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
  set(key, value, ttlMs) {
    this.cache.set(key, {
      response: value,
      expiresAt: Date.now() + ttlMs,
    });
  }
  clear() {
    this.cache.clear();
  }
}
export const chatCache = new MemoryCache();
