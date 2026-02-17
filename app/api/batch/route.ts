import { buildPrompt } from "@/lib/promptEngine"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { config, count } = await req.json()

    const prompts = await Promise.all(
      Array.from({ length: count || 1 }).map(() => buildPrompt(config || {}))
    )

    return Response.json({ prompts })
  } catch {
    return Response.json({ error: "Batch failed" }, { status: 500 })
  }
}
