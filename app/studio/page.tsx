"use client"

import { useState } from "react"

export default function Studio() {
  const [prompt, setPrompt] = useState("")

  async function generate() {
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        genre: "trap",
        mood: "dark",
        energy: 0.8,
        theme: "neon city loneliness"
      })
    })

    const data = await res.json()
    setPrompt(data.prompt)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>SunoForge Studio</h1>

      <button onClick={generate}>Generate Prompt</button>

      <pre>{prompt}</pre>
    </div>
  )
}
