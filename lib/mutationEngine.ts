import { MutationType } from "@/types/prompt";

const VIRAL_ELEMENTS = "short, repetitive, catchy hook, high recall, earworm melody";
const EMOTIONAL_ELEMENTS = "deep, vulnerable, expressive lyrics, heartfelt delivery, emotional resonance";
const ENERGY_ELEMENTS = "fast tempo, aggressive delivery, high energy, intense, driving rhythm";
const FUSION_ELEMENTS = "genre fusion, experimental blend, cross-genre elements";

// Regex constants
const VOCAL_REGEX = /\b(vocal|vocals|singing|lyrics|voice|sung)\b[^,]*/gi;
const COMMA_CLEANUP_REGEX = /,\s*,+/g;
const TRAILING_COMMA_REGEX = /^,\s*|\s*,$/g;
// Tempo regex without global flag to match first occurrence for extraction/replacement
const TEMPO_REGEX = /(\d+)\s*BPM/i;
// Tempo replacement regex (same as above but can be separate if needed)
const TEMPO_REPLACE_REGEX = /\d+\s*BPM/i;

const MOOD_MAP: Record<string, string> = {
  'happy': 'melancholic',
  'sad': 'uplifting',
  'dark': 'bright',
  'light': 'dark',
  'uplifting': 'somber',
  'melancholic': 'joyful',
  'energetic': 'calm',
  'calm': 'energetic',
  'aggressive': 'gentle',
  'gentle': 'intense',
};

// Create a regex that matches any key in MOOD_MAP as a whole word, case-insensitive
// Pre-computed to avoid recreation on every call
const MOOD_REGEX = new RegExp(`\\b(${Object.keys(MOOD_MAP).join('|')})\\b`, 'gi');

const MUTATION_HANDLERS: Record<MutationType, (p: string) => string> = {
  viral: (p) => `${p}, ${VIRAL_ELEMENTS}`,

  emotional: (p) => `${p}, ${EMOTIONAL_ELEMENTS}`,

  energy: (p) => `${p}, ${ENERGY_ELEMENTS}`,

  instrumental: (p) => {
    // Convert to instrumental by removing vocal references
    let result = p.replace(VOCAL_REGEX, '');
    // Clean up multiple commas and extra spaces
    result = result.replace(COMMA_CLEANUP_REGEX, ',').replace(TRAILING_COMMA_REGEX, '').trim();
    return `${result}, instrumental only, no vocals`;
  },

  'tempo-shift-up': (p) => {
    // Increase tempo references
    const tempoMatch = p.match(TEMPO_REGEX);
    if (tempoMatch) {
      const currentTempo = parseInt(tempoMatch[1]);
      const newTempo = Math.min(currentTempo + 20, 200);
      return p.replace(TEMPO_REPLACE_REGEX, `${newTempo} BPM`);
    }
    return `${p}, uptempo, faster pace`;
  },

  'tempo-shift-down': (p) => {
    // Decrease tempo references
    const tempoMatch = p.match(TEMPO_REGEX);
    if (tempoMatch) {
      const currentTempo = parseInt(tempoMatch[1]);
      const newTempo = Math.max(currentTempo - 20, 40);
      return p.replace(TEMPO_REPLACE_REGEX, `${newTempo} BPM`);
    }
    return `${p}, downtempo, slower pace`;
  },

  'mood-invert': (p) => {
    // Invert mood descriptors using a single pass regex replacement
    // This is O(N) instead of O(M*N) where M is map size
    return p.replace(MOOD_REGEX, (match) => {
      const lowerMatch = match.toLowerCase();
      return MOOD_MAP[lowerMatch] || match;
    });
  },

  'genre-blend': (p) => `${p}, ${FUSION_ELEMENTS}`,
};

/**
 * Applies a mutation to a prompt string, transforming it based on the mutation type.
 * Mutations can alter mood, tempo, instrumentation, or overall character of the prompt.
 */
export function mutatePrompt(prompt: string, type: MutationType): string {
  const mutationFn = MUTATION_HANDLERS[type];
  if (!mutationFn) {
    throw new Error(`Unknown mutation type: ${type}`);
  }

  return mutationFn(prompt);
}
