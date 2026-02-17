import { PromptDNA } from "@/types/prompt"

// The GENRE_DATA can be used for more advanced logic in the future,
// but for now, we'll build the prompt from the user's direct input,
// following the Compendium's principles.
const GENRE_DATA: Record<
  string,
  {
    instruments: string[]
    minTempo: number
    maxTempo: number
    descriptor: string
  }
> = {
  pop: {
    instruments: ["synth", "bass", "drums", "vocal chops"],
    minTempo: 100,
    maxTempo: 130,
    descriptor: "catchy",
  },
  synthwave: {
    instruments: ["synthesizer", "drum machine", "bass guitar", "retro pads"],
    minTempo: 100,
    maxTempo: 140,
    descriptor: "retro 80s",
  },
}

export function getMusicalStyle(styleName: string) {
  const normalizedStyleName = styleName.toLowerCase().trim()
  const style = GENRE_DATA[normalizedStyleName]
  if (!style) {
    throw new Error(`Musical style '${styleName}' not found.`)
  }
  return style
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

    // 2. Add high-leverage production hints if not specified.
    config.production ? null : "studio quality",
    config.vocalStyle ? null : "clear vocals",
  ].filter((p): p is string => !!p && p.trim().length > 0) // Filter out null, undefined, and empty strings.

  // 3. Remove duplicates while preserving order for the most part.
  const uniqueParts = [...new Set(parts.map((p) => p.trim()))]

  // 4. Join into a comma-separated list for balanced weighting.
  return uniqueParts.join(", ")
}
