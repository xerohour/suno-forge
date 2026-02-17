import { PromptDNA } from "@/types/prompt"

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

export function buildStyle(config: PromptDNA): string {
  const parts = [
    config.genre,
    config.mood,
    config.tempo ? `${config.tempo} BPM` : null,
    config.energy
      ? config.energy > 0.7
        ? "high energy"
        : "low energy"
      : null,
    config.vocalStyle,
    "studio quality",
    "clear vocals",
  ].filter((p): p is string => !!p)

  const uniqueParts = [
    ...new Set(
      parts
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
    ),
  ]

  return uniqueParts.join(", ")
}
