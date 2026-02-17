import { mutatePrompt } from "@/lib/mutationEngine";
import { validateMutationType, createErrorResponse } from "@/lib/validation";
import { MutateResponse } from "@/types/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate inputs
    if (!body.prompt || typeof body.prompt !== 'string' || body.prompt.trim().length === 0) {
      return createErrorResponse(
        "Invalid prompt",
        400,
        "Prompt must be a non-empty string",
        "INVALID_PROMPT"
      );
    }

    if (!validateMutationType(body.type)) {
      return createErrorResponse(
        "Invalid mutation type",
        400,
        "Mutation type must be one of: viral, emotional, energy, instrumental, tempo-shift-up, tempo-shift-down, mood-invert, genre-blend",
        "INVALID_MUTATION_TYPE"
      );
    }

    // Apply mutation
    const mutated = mutatePrompt(body.prompt, body.type);

    const response: MutateResponse = { mutated };
    return Response.json(response);
  } catch (error) {
    console.error("Mutation failed:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return createErrorResponse(
      "Failed to mutate prompt",
      500,
      errorMessage,
      "MUTATION_FAILED"
    );
  }
}

