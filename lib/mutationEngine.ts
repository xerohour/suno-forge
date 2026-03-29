import { MutationType } from "@/types/prompt";

const VIRAL_ELEMENTS = "short, repetitive, catchy hook, high recall, earworm melody";
const EMOTIONAL_ELEMENTS = "deep, vulnerable, expressive lyrics, heartfelt delivery, emotional resonance";
const ENERGY_ELEMENTS = "fast tempo, aggressive delivery, high energy, intense, driving rhythm";
const FUSION_ELEMENTS = "genre fusion, experimental blend, cross-genre elements";

// Pre-compiled regexes
const VOCAL_REGEX = /\b(vocal|vocals|singing|lyrics|voice|sung)\b[^,]*/gi;
const CLEANUP_COMMA_REGEX = /,\s*,+/g;
const CLEANUP_TRIM_REGEX = /^,\s*|\s*,$/g;
const TEMPO_REGEX = /(\d+)\s*BPM/i;
const BPM_REPLACE_REGEX = /\d+\s*BPM/i;

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

// Create a regex that matches any of the mood keys
const MOOD_REGEX = new RegExp(`\\b(${Object.keys(MOOD_MAP).join('|')})\\b`, 'gi');

const MUTATION_HANDLERS: Record<MutationType, (p: string) => string> = {
  viral: (p) => {
    return `${p}, ${VIRAL_ELEMENTS}`;
  },

  emotional: (p) => {
    return `${p}, ${EMOTIONAL_ELEMENTS}`;
  },

  energy: (p) => {
    return `${p}, ${ENERGY_ELEMENTS}`;
  },

  instrumental: (p) => {
    // Convert to instrumental by removing vocal references
    let result = p.replace(VOCAL_REGEX, '');
    // Clean up multiple commas and extra spaces
    result = result.replace(CLEANUP_COMMA_REGEX, ',').replace(CLEANUP_TRIM_REGEX, '').trim();
    return `${result}, instrumental only, no vocals`;
  },

  'tempo-shift-up': (p) => {
    // Increase tempo references
    const tempoMatch = p.match(TEMPO_REGEX);
    if (tempoMatch) {
      const currentTempo = parseInt(tempoMatch[1]);
      const newTempo = Math.min(currentTempo + 20, 200);
      return p.replace(BPM_REPLACE_REGEX, `${newTempo} BPM`);
    }
    return `${p}, uptempo, faster pace`;
  },

  'tempo-shift-down': (p) => {
    // Decrease tempo references
    const tempoMatch = p.match(TEMPO_REGEX);
    if (tempoMatch) {
      const currentTempo = parseInt(tempoMatch[1]);
      const newTempo = Math.max(currentTempo - 20, 40);
      return p.replace(BPM_REPLACE_REGEX, `${newTempo} BPM`);
    }
    return `${p}, downtempo, slower pace`;
  },

  'mood-invert': (p) => {
    // Invert mood descriptors using single-pass replacement
    // The callback function receives the matched string
    return p.replace(MOOD_REGEX, (match) => {
      // Look up the lowercase version of the match
      const inverted = MOOD_MAP[match.toLowerCase()];
      // Return the inverted mood, or the original if not found (safety)
      return inverted || match;
    });
  },

  'genre-blend': (p) => {
    return `${p}, ${FUSION_ELEMENTS}`;
  },
};

/**
 * Applies a mutation to a prompt string, transforming it based on the mutation type.
 * Mutations can alter mood, tempo, instrumentation, or overall character of the prompt.
 */
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

const MOOD_REGEX = new RegExp(`\\b(${Object.keys(MOOD_MAP).join('|')})\\b`, 'gi');

const MUTATION_HANDLERS: Record<MutationType, (p: string) => string> = {
  viral: (p) => {
    // Add viral characteristics: short, catchy, repetitive
    const viralElements = "short, repetitive, catchy hook, high recall, earworm melody";
    return `${p}, ${viralElements}`;
  },

  emotional: (p) => {
    // Enhance emotional depth
    const emotionalElements = "deep, vulnerable, expressive lyrics, heartfelt delivery, emotional resonance";
    return `${p}, ${emotionalElements}`;
  },

  energy: (p) => {
    // Boost energy level
    const energyElements = "fast tempo, aggressive delivery, high energy, intense, driving rhythm";
    return `${p}, ${energyElements}`;
  },

  instrumental: (p) => {
    // Convert to instrumental by removing vocal references
    let result = p.replace(/\b(vocal|vocals|singing|lyrics|voice|sung)\b[^,]*/gi, '');
    // Clean up multiple commas and extra spaces
    result = result.replace(/,\s*,+/g, ',').replace(/^,\s*|\s*,$/g, '').trim();
    return `${result}, instrumental only, no vocals`;
  },

  'tempo-shift-up': (p) => {
    // Increase tempo references
    const tempoMatch = p.match(/(\d+)\s*BPM/i);
    if (tempoMatch) {
      const currentTempo = parseInt(tempoMatch[1]);
      const newTempo = Math.min(currentTempo + 20, 200);
      return p.replace(/\d+\s*BPM/i, `${newTempo} BPM`);
    }
    return `${p}, uptempo, faster pace`;
  },

  'tempo-shift-down': (p) => {
    // Decrease tempo references
    const tempoMatch = p.match(/(\d+)\s*BPM/i);
    if (tempoMatch) {
      const currentTempo = parseInt(tempoMatch[1]);
      const newTempo = Math.max(currentTempo - 20, 40);
      return p.replace(/\d+\s*BPM/i, `${newTempo} BPM`);
    }
    return `${p}, downtempo, slower pace`;
  },

  'mood-invert': (p) => {
    // Replace all moods in one pass using a callback to avoid intermediate arrays and re-allocations
    return p.replace(MOOD_REGEX, (match) => {
      // Use original case map matching with toLowerCase to support case-insensitivity
      const lowerMatch = match.toLowerCase();
      return MOOD_MAP[lowerMatch] || match;
    });
  },

  'genre-blend': (p) => {
    // Add fusion elements
    const fusionElements = "genre fusion, experimental blend, cross-genre elements";
    return `${p}, ${fusionElements}`;
  },
};

export function mutatePrompt(prompt: string, type: MutationType): string {
  const mutationFn = MUTATION_HANDLERS[type];
  if (!mutationFn) {
    throw new Error(`Unknown mutation type: ${type}`);
  }

  return mutationFn(prompt);
}
