import { imageToPrompt } from '@/lib/visionEngine';
import { buildPrompt } from '@/lib/promptEngine';
import { validateVisionRequest, createErrorResponse } from '@/lib/validation';

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
    return Response.json({ error: "Vision processing failed" }, { status: 500 });
  }
}
