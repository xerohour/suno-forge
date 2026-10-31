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
    const prompt = buildPrompt(body);

    const response: GenerateResponse = { prompt };
    return Response.json(response);
  } catch (error) {
    console.error("Generation failed:", error);

    const errorMessage = "An internal server error occurred";
    return createErrorResponse(
      "Failed to generate prompt",
      500,
      undefined, // Don't leak details to client
      "GENERATION_FAILED"
    );
  }
}

