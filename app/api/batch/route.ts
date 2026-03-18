import { buildPrompt } from "@/lib/promptEngine";
import { validateBatchRequest, createErrorResponse } from "@/lib/validation";
import { BatchResponse } from "@/types/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { config, count: rawCount } = body;

    // Clamp count
    const count = typeof rawCount === 'number'
      ? Math.max(1, Math.min(50, rawCount))
      : 1;

    // Create a modified body with the clamped count to pass validation
    const clampedBody = { config, count };

    // Validate batch request
    if (!validateBatchRequest(clampedBody)) {
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

    // Security: Do not leak internal error messages or stack traces to the client
    return createErrorResponse(
      "Failed to generate batch prompts",
      500,
      undefined,
      "BATCH_FAILED"
    );
  }
}
