import { mutatePrompt } from "@/lib/mutationEngine";
import { validateMutateRequest, createErrorResponse } from "@/lib/validation";
import { MutateResponse } from "@/types/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate inputs
    if (!validateMutateRequest(body)) {
      return createErrorResponse(
        "Invalid mutation request",
        400,
        "Prompt must be a non-empty string (max 5000 chars) and mutation type must be valid",
        "INVALID_MUTATION_REQUEST"
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
