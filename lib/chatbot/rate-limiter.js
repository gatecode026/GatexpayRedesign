class RateLimiter {
  requests = new Map();
  limit = 30; // 30 requests per minute
  windowMs = 60 * 1000;

  reset() {
    this.requests.clear();
  }

  cleanup(now) {
    if (this.requests.size < 200) return;
    for (const [key, timestamps] of this.requests.entries()) {
      const valid = timestamps.filter((t) => now - t < this.windowMs);
      if (valid.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, valid);
      }
    }
  }

  isRateLimited(ip) {
    const now = Date.now();
    this.cleanup(now);

    const timestamps = this.requests.get(ip) || [];
    // Filter timestamps within the window
    const activeTimestamps = timestamps.filter((t) => now - t < this.windowMs);
    if (activeTimestamps.length >= this.limit) {
      return true;
    }
    activeTimestamps.push(now);
    this.requests.set(ip, activeTimestamps);
    return false;
  }
}
export const chatRateLimiter = new RateLimiter();
