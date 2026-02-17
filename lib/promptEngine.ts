import { buildStyle } from "./styleEngine"
import { generateLyrics } from "./lyricsEngine"

export function buildPrompt(config: any) {
  const style = buildStyle(config)
  const lyrics = generateLyrics(config)

  return `
[Style of Music]
${style}

[Lyrics]
[Title: ${config.theme || "Untitled Song"}]
${lyrics}
`
}
