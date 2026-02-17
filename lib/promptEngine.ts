import { buildStyle } from "./styleEngine"
import { generateLyrics } from "./lyricsEngine"
import { PromptDNA } from "@/types/prompt"

export async function buildPrompt(config: PromptDNA) {
  const style = buildStyle(config)
  const lyrics = await generateLyrics(config)

  return `
STYLE: ${style}

LYRICS:
${lyrics}
`
}
