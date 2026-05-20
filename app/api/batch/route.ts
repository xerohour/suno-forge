import { buildPrompt } from "@/lib/promptEngine";
import { validateBatchRequest, createErrorResponse } from "@/lib/validation";
import { BatchResponse } from "@/types/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate batch request
    if (!validateBatchRequest(body)) {
      return createErrorResponse(
        "Invalid batch request",
        400,
        "Request must include valid config and count (1-50)",
        "INVALID_BATCH_REQUEST"
      );
    }

    // Generate prompts in parallel
    const prompts = await Promise.all(
      Array.from({ length: body.count }).map(() => buildPrompt(body.config))
    );

    const response: BatchResponse = { prompts };
    return Response.json(response);
  } catch (error) {
    console.error("Batch generation failed:", error);

    // Security: Do not expose internal error details to the client
    return createErrorResponse(
      "Failed to generate batch prompts",
      500,
      undefined,
      "BATCH_FAILED"
    );
  }
}
