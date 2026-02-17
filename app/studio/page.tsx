"use client"

import { useState } from "react"

export default function Studio() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)

  async function generate() {
    setLoading(true)

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genre: "trap",
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
        {loading ? "Generating..." : "Generate Prompt"}
      </button>

      <pre>{prompt}</pre>
    </div>
  )
}
