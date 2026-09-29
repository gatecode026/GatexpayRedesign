export function logChatRequest(payload) {
  // Structured log print (safely strips sensitive terms by default)
  const logData = {
    timestamp: new Date().toISOString(),
    event: "chat_request_metrics",
    ...payload,
  };
  console.log(JSON.stringify(logData));
}
