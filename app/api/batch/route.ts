import { buildPrompt } from "@/lib/promptEngine"

export async function POST(req: Request) {
  const { config, count } = await req.json()

  const prompts = Array.from({ length: count }).map(() => buildPrompt(config))

  return Response.json({ prompts })
}
