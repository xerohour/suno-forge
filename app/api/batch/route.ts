import { buildPrompt } from "@/lib/promptEngine"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { config, count } = await req.json()

    // Validate and clamp count to prevent DoS
    let batchSize = Number(count)
    if (isNaN(batchSize) || batchSize < 1) {
      batchSize = 1
    } else if (batchSize > 50) {
      batchSize = 50
    }

    const prompts = await Promise.all(
      Array.from({ length: batchSize }).map(() => buildPrompt(config || {}))
    )

    return Response.json({ prompts })
  } catch (error) {
    console.error("Batch failed:", error)
    return Response.json({ error: "Batch failed" }, { status: 500 })
  }
}
