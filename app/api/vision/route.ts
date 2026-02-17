import { imageToPrompt } from '@/lib/visionEngine';
import { buildPrompt } from '@/lib/promptEngine';

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    const config = imageToPrompt(description);
    const prompt = buildPrompt(config);

    return Response.json({ prompt });
  } catch (error) {
    console.error("Vision processing failed:", error);
    return Response.json({ error: "Vision processing failed" }, { status: 500 });
  }
}
