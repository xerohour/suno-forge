import { mutatePrompt } from '@/lib/mutationEngine';

export async function POST(req: Request) {
  const { prompt, type } = await req.json();

  const mutated = mutatePrompt(prompt, type);

  return Response.json({ mutated });
}
