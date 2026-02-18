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
  "guitar lead", "sax lead", "synth lead", "vocal lead", "electric guitar solo", "flute lead", "trumpet melody",
  // Support
  "piano hooks", "string lines", "arp", "countermelody", "synth strings", "organ chords", "rhodes piano", "wah guitar",
  // Bed
  "pads", "rhythm guitar", "drones", "bass", "drums", "synth bass", "sub bass", "upright bass", "acoustic drums", "electronic drums",
  // Specifics
  "acoustic guitar", "palm-muted guitar", "warm Rhodes", "felt piano", "analog polysynth", "supersaw", "violin", "cello", "brass swells", "brushed kit", "trap 808s", "sub 808", "percussion", "congas", "shaker", "clave",
  "distorted electric guitar", "clean electric guitar", "jazz drums", "trap drums", "orchestral strings", "brass section", "woodwind ensemble", "flute", "clarinet", "trumpet", "harmonica", "banjo", "mandolin", "accordion", "percussion ensemble", "tabla", "sitar", "gamelan"
];

export const MOODS = [
  "nostalgic", "melancholic", "moody", "dreamy", "euphoric", "triumphant", "ominous", "hopeful", "reflective",
  "intense", "playful", "mysterious", "serene", "powerful", "groovy", "chill", "uplifting", "dark", "light", "ethereal"
];

export const PRODUCTION_TERMS = [
  "tape-saturated", "crunchy", "airy top", "subby low end", "warm mids", "glassy highs", "side-chained", "pumping", "ducked pads", "lo-fi", "vinyl hiss",
  "dry/close", "room", "hall", "plate shimmer", "tape delay", "slapback",
  "reverberant", "echoey", "dry", "compressed", "autotuned", "vocoder", "sidechain compression", "gated reverb", "vinyl crackle", "tape saturation", "delay throws", "pitch shifted",
  "wide stereo", "mono", "punchy", "smooth attack", "crisp transients", "muddy mix", "clear mix"
];


// Based on Part 5.2: Genre & Fusion Playbooks
const RAW_GENRE_DATA = {
  pop: {
    instruments: ["synth", "bass", "drums", "vocal chops"], // Converted to array
    minTempo: 100,
    maxTempo: 130,
    descriptor: "catchy, modern, radio-friendly",
  },
  "synthwave": {
    instruments: ["Analog polysynth pads", "bass arps", "tom fills", "gated reverb drums"], // Converted to array
    minTempo: 84,
    maxTempo: 104,
    descriptor: "nostalgic 80s, neon dreamy, night drive",
  },
  "indie-folk": {
    instruments: ["Fingerstyle acoustic guitar", "soft brush kit", "upright bass", "light pads"], // Converted to array
    minTempo: 82,
    maxTempo: 96,
    descriptor: "Earthy, reflective, hopeful, intimate",
  },
  "gospel-trap": {
    instruments: ["Clap patterns", "808 sub", "choir pads", "stacked choir hooks"], // Converted to array
    minTempo: 80,
    maxTempo: 92,
    descriptor: "Uplifting, triumphant, powerful",
  },
  "lofi": {
    instruments: ["lo-fi beats", "jazz piano", "soft guitar", "vinyl crackle"], // Converted to array
    minTempo: 70,
    maxTempo: 90,
    descriptor: "Chill vibes, lo-fi, relaxed",
  },
  "hip-hop": {
    instruments: ["808s", "sampled drums", "synth pads", "turntable scratches"],
    minTempo: 80,
    maxTempo: 110,
    descriptor: "urban, rhythmic, storytelling, gritty",
  },
  "r&b": {
    instruments: ["smooth synths", "electric piano", "finger-snaps", "sub bass"],
    minTempo: 60,
    maxTempo: 90,
    descriptor: "soulful, smooth, vocal-focused, sensual",
  },
  "electronic": {
    instruments: ["driving synth arps", "four-on-the-floor drums", "sweeping filters", "deep bassline"],
    minTempo: 120,
    maxTempo: 140,
    descriptor: "driving, synthetic, energetic, pulsating",
  },
  "rock": {
    instruments: ["distorted electric guitar", "heavy drums", "driving bass", "powerful vocals"],
    minTempo: 100,
    maxTempo: 180,
    descriptor: "powerful, guitar-driven, raw, anthemic",
  },
  "ambient": {
    instruments: ["pads", "drones", "field recordings", "sparse piano"],
    minTempo: 40,
    maxTempo: 70,
    descriptor: "expansive, atmospheric, calming, meditative",
  },
  "classical": {
    instruments: ["orchestral strings", "brass section", "woodwinds", "timpani"],
    minTempo: 50,
    maxTempo: 160,
    descriptor: "orchestral, intricate, timeless, majestic",
  },
  "country": {
    instruments: ["acoustic guitar", "steel guitar", "fiddle", "upright bass", "harmonica"],
    minTempo: 60,
    maxTempo: 130,
    descriptor: "storytelling, acoustic, heartfelt, rustic",
  },
  "jazz": {
    instruments: ["saxophone", "trumpet", "jazz guitar", "upright bass", "swing drums", "piano improvisation"],
    minTempo: 80,
    maxTempo: 200,
    descriptor: "improvisational, sophisticated, swing, smooth",
  },
  "folk": {
    instruments: ["acoustic guitar", "mandolin", "banjo", "harmonica", "light percussion"],
    minTempo: 70,
    maxTempo: 120,
    descriptor: "acoustic, narrative, organic, traditional",
  },
  "metal": {
    instruments: ["heavy distorted guitar riffs", "double bass drumming", "growling vocals", "shredding solos"],
    minTempo: 120,
    maxTempo: 240,
    descriptor: "heavy, aggressive, technical, powerful",
  },
  "reggae": {
    instruments: ["skank guitar", "dub bassline", "one-drop drums", "organ bubbles"],
    minTempo: 60,
    maxTempo: 100,
    descriptor: "irie, laid-back, dubby, rhythmic",
  },
  "latin": {
    instruments: ["percussion ensemble", "acoustic guitar", "brass section", "flute", "piano montuno"],
    minTempo: 90,
    maxTempo: 180,
    descriptor: "rhythmic, vibrant, danceable, passionate",
  },
};

type GenreStyle = {
  instruments: string[];
  instrumentsString: string;
  minTempo: number;
  maxTempo: number;
  descriptor: string;
};

// Pre-compute instrument strings to avoid joining arrays on every call
const GENRE_DATA: Record<string, GenreStyle> = Object.fromEntries(
  Object.entries(RAW_GENRE_DATA).map(([key, value]) => [
    key,
    {
      ...value,
      instrumentsString: value.instruments.join(", "),
    },
  ])
);

export function getMusicalStyle(styleName: string) {
  const normalizedStyleName = styleName.toLowerCase().trim();
  return GENRE_DATA[normalizedStyleName];
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
    const foundStyle = getMusicalStyle(config.genre);
    if (foundStyle) {
      genreData = foundStyle;
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
  const potentialParts = [
    config.genre,
    config.mood,
    tempoString,
    energyDescriptor,
    genreData.descriptor,
    genreData.instrumentsString,
    config.instrumentation,
    config.vocalStyle,
    config.production || (!config.instrumental ? "studio quality, clear vocals" : null)
  ];

  const uniqueParts = new Set<string>();
  for (const part of potentialParts) {
    if (part && part.trim().length > 0) {
      uniqueParts.add(part.trim());
    }
  }

  // 5. Join into a comma-separated list for balanced weighting.
  // Apply the Anchor-Repeat Strategy (3.3) for the main genre if it exists and there are other descriptors.
  if (config.genre && uniqueParts.size > 1) {
      return `${Array.from(uniqueParts).join(", ")}, ${config.genre}`;
  }

  return Array.from(uniqueParts).join(", ");
}
