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

// Optimization: Pre-compile a single regex matching all keywords to avoid O(K*N) sequential string scanning.
const KEYWORD_REGEX = new RegExp(Object.keys(KEYWORD_MAP).join('|'), 'i');

export function imageToPrompt(description: string) {
  const match = KEYWORD_REGEX.exec(description);
  let bestMatch = { genre: 'ambient', mood: 'cinematic' };
  
  if (match) {
    bestMatch = KEYWORD_MAP[match[0].toLowerCase()];
  }

  return {
    genre: bestMatch.genre,
    mood: bestMatch.mood,
    theme: description,
  };
}
