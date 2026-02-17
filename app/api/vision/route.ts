import { imageToPrompt } from '@/lib/visionEngine';
import { buildPrompt } from '@/lib/promptEngine';

export async function POST(req: Request) {
  const { description } = await req.json();

  const config = imageToPrompt(description);
  const prompt = buildPrompt(config);

  return Response.json({ prompt });
}
