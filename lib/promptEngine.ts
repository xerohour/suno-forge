import { buildStyle } from "./styleEngine"
import { PromptDNA } from "@/types/prompt"

/**
 * Builds a complete Suno prompt object, separating the style
 * from the lyrics, ready for generation or API submission.
 * It uses the provided config to generate a style prompt and 
 * directly uses the provided lyrics.
 */
export async function buildPrompt(config: PromptDNA): Promise<{ style: string; lyrics: string }> {
  const style = buildStyle(config);

  // Use lyrics directly from the config, or provide a default if empty.
  const lyrics = config.lyrics || "[Verse]\\n...\\n[Chorus]\\n...";

  return {
    style,
    lyrics,
  };
}
