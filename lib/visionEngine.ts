const KEYWORD_MAP: Record<string, { genre: string, mood: string }> = {
  'party': { genre: 'pop', mood: 'upbeat' },
  'dance': { genre: 'edm', mood: 'energetic' },
  'club': { genre: 'house', mood: 'thumping' },
  'sad': { genre: 'acoustic', mood: 'melancholic' },
  'rain': { genre: 'lofi', mood: 'chill' },
  'night': { genre: 'jazz', mood: 'smooth' },
  'forest': { genre: 'folk', mood: 'earthy' },
  'ocean': { genre: 'ambient', mood: 'peaceful' },
  'cyber': { genre: 'synthwave', mood: 'futuristic' },
  'neon': { genre: 'retrowave', mood: 'glossy' },
  'rock': { genre: 'rock', mood: 'rebellious' },
  'metal': { genre: 'metal', mood: 'heavy' },
  'dark': { genre: 'industrial', mood: 'dark' },
  'light': { genre: 'classical', mood: 'bright' },
  'happy': { genre: 'pop', mood: 'cheerful' },
  'love': { genre: 'r&b', mood: 'passionate' },
  'epic': { genre: 'orchestral', mood: 'epic' },
  'battle': { genre: 'metal', mood: 'aggressive' },
};

// Bolt Performance Optimization:
// Pre-compute Object.entries to avoid the overhead of `for...in` object
// prototype traversal and repeated allocation overhead on every function call.
const KEYWORD_ENTRIES = Object.entries(KEYWORD_MAP);

export function imageToPrompt(description: string) {
  const desc = description.toLowerCase();
  let bestMatch = { genre: 'ambient', mood: 'cinematic' };
  
  // Find first keyword match
  for (const [key, value] of KEYWORD_ENTRIES) {
    if (desc.includes(key)) {
      bestMatch = value;
      break; // Or could collect multiple and combine? But keep simple for now.
    }
  }

  return {
    genre: bestMatch.genre,
    mood: bestMatch.mood,
    theme: description,
  };
}
