export interface PromptPack {
  id: string
  name: string
  genre: string
  mood: string
  tempo: number
  instrumentation: string
  vocalStyle: string
  production: string
  lyricsSeed: string
  energyLabel: "low" | "medium" | "high" | "very high"
  useCase: string
}

// Inspired by community "awesome prompt" collections:
// each pack is a production-ready starting point you can customize.
export const PROMPT_PACKS: PromptPack[] = [
  {
    id: "dance-pop-anthem",
    name: "Dance Pop Anthem",
    genre: "dance pop",
    mood: "euphoric",
    tempo: 126,
    instrumentation: "synth lead",
    vocalStyle: "powerful female lead with stacked harmonies",
    production: "glassy highs",
    lyricsSeed:
      "[Verse]\nCity lights on skin, hearts in stereo\n[Chorus]\nWe rise when the bassline starts to glow",
    energyLabel: "high",
    useCase: "hooks for short-form content and party playlists",
  },
  {
    id: "emotional-pop-ballad",
    name: "Emotional Pop Ballad",
    genre: "pop ballad",
    mood: "melancholic",
    tempo: 74,
    instrumentation: "piano hooks",
    vocalStyle: "raw intimate vocal with breathy transitions",
    production: "plate shimmer",
    lyricsSeed:
      "[Verse]\nI kept your voice in every hallway\n[Chorus]\nEven silence says your name",
    energyLabel: "medium",
    useCase: "heartbreak stories and emotional hooks",
  },
  {
    id: "indie-bedroom-pop",
    name: "Indie Bedroom Pop",
    genre: "indie pop",
    mood: "dreamy",
    tempo: 112,
    instrumentation: "warm Rhodes",
    vocalStyle: "soft close-mic vocal with doubles",
    production: "tape-saturated",
    lyricsSeed:
      "[Verse]\nPosters fade in afternoon light\n[Chorus]\nSmall room, big sky in my mind",
    energyLabel: "medium",
    useCase: "authentic and lo-fi storytelling",
  },
  {
    id: "stadium-rock",
    name: "Stadium Rock",
    genre: "arena rock",
    mood: "triumphant",
    tempo: 142,
    instrumentation: "guitar lead",
    vocalStyle: "belting lead with gang-style hooks",
    production: "room",
    lyricsSeed:
      "[Verse]\nSteel and thunder under my feet\n[Chorus]\nHands up, we own the night",
    energyLabel: "very high",
    useCase: "sports edits and cinematic hype videos",
  },
  {
    id: "grunge-revival",
    name: "Grunge Revival",
    genre: "grunge",
    mood: "ominous",
    tempo: 96,
    instrumentation: "rhythm guitar",
    vocalStyle: "raspy lead with dynamic quiet-loud delivery",
    production: "crunchy",
    lyricsSeed:
      "[Verse]\nStatic in my chest, rain in the wires\n[Chorus]\nI burn clean through the noise",
    energyLabel: "high",
    useCase: "alt-rock attitude and tension",
  },
  {
    id: "trap-banger",
    name: "Modern Trap Banger",
    genre: "trap",
    mood: "ominous",
    tempo: 75,
    instrumentation: "trap 808s",
    vocalStyle: "confident rap flow with sharp ad-libs",
    production: "subby low end",
    lyricsSeed:
      "[Verse]\nCold stare, chrome wheels, midnight route\n[Hook]\nTalk less, move fast, shut it down",
    energyLabel: "very high",
    useCase: "club-driven rap records",
  },
  {
    id: "boom-bap-night",
    name: "Boom Bap Night Drive",
    genre: "boom bap",
    mood: "reflective",
    tempo: 90,
    instrumentation: "brushed kit",
    vocalStyle: "spoken-word rap with melodic tails",
    production: "vinyl hiss",
    lyricsSeed:
      "[Verse]\nStreet lamps write bars on the windshield\n[Hook]\nOld soul over new drums",
    energyLabel: "medium",
    useCase: "lyrical tracks and storytelling",
  },
  {
    id: "festival-house",
    name: "Festival House Lift",
    genre: "electronic house",
    mood: "euphoric",
    tempo: 128,
    instrumentation: "supersaw",
    vocalStyle: "anthemic topline with wide harmonies",
    production: "side-chained",
    lyricsSeed:
      "[Build]\nHearts sync up in a flashing tide\n[Drop]\nWe jump when the skyline opens",
    energyLabel: "very high",
    useCase: "drops, builds, and crowd energy moments",
  },
  {
    id: "lofi-rain",
    name: "Lo-Fi Rain Session",
    genre: "lofi hip hop",
    mood: "nostalgic",
    tempo: 84,
    instrumentation: "felt piano",
    vocalStyle: "whispered doubles and sparse ad-libs",
    production: "lo-fi",
    lyricsSeed:
      "[Verse]\nTea steam on the window, records spinning slow\n[Chorus]\nLate-night thoughts in sepia tone",
    energyLabel: "low",
    useCase: "study playlists and calm ambience",
  },
  {
    id: "country-road",
    name: "Modern Country Road",
    genre: "country pop",
    mood: "hopeful",
    tempo: 104,
    instrumentation: "acoustic guitar",
    vocalStyle: "warm lead with bright harmonized chorus",
    production: "dry/close",
    lyricsSeed:
      "[Verse]\nDust on my boots, sun on the hood\n[Chorus]\nEvery mile says I'm where I should",
    energyLabel: "medium",
    useCase: "feel-good road and lifestyle tracks",
  },
  {
    id: "soul-rnb-slowjam",
    name: "Soul R&B Slow Jam",
    genre: "r&b soul",
    mood: "dreamy",
    tempo: 78,
    instrumentation: "bass",
    vocalStyle: "smooth melismatic lead with rich backing layers",
    production: "warm mids",
    lyricsSeed:
      "[Verse]\nYour name lands soft like midnight wine\n[Chorus]\nStay here, let the room move slow",
    energyLabel: "low",
    useCase: "intimate late-night vocals",
  },
  {
    id: "jazz-noir",
    name: "Jazz Noir Lounge",
    genre: "jazz blues",
    mood: "moody",
    tempo: 88,
    instrumentation: "sax lead",
    vocalStyle: "smoky close vocal with legato phrasing",
    production: "hall",
    lyricsSeed:
      "[Verse]\nBlue light on glass and half-told lies\n[Chorus]\nPlay me a truth in minor keys",
    energyLabel: "medium",
    useCase: "cinematic lounge and late-evening ambience",
  },
]

export function getRandomPromptPack(): PromptPack {
  const index = Math.floor(Math.random() * PROMPT_PACKS.length)
  return PROMPT_PACKS[index]
}
