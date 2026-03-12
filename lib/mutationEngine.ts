import { MutationType } from "@/types/prompt";

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

// Pre-compiled regular expressions for performance
const VOCALS_REGEX = /\b(vocal|vocals|singing|lyrics|voice|sung)\b[^,]*/gi;
const MULTI_COMMA_REGEX = /,\s*,+/g;
const EDGE_COMMA_REGEX = /^,\s*|\s*,$/g;
const BPM_CAPTURE_REGEX = /(\d+)\s*BPM/i;
const BPM_REPLACE_REGEX = /\d+\s*BPM/i;

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
    let result = p.replace(VOCALS_REGEX, '');
    // Clean up multiple commas and extra spaces
    result = result.replace(MULTI_COMMA_REGEX, ',').replace(EDGE_COMMA_REGEX, '').trim();
    return `${result}, instrumental only, no vocals`;
  },

  'tempo-shift-up': (p) => {
    // Increase tempo references
    const tempoMatch = p.match(BPM_CAPTURE_REGEX);
    if (tempoMatch) {
      const currentTempo = parseInt(tempoMatch[1]);
      const newTempo = Math.min(currentTempo + 20, 200);
      return p.replace(BPM_REPLACE_REGEX, `${newTempo} BPM`);
    }
    return `${p}, uptempo, faster pace`;
  },

  'tempo-shift-down': (p) => {
    // Decrease tempo references
    const tempoMatch = p.match(BPM_CAPTURE_REGEX);
    if (tempoMatch) {
      const currentTempo = parseInt(tempoMatch[1]);
      const newTempo = Math.max(currentTempo - 20, 40);
      return p.replace(BPM_REPLACE_REGEX, `${newTempo} BPM`);
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

