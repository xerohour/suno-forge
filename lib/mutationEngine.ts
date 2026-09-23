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

// Security: Escape object keys before building a regular expression to prevent regex injection, even if the keys are currently statically defined.
const MOOD_REGEX = new RegExp(`\\b(${Object.keys(MOOD_MAP).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi');

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
    // Optimization: avoids double string scanning by replacing match and replace with a single regex replace callback.
    let replaced = false;
    const result = p.replace(/(\d+)\s*BPM/i, (_, p1) => {
      replaced = true;
      const currentTempo = parseInt(p1);
      const newTempo = Math.min(currentTempo + 20, 200);
      return `${newTempo} BPM`;
    });
    return replaced ? result : `${p}, uptempo, faster pace`;
  },

  'tempo-shift-down': (p) => {
    // Decrease tempo references
    // Optimization: avoids double string scanning by replacing match and replace with a single regex replace callback.
    let replaced = false;
    const result = p.replace(/(\d+)\s*BPM/i, (_, p1) => {
      replaced = true;
      const currentTempo = parseInt(p1);
      const newTempo = Math.max(currentTempo - 20, 40);
      return `${newTempo} BPM`;
    });
    return replaced ? result : `${p}, downtempo, slower pace`;
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

