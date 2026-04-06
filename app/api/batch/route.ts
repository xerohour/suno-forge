import { buildPrompt } from "@/lib/promptEngine";
import { validateBatchRequest, createErrorResponse } from "@/lib/validation";
import { BatchResponse } from "@/types/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { config, count: rawCount } = body;

    // Explicitly validate raw input to fail-fast on out-of-bounds requests (DoS prevention)
    if (rawCount !== undefined) {
      if (typeof rawCount !== 'number' || rawCount < 1 || rawCount > 50) {
        return createErrorResponse(
          "Invalid batch request",
          400,
          "Request must include valid config and count (1-50)",
          "INVALID_BATCH_REQUEST"
        );
      }
    }

    // Default count to 1 if not provided
    const count = rawCount !== undefined ? rawCount : 1;
    const requestBody = { config, count };

    // Validate batch request
    if (!validateBatchRequest(requestBody)) {
      return createErrorResponse(
        "Invalid batch request",
        400,
        "Request must include valid config and count (1-50)",
        "INVALID_BATCH_REQUEST"
      );
    }

    // Generate prompts in parallel
    const prompts = await Promise.all(
      Array.from({ length: count }).map(() => buildPrompt(config))
    );

    const response: BatchResponse = { prompts };
    return Response.json(response);
  } catch (error) {
    console.error("Batch generation failed:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return createErrorResponse(
      "Failed to generate batch prompts",
      500,
      errorMessage,
      "BATCH_FAILED"
    );
  }
}
