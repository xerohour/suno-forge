import { mutatePrompt } from "@/lib/mutationEngine";
import { validateMutationType, createErrorResponse, handleServerError } from "@/lib/validation";
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
    return handleServerError(error, "Mutation failed");
  }
}
