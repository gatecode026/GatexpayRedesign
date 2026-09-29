interface CacheEntry {
  response: any;
  expiresAt: number;
}

class MemoryCache {
  private cache = new Map<string, CacheEntry>();

  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.response;
  }

  set(key: string, value: any, ttlMs: number): void {
    this.cache.set(key, {
      response: value,
      expiresAt: Date.now() + ttlMs,
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

export const chatCache = new MemoryCache();
