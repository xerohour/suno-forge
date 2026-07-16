import { buildPrompt } from "@/lib/promptEngine";
import { validatePromptConfig, createErrorResponse } from "@/lib/validation";
import { GenerateResponse } from "@/types/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    if (!validatePromptConfig(body)) {
      return createErrorResponse(
        "Invalid prompt configuration",
        400,
        "Please provide a valid prompt configuration object",
        "INVALID_CONFIG"
      );
    }

    // Generate prompt
    const prompt = await buildPrompt(body);

    const response: GenerateResponse = { prompt };
    return Response.json(response);
  } catch (error) {
    console.error("Generation failed:", error);

    // Security: Do not leak error details to the client
    return createErrorResponse(
      "Failed to generate prompt",
      500,
      "An unexpected error occurred during prompt generation",
      "GENERATION_FAILED"
    );
  }
}

