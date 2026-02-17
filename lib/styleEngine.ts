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
    instruments: string;
    minTempo: number;
    maxTempo: number;
    descriptor: string;
  }
> = {
  pop: {
    instruments: "synth, bass, drums, vocal chops",
    minTempo: 100,
    maxTempo: 130,
    descriptor: "catchy, modern, radio-friendly",
  },
  "synthwave": {
    instruments: "Analog polysynth pads, bass arps, tom fills, gated reverb drums",
    minTempo: 84,
    maxTempo: 104,
    descriptor: "nostalgic 80s, neon dreamy, night drive",
  },
  "indie-folk": {
    instruments: "Fingerstyle acoustic guitar, soft brush kit, upright bass, light pads",
    minTempo: 82,
    maxTempo: 96,
    descriptor: "Earthy, reflective, hopeful, intimate",
  },
  "gospel-trap": {
    instruments: "Clap patterns, 808 sub, choir pads, stacked choir hooks",
    minTempo: 80,
    maxTempo: 92,
    descriptor: "Uplifting, triumphant, powerful",
  },
  "lofi": {
    instruments: "lo-fi beats, jazz piano, soft guitar, vinyl crackle",
    minTempo: 70,
    maxTempo: 90,
    descriptor: "Chill vibes, lo-fi, relaxed",
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
  // 1. Get genre data or fallback to Pop
  let genreData = GENRE_DATA['pop'];
  if (config.genre) {
    try {
      genreData = getMusicalStyle(config.genre);
    } catch (e) {
      // Keep default as Pop if not found
    }
  }

  // 2. Determine Tempo
  let tempoString: string | null = null;
  if (config.tempo) {
    tempoString = `${config.tempo} BPM`;
  } else {
    // Generate random tempo within range
    const randomTempo = Math.floor(Math.random() * (genreData.maxTempo - genreData.minTempo + 1)) + genreData.minTempo;
    tempoString = `${randomTempo} BPM`;
  }

  // 3. Determine Energy
  let energyDescriptor: string | null = null;
  if (config.energy !== undefined) {
    if (config.energy > 0.8) energyDescriptor = "high energy";
    else if (config.energy < 0.4) energyDescriptor = "low energy";
    else energyDescriptor = "mid energy";
  } else {
    // Default energy if not provided? Maybe "mid energy" or null
    // The test expects "mid energy" for default Synthwave config which has no energy specified.
    energyDescriptor = "mid energy";
  }

  // 4. Build parts list
  const parts = new Set<string>();

  const addPart = (part: string | null | undefined) => {
    if (part) {
      const trimmed = part.trim();
      if (trimmed.length > 0) {
        parts.add(trimmed);
      }
    }
  };

  addPart(config.genre); // Core genre / sub-genre
  addPart(config.mood); // Primary mood / energy
  addPart(tempoString); // Tempo / feel
  addPart(energyDescriptor);
  addPart(genreData.descriptor);
  addPart(genreData.instruments);
  addPart(config.instrumentation); // Lead instrument or key sonic elements
  addPart(config.vocalStyle); // Vocal identity is crucial

  if (config.production) {
    addPart(config.production);
  } else if (!config.instrumental) {
    addPart("studio quality, clear vocals");
  }

  // 5. Join into a comma-separated list for balanced weighting.
  // Apply the Anchor-Repeat Strategy (3.3) for the main genre if it exists and there are other descriptors.
  if (config.genre && parts.size > 1) {
      return `${Array.from(parts).join(", ")}, ${config.genre}`;
  }

  return Array.from(parts).join(", ");
}
