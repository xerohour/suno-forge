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

// Optimization: Pre-compile keyword match to avoid O(N) array iteration on every request.
const KEYWORD_REGEX = new RegExp(Object.keys(KEYWORD_MAP).join('|'), 'i');

export function imageToPrompt(description: string) {
  let bestMatch = { genre: 'ambient', mood: 'cinematic' };
  
  const match = description.match(KEYWORD_REGEX);
  if (match) {
    const key = match[0].toLowerCase();
    if (KEYWORD_MAP[key]) {
      bestMatch = KEYWORD_MAP[key];
    }
  }

  return {
    genre: bestMatch.genre,
    mood: bestMatch.mood,
    theme: description,
  };
}
