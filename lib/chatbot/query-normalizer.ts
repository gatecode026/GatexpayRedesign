import { NormalizedQuery } from './types';

const HINGLISH_KEYWORDS = [
  'kya', 'hai', 'kaise', 'hoga', 'chahiye', 'ko', 'se', 'nahi', 'aur', 
  'ke', 'liye', 'karna', 'kab', 'milega', 'ka', 'ki', 'main', 'bhi', 'tha'
];

export function normalizeQuery(query: string): NormalizedQuery {
  const original = query;
  
  // Basic lowercasing and cleaning for matching purposes
  let normalized = query.toLowerCase().trim();
  
  // Replace multiple spaces
  normalized = normalized.replace(/\s+/g, ' ');
  
  // Create tokens (alphanumeric sequences)
  const tokens = normalized
    .replace(/[^\w\s\u0900-\u097F]/g, ' ') // Preserve devanagari characters and alphanumeric tokens
    .split(/\s+/)
    .filter(Boolean);
  
  // Language detection
  let detectedLanguage: 'english' | 'hinglish' | 'hindi' | 'unknown' = 'english';
  
  // 1. Detect Devanagari Unicode Range
  if (/[\u0900-\u097F]/.test(query)) {
    detectedLanguage = 'hindi';
  } else {
    // 2. Check for common Hinglish stopwords/keywords
    const matchesHinglish = tokens.some(token => HINGLISH_KEYWORDS.includes(token));
    if (matchesHinglish) {
      detectedLanguage = 'hinglish';
    } else if (/[a-zA-Z0-9]/.test(query)) {
      detectedLanguage = 'english';
    } else {
      detectedLanguage = 'unknown';
    }
  }

  return {
    original,
    normalized,
    tokens,
    detectedLanguage
  };
}
