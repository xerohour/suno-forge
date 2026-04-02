import { buildPrompt } from "@/lib/promptEngine";
import { validateBatchRequest, createErrorResponse } from "@/lib/validation";
import { BatchResponse } from "@/types/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Provide default count if missing to maintain backwards compatibility
    const count = typeof body.count === 'number' ? body.count : 1;
    const bodyWithCount = { ...body, count };

    // Validate raw batch request to reject out-of-bounds requests
    if (!validateBatchRequest(bodyWithCount)) {
      return createErrorResponse(
        "Invalid batch request",
        400,
        "Request must include valid config and count (1-50)",
        "INVALID_BATCH_REQUEST"
      );
    }

    const { config } = bodyWithCount;

    // Generate prompts in parallel
    const prompts = await Promise.all(
      Array.from({ length: count }).map(() => buildPrompt(config))
    );

    const response: BatchResponse = { prompts };
    return Response.json(response);
  } catch (error) {
    console.error("Batch generation failed:", error);

    return createErrorResponse(
      "Failed to generate batch prompts",
      500,
      undefined, // Do not leak error details
      "BATCH_FAILED"
    );
  }
}
