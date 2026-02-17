"use client"

import { useState } from "react"

export default function Vision() {
  const [desc, setDesc] = useState("")
  const [prompt, setPrompt] = useState("")

  async function generate() {
    const res = await fetch("/api/vision", {
      method: "POST",
      body: JSON.stringify({ description: desc })
    })

    const data = await res.json()
    setPrompt(data.prompt)
  }

  return (
    <div>
      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Describe an image..."
      />

      <button onClick={generate}>Generate</button>

      <pre>{prompt}</pre>
    </div>
  )
}
