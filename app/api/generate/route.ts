import { buildPrompt } from "@/lib/promptEngine"
import { GenerateRequest } from "@/types/prompt"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as GenerateRequest

    const prompt = await buildPrompt(body)

    return Response.json({ prompt })
  } catch {
    return Response.json({ error: "Generation failed" }, { status: 500 })
  }
}
