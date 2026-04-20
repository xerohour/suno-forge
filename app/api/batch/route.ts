import { buildPrompt } from "@/lib/promptEngine";
import { validateBatchRequest, createErrorResponse } from "@/lib/validation";
import { BatchResponse } from "@/types/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { config, count: rawCount } = body;

    // Preserve default fallback logic
    const count = rawCount === undefined ? 1 : rawCount;

    // Strict validation of the input
    if (typeof count !== 'number' || Number.isNaN(count) || count < 1 || count > 50) {
      return createErrorResponse(
        "Invalid batch request",
        400,
        "Request must include a valid count (1-50)",
        "INVALID_BATCH_REQUEST"
      );
    }

    // Create a modified body with the validated count
    const validatedBody = { config, count };

    // Validate batch request
    if (!validateBatchRequest(validatedBody)) {
      return createErrorResponse(
        "Invalid batch request",
        400,
        "Request must include valid config",
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

    return createErrorResponse(
      "Failed to generate batch prompts",
      500,
      undefined,
      "BATCH_FAILED"
    );
  }
}
