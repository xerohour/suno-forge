import { PromptDNA } from "@/types/prompt";

// Part 5.3: Master Tag & Vocabulary Catalog
export const VOCAL_TONE_TEXTURE = [
  "airy", "breathy", "bright", "smooth", "warm", "crisp", "deep", "gritty", "raspy", "velvety", "whispered", "gravelly", "brassy", "smoky"
];

export const VOCAL_DELIVERY = [
  "legato", "staccato", "melismatic", "chant", "rap", "spoken-word", "yodeling", "belting"
];

export const VOCAL_FX = [
  "clear diction", "vibrato", "autotuned", "doubled", "harmonized", "whispered doubles"
];

export const INSTRUMENTS = [
  // Lead
  "guitar lead", "sax lead", "synth lead", "vocal lead",
  // Support
  "piano hooks", "string lines", "arp", "countermelody",
  // Bed
  "pads", "rhythm guitar", "drones", "bass", "drums",
  // Specifics
  "acoustic guitar", "palm-muted guitar", "warm Rhodes", "felt piano", "analog polysynth", "supersaw", "violin", "cello", "brass swells", "brushed kit", "trap 808s", "sub 808", "percussion", "congas", "shaker", "clave"
];

export const MOODS = [
  "nostalgic", "melancholic", "moody", "dreamy", "euphoric", "triumphant", "ominous", "hopeful", "reflective"
];

export const PRODUCTION_TERMS = [
  "tape-saturated", "crunchy", "airy top", "subby low end", "warm mids", "glassy highs", "side-chained", "pumping", "ducked pads", "lo-fi", "vinyl hiss",
  "dry/close", "room", "hall", "plate shimmer", "tape delay", "slapback"
];


// Based on Part 5.2: Genre & Fusion Playbooks
const GENRE_DATA: Record<
  string,
  {
    instruments: string[];
    minTempo: number;
    maxTempo: number;
    descriptor: string;
  }
> = {
  pop: {
    instruments: ["synth", "bass", "drums", "vocal chops"],
    minTempo: 100,
    maxTempo: 130,
    descriptor: "catchy, modern, radio-friendly",
  },
  "synthwave": {
    instruments: ["Analog polysynth pads", "bass arps", "tom fills", "gated reverb drums"],
    minTempo: 84,
    maxTempo: 104,
    descriptor: "nostalgic 80s, neon dreamy, night drive",
  },
  "indie-folk": {
    instruments: ["Fingerstyle acoustic guitar", "soft brush kit", "upright bass", "light pads"],
    minTempo: 82,
    maxTempo: 96,
    descriptor: "Earthy, reflective, hopeful, intimate",
  },
  "gospel-trap": {
    instruments: ["Clap patterns", "808 sub", "choir pads", "stacked choir hooks"],
    minTempo: 80,
    maxTempo: 92,
    descriptor: "Uplifting, triumphant, powerful",
  },
};

export function getMusicalStyle(styleName: string) {
  const normalizedStyleName = styleName.toLowerCase().trim();
  const style = GENRE_DATA[normalizedStyleName];
  if (!style) {
    throw new Error(`Musical style '${styleName}' not found.`);
  }
  return style;
}

/**
 * Builds a style prompt string from a configuration object,
 * following the best practices from the Suno Prompting Compendium.
 * It prioritizes core descriptors and filters out empty values.
 */
export function buildStyle(config: PromptDNA): string {
  // 1. Front-load non-negotiables as per the Compendium's priority order.
  const parts = [
    config.genre, // Core genre / sub-genre
    config.mood, // Primary mood / energy
    config.instrumentation, // Lead instrument or key sonic elements
    config.vocalStyle, // Vocal identity is crucial
    config.tempo ? `${config.tempo} BPM` : null, // Tempo / feel
    config.production, // Production treatment (e.g., lo-fi, studio quality)
  ].filter((p): p is string => !!p && p.trim().length > 0); // Filter out null, undefined, and empty strings.

  // 2. Remove duplicates while preserving order for the most part.
  const uniqueParts = [...new Set(parts.map((p) => p.trim()))];

  // 3. Join into a comma-separated list for balanced weighting.
  // Apply the Anchor-Repeat Strategy (3.3) for the main genre if it exists and there are other descriptors.
  if (config.genre && uniqueParts.length > 1) {
      return `${uniqueParts.join(", ")}, ${config.genre}`;
  }

  return uniqueParts.join(", ");
}
