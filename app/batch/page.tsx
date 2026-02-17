"use client"

import { useState } from "react"

export default function Batch() {
  const [results, setResults] = useState<string[]>([])

  async function generateBatch() {
    const res = await fetch("/api/batch", {
      method: "POST",
      body: JSON.stringify({
        config: { genre: "hyperpop", mood: "chaotic" },
        count: 10
      })
    })

    const data = await res.json()
    setResults(data.prompts)
  }

  return (
    <div>
      <button onClick={generateBatch}>Generate Batch</button>

      {results.map((p, i) => (
        <pre key={i}>{p}</pre>
      ))}
    </div>
  )
}
