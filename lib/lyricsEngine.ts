export function generateLyrics(config: any) {
  const hook = `"${config.theme || "lost in the night"} on repeat"`

  return `
[Verse]
Walking through shadows, chasing the sound
Echoes of silence pulling me down

[Chorus]
${hook}
${hook}
`
}
