import { buildPrompt } from "@/lib/promptEngine";
import { validateBatchRequest, createErrorResponse } from "@/lib/validation";
import { BatchResponse } from "@/types/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Clamp count to ensure it is within valid range (1-50)
    if (typeof body.count === "number") {
      if (body.count > 50) body.count = 50;
      if (body.count < 1) body.count = 1;
    }

    // Validate batch request
    if (!validateBatchRequest(body)) {
      return createErrorResponse(
        "Invalid batch request",
        400,
        "Request must include valid config and count (1-50)",
        "INVALID_BATCH_REQUEST"
      );
    }

    const { config, count } = body;

    // Generate prompts in parallel
    const prompts = await Promise.all(Array.from({ length: count }).map(() => buildPrompt(config)));

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
