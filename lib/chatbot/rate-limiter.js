class RateLimiter {
  requests = new Map();
  limit = 15; // 15 requests per minute
  windowMs = 60 * 1000;
  isRateLimited(ip) {
    const now = Date.now();
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
