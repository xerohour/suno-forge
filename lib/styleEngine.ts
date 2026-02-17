
const GENRE_DATA: Record<string, { instruments: string[], minTempo: number, maxTempo: number, descriptor: string }> = {
  "pop": { instruments: ["synth", "bass", "drums", "vocal chops"], minTempo: 100, maxTempo: 130, descriptor: "catchy" },
  "rock": { instruments: ["electric guitar", "bass", "drums", "distortion"], minTempo: 110, maxTempo: 150, descriptor: "energetic" },
  "hip hop": { instruments: ["drum machine", "synth bass", "samples", "808"], minTempo: 80, maxTempo: 100, descriptor: "rhythmic" },
  "electronic": { instruments: ["synthesizer", "drum machine", "sequencer", "arpeggiator"], minTempo: 120, maxTempo: 140, descriptor: "electronic" },
  "classical": { instruments: ["orchestra", "piano", "violin", "cello"], minTempo: 60, maxTempo: 100, descriptor: "orchestral" },
  "jazz": { instruments: ["saxophone", "piano", "double bass", "drums"], minTempo: 80, maxTempo: 140, descriptor: "smooth" },
  "ambient": { instruments: ["pad", "synth", "field recordings", "reverb"], minTempo: 60, maxTempo: 90, descriptor: "atmospheric" },
  "country": { instruments: ["acoustic guitar", "violin", "banjo", "steel guitar"], minTempo: 80, maxTempo: 120, descriptor: "acoustic" },
  "metal": { instruments: ["distorted guitar", "double bass drum", "bass"], minTempo: 140, maxTempo: 200, descriptor: "aggressive" },
  "trap": { instruments: ["808", "hi-hats", "synth", "autotune"], minTempo: 130, maxTempo: 160, descriptor: "bouncy" },
  "lofi": { instruments: ["piano", "vinyl crackle", "slow drums"], minTempo: 70, maxTempo: 90, descriptor: "chill" },
  "synthwave": { instruments: ["synthesizer", "drum machine", "bass guitar", "retro pads"], minTempo: 100, maxTempo: 140, descriptor: "retro 80s" },
}

export function getMusicalStyle(styleName: string) {
  const normalizedStyleName = styleName.toLowerCase().trim();
  const style = GENRE_DATA[normalizedStyleName];
  if (!style) {
    throw new Error(`Musical style "${styleName}" not found.`);
  }
  return style;
}

export function buildStyle(config: any) {
  const { genre, mood, tempo, energy } = config

  // Normalize genre to lowercase for lookup
  const normalizedGenre = (genre || "").toLowerCase().trim()
  
  // Find matching genre data (partial match support could be added, but keeping simple for now)
  const genreInfo = GENRE_DATA[normalizedGenre] || GENRE_DATA["pop"] // Default to pop if unknown, or maybe generic

  // Tempo logic
  let finalTempo = Number(tempo)
  if (!finalTempo || isNaN(finalTempo)) {
    // Pick a random tempo within range if not specified
    finalTempo = Math.floor(Math.random() * (genreInfo.maxTempo - genreInfo.minTempo + 1)) + genreInfo.minTempo
  }

  // Energy logic
  const energyVal = Number(energy)
  let energyDesc = "mid energy"
  if (!isNaN(energyVal)) {
    if (energyVal >= 0.8) energyDesc = "high energy"
    else if (energyVal <= 0.4) energyDesc = "low energy"
  }

  // Instrument logic
  // If genre is known, pick instruments. If unknown, skip.
  let instruments = ""
  if (GENRE_DATA[normalizedGenre]) {
     instruments = genreInfo.instruments.join(", ")
  }

  const parts = [
    genre,
    mood,
    // Add genre-specific descriptor if not already in mood
    (mood || "").toLowerCase().includes(genreInfo.descriptor) ? "" : genreInfo.descriptor,
    `${finalTempo} BPM`,
    energyDesc,
    instruments,
    "studio quality",
    "clear vocals"
  ].filter(Boolean)

  // Remove duplicates and clean up
  const uniqueParts = [...new Set(parts.map(p => p.trim()))].filter(p => p.length > 0)
  
  return uniqueParts.join(", ")
}
