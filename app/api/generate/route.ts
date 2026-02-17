import { NextResponse } from "next/server";
import { buildPrompt, type PromptInput } from "@/lib/promptEngine";

export async function POST(request: Request) {
  const body = (await request.json()) as PromptInput;
  const prompt = buildPrompt(body);

  return NextResponse.json({ prompt });
}
