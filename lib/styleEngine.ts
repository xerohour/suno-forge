export function buildStyle(config: any) {
  const { genre, mood, tempo, energy } = config

  return [
    genre,
    mood,
    `${tempo || 120} BPM`,
    energy > 0.7 ? "high energy" : "mid energy",
    "studio quality",
    "clear vocals"
  ].join(", ")
}
