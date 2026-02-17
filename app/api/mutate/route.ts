import { mutatePrompt } from "@/lib/mutationEngine"
import { MutateRequest } from "@/types/prompt"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { prompt, type } = (await req.json()) as MutateRequest

    const mutated = mutatePrompt(prompt, type)

    return Response.json({ mutated })
  } catch (error) {
    console.error("Mutation failed:", error)
    return Response.json({ error: "Mutation failed" }, { status: 500 })
  }
}
