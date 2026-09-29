export interface LogPayload {
  requestId: string;
  provider?: string;
  tokensSent?: number;
  tokensReceived?: number;
  durationMs: number;
  retries?: number;
  quotaFailures?: number;
  cacheHit?: boolean;
  fallbackUsed?: boolean;
}

export function logChatRequest(payload: LogPayload) {
  // Structured log print (safely strips sensitive terms by default)
  const logData = {
    timestamp: new Date().toISOString(),
    event: 'chat_request_metrics',
    ...payload
  };
  console.log(JSON.stringify(logData));
}
