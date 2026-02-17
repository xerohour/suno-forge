import { imageToPrompt } from '@/lib/visionEngine';
import { buildPrompt } from '@/lib/promptEngine';

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (typeof description !== 'string' || description.trim().length === 0) {
      return Response.json({ error: 'Description is required' }, { status: 400 });
    }

    const config = imageToPrompt(description);
    const prompt = await buildPrompt(config);

    return Response.json({ prompt });
  } catch {
    return Response.json({ error: 'Vision generation failed' }, { status: 500 });
  }
}
