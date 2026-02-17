import { buildPrompt } from "@/lib/promptEngine"

const MAX_BATCH_SIZE = 100

export async function POST(req: Request) {
  const { config, count } = await req.json()

  const parsedCount = Number(count)

  if (!Number.isInteger(parsedCount) || parsedCount < 1) {
    return Response.json(
      { error: "count must be a positive integer" },
      { status: 400 }
    )
  }

  if (parsedCount > MAX_BATCH_SIZE) {
    return Response.json(
      { error: `count must be less than or equal to ${MAX_BATCH_SIZE}` },
      { status: 400 }
    )
  }

  const prompts = Array.from({ length: parsedCount }, () => buildPrompt(config))

  return Response.json({ prompts })
}
