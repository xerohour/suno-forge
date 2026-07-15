import { imageToPrompt } from '@/lib/visionEngine';
import { buildPrompt } from '@/lib/promptEngine';
import { validateVisionRequest, createErrorResponse } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!validateVisionRequest(body)) {
      return createErrorResponse(
        "Invalid vision request",
        400,
        "Request must include a valid description string",
        "INVALID_VISION_REQUEST"
      );
    }

    const { description } = body;

    const config = imageToPrompt(description);
    const prompt = buildPrompt(config);

    return Response.json({ prompt });
  } catch (error) {
    console.error("Vision processing failed:", error);

    // Security: Do not leak internal error details to the client
    return createErrorResponse(
      "Vision processing failed",
      500,
      "An unexpected error occurred",
      "VISION_FAILED"
    );
  }
}
