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

const KEYWORDS_REGEX = new RegExp(`(${Object.keys(KEYWORD_MAP).join('|')})`);

export function imageToPrompt(description: string) {
  const desc = description.toLowerCase();
  let bestMatch = { genre: 'ambient', mood: 'cinematic' };
  
  // Find first keyword match
  // Optimization: Replacing O(N) String.includes() loop with a single pre-compiled RegExp match reduces CPU cycles on hot paths.
  const match = desc.match(KEYWORDS_REGEX);
  if (match) {
    bestMatch = KEYWORD_MAP[match[0]];
  }

  return {
    genre: bestMatch.genre,
    mood: bestMatch.mood,
    theme: description,
  };
}
