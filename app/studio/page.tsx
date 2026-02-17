"use client"

import { useState } from "react"

const genres = ["pop", "synthwave"];

export default function Studio() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)

  async function generate() {
    setLoading(true)

    try {
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genre: randomGenre,
          mood: "dark",
          energy: 0.8,
          theme: "neon loneliness",
        }),
      })

      const data = await res.json()
      setPrompt(data.prompt)
    } catch {
      setPrompt("Error generating prompt")
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>SunoForge Studio</h1>

      <button onClick={generate} disabled={loading}>
        {loading ? "Generating..." : "Generate Random Style Prompt"}
      </button>

      <pre>{prompt}</pre>
    </div>
  )
}
