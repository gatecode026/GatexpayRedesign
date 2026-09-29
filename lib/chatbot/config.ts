export const CHATBOT_CONFIG = {
  // Provider configuration
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: 'gemini-2.0-flash',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
  },
  groq: {
    apiKey: process.env.GROQ_API_KEY || '',
    model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
  },
  openrouter: {
    apiKey: process.env.OPENROUTER_API_KEY || '',
    model: process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-exp:free',
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
  },
  azure: {
    apiKey: process.env.AZURE_OPENAI_API_KEY || '',
    endpoint: process.env.AZURE_OPENAI_ENDPOINT || '',
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o',
  },
  
  // Timeout settings
  requestTimeoutMs: 8000, // 8 seconds (default limit)
  
  // RAG settings
  retrieval: {
    thresholdStrong: 0.75,
    thresholdMedium: 0.5,
    maxItems: 3, // Capped at top 2-3 verified entries
  },
  
  // General limits
  limits: {
    maxMessageLength: 1000,
    maxHistoryLength: 4, // capped at 4 messages per conversation history request
  }
};
