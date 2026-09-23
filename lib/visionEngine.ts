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

// Optimization: Pre-compile keyword regex to avoid O(N) loop on every call.
const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const KEYWORD_REGEX = new RegExp(
  `(${Object.keys(KEYWORD_MAP).map(escapeRegExp).join('|')})`,
  'i'
);

export function imageToPrompt(description: string) {
  // Optimization: O(1) style lookup using pre-compiled regex instead of O(N) iterative string search
  const match = description.match(KEYWORD_REGEX);
  
  const bestMatch = match ? KEYWORD_MAP[match[1].toLowerCase()] : { genre: 'ambient', mood: 'cinematic' };

  return {
    genre: bestMatch.genre,
    mood: bestMatch.mood,
    theme: description,
  };
}
