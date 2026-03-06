import { buildPrompt } from "@/lib/promptEngine";
import { validateBatchRequest, createErrorResponse } from "@/lib/validation";
import { BatchResponse } from "@/types/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { config, count: rawCount } = body;

    // Use the original body for validation to properly reject out-of-range values
    if (!validateBatchRequest(body)) {
      return createErrorResponse(
        "Invalid batch request",
        400,
        "Request must include valid config and count (1-50)",
        "INVALID_BATCH_REQUEST"
      );
    }

    // Defense-in-depth: clamp count after validation to strictly bound allocation
    const count = typeof rawCount === 'number'
      ? Math.max(1, Math.min(50, rawCount))
      : 1;

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
      undefined, // Do not expose internal error messages to the client
      "BATCH_FAILED"
    );
  }
}
