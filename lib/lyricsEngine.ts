import { PromptDNA } from "@/types/prompt"

export async function generateLyrics(config: PromptDNA) {
  if (!process.env.OPENAI_API_KEY) {
    return `
[Verse]
Walking through shadows, chasing the sound
Echoes of silence pulling me down

[Chorus]
"${config.theme || "lost in the night"} on repeat"
"${config.theme || "lost in the night"} on repeat"
`
  }

  return `
[Verse]
${config.theme || "unknown"} echoes in time

[Chorus]
"${config.theme || "lost"} on repeat"
`
}
