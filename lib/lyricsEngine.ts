
const STRUCTURES: Record<string, string[]> = {
  "pop": ["Verse 1", "Chorus", "Verse 2", "Chorus", "Bridge", "Chorus", "Outro"],
  "rock": ["Verse 1", "Chorus", "Verse 2", "Chorus", "Guitar Solo", "Chorus", "Outro"],
  "hip hop": ["Intro", "Verse 1", "Chorus", "Verse 2", "Chorus", "Verse 3", "Outro"],
  "electronic": ["Intro", "Build", "Drop", "Break", "Build", "Drop", "Outro"],
  "ballad": ["Intro", "Verse 1", "Chorus", "Verse 2", "Chorus", "Bridge", "Chorus", "Outro"],
  "default": ["Verse 1", "Chorus", "Verse 2", "Chorus", "Outro"]
}

export function generateLyrics(config: any) {
  const { genre, theme } = config
  // Normalize genre to match keys in STRUCTURES
  // Simple mapping: "trap" -> "hip hop", "metal" -> "rock"
  let normalizedGenre = (genre || "default").toLowerCase().trim()
  
  if (normalizedGenre.includes("trap") || normalizedGenre.includes("rap")) normalizedGenre = "hip hop"
  if (normalizedGenre.includes("metal") || normalizedGenre.includes("punk")) normalizedGenre = "rock"
  if (normalizedGenre.includes("house") || normalizedGenre.includes("techno") || normalizedGenre.includes("dubstep")) normalizedGenre = "electronic"
  
  const structure = STRUCTURES[normalizedGenre] || STRUCTURES["default"]
  
  const themeText = theme || "lost in the moment"

  const verseLines = [
    `Walking through the ${themeText}, can't turn back`,
    `Reflections of ${themeText} everywhere I look`,
    `Time stands still when ${themeText} is on my mind`,
    `Voices whispering about ${themeText} in the dark`
  ]

  return structure.map((part) => {
    if (part === "Chorus") {
      return `[Chorus]\n${themeText}, oh ${themeText}\n(Repeat hook about ${themeText})`
    }
    if (part.includes("Verse")) {
       const line = verseLines[Math.floor(Math.random() * verseLines.length)]
       return `[${part}]\n${line}\n(Continue story about ${themeText}...)`
    }
    if (part === "Intro" || part === "Outro") {
        return `[${part}]\n(Atmospheric sounds related to ${themeText})`
    }
    if (part === "Drop") {
        return `[Drop]\n(High energy instrumental)`
    }
    return `[${part}]\n(Instrumental or lyrics)`
  }).join("\n\n")
}
