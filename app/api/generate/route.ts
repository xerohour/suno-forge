import { buildPrompt } from '@/lib/promptEngine';

export async function POST(req: Request) {
  const body = await req.json();

  const prompt = buildPrompt(body);

  return Response.json({ prompt });
}
