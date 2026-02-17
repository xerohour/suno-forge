export function mutatePrompt(prompt: string, type: string) {
  let newStyle = ""
  let newLyrics = ""

  // Extract existing style and lyrics
  const styleMatch = prompt.match(/\[Style of Music\]([\s\S]*?)(\[Lyrics\]|$)/)
  if (styleMatch) {
    newStyle = styleMatch[1].trim()
  }

  const lyricsMatch = prompt.match(/\[Lyrics\]([\s\S]*)$/)
  if (lyricsMatch) {
    newLyrics = lyricsMatch[1].trim()
  }

  // Apply mutations
  switch (type) {
    case "viral":
      if (!newStyle.includes("catchy")) newStyle += ", catchy hook, earworm"
      if (!newLyrics.includes("Repeat")) newLyrics += "\n\n(Repeat Chorus for emphasis)"
      break
    case "emotional":
      newStyle = newStyle.replace(/high energy/g, "emotional").replace(/fast/g, "slow")
      if (!newStyle.includes("emotional")) newStyle += ", emotional, heartfelt"
      break
    case "energy":
      newStyle = newStyle.replace(/mid energy/g, "high energy").replace(/slow/g, "fast")
      if (!newStyle.includes("high energy")) newStyle += ", high energy, driving rhythm"
      break
    case "acoustic":
      // Replace electronic instruments with acoustic ones
      newStyle = newStyle.replace(/synth/g, "piano").replace(/electric guitar/g, "acoustic guitar").replace(/808/g, "cajon")
      if (!newStyle.includes("acoustic")) newStyle += ", acoustic, unplugged"
      break
    case "remix":
      newStyle = "remix, club edit, heavy bass, " + newStyle
      break
    default:
      break
  }

  // Reassemble
  return `[Style of Music]
${newStyle}

[Lyrics]
${newLyrics}`
}
