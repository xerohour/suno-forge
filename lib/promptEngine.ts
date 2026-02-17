export interface PromptInput {
  genre?: string;
  mood?: string;
  lyrics?: string;
}

export function buildPrompt(input: PromptInput): string {
  const parts = [input.genre, input.mood, input.lyrics]
    .map((part) => part?.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return "Generate a polished song concept.";
  }

  return `Generate a polished song concept with: ${parts.join(", ")}.`;
}
