import { MutationType } from "@/types/prompt";

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

// Compile regex once.
// Keys are sorted by length descending to handle potential overlapping prefixes correctly,
// though for this specific map it's not strictly necessary.
const MOOD_KEYS = Object.keys(MOOD_MAP).sort((a, b) => b.length - a.length);
const MOOD_REGEX = new RegExp(`\\b(${MOOD_KEYS.join('|')})\\b`, 'gi');

function invertMood(p: string): string {
  return p.replace(MOOD_REGEX, (match) => {
    const lower = match.toLowerCase();
    return MOOD_MAP[lower] || match;
  });
}

function changeTempo(p: string, change: number, min: number, max: number, fallback: string): string {
  const tempoMatch = p.match(/(\d+)\s*BPM/i);
  if (tempoMatch) {
    const currentTempo = parseInt(tempoMatch[1]);
    let newTempo = currentTempo + change;
    // Clamp to provided bounds
    newTempo = Math.max(min, Math.min(newTempo, max));
    return p.replace(/\d+\s*BPM/i, `${newTempo} BPM`);
  }
  return `${p}, ${fallback}`;
}

const MUTATION_HANDLERS: Record<MutationType, (p: string) => string> = {
  viral: (p) => {
    const viralElements = "short, repetitive, catchy hook, high recall, earworm melody";
    return `${p}, ${viralElements}`;
  },

  emotional: (p) => {
    const emotionalElements = "deep, vulnerable, expressive lyrics, heartfelt delivery, emotional resonance";
    return `${p}, ${emotionalElements}`;
  },

  energy: (p) => {
    const energyElements = "fast tempo, aggressive delivery, high energy, intense, driving rhythm";
    return `${p}, ${energyElements}`;
  },

  instrumental: (p) => {
    let result = p.replace(/\b(vocal|vocals|singing|lyrics|voice|sung)\b[^,]*/gi, '');
    result = result.replace(/,\s*,+/g, ',').replace(/^,\s*|\s*,$/g, '').trim();
    return `${result}, instrumental only, no vocals`;
  },

  'tempo-shift-up': (p) => changeTempo(p, 20, -Infinity, 200, "uptempo, faster pace"),

  'tempo-shift-down': (p) => changeTempo(p, -20, 40, Infinity, "downtempo, slower pace"),

  'mood-invert': invertMood,

  'genre-blend': (p) => {
    const fusionElements = "genre fusion, experimental blend, cross-genre elements";
    return `${p}, ${fusionElements}`;
  },
};

/**
 * Applies a mutation to a prompt string, transforming it based on the mutation type.
 * Mutations can alter mood, tempo, instrumentation, or overall character of the prompt.
 */
export function mutatePrompt(prompt: string, type: MutationType): string {
  const handler = MUTATION_HANDLERS[type];
  if (!handler) {
    throw new Error(`Unknown mutation type: ${type}`);
  }

  return handler(prompt);
}
