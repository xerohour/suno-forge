import { buildStyle } from "./styleEngine";
import { cleanLyricsForProduction } from "./lyricsEngine";
import { Prompt, PromptDNA } from "@/types/prompt";

function generatePromptTitle(config: PromptDNA): string {
  const genre = config.genre || 'Music';
  const mood = config.mood || 'Vibes';
  return `${genre.charAt(0).toUpperCase() + genre.slice(1)} - ${mood.charAt(0).toUpperCase() + mood.slice(1)}`;
}

// Pre-compiled regexes to avoid re-compilation overhead on every prompt generation
const NON_ALPHANUMERIC_REGEX = /[^a-z0-9_\s-]/g;
const WHITESPACE_REGEX = /\s+/g;

const ISO_DATE_CLEANUP_REGEX = /[-:T]/g;

function generateTechnicalName(title: string): string {
    // Retain the exact YYYYMMDDHHMMSS format while optimizing regex overhead
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 19).replace(ISO_DATE_CLEANUP_REGEX, ''); // YYYYMMDDHHMMSS
    const safeTitle = title.toLowerCase().replace(NON_ALPHANUMERIC_REGEX, ' ').trim().replace(WHITESPACE_REGEX, '_');
    return `${safeTitle}_${timestamp}`;
}


/**
 * Builds a complete Suno prompt object, separating the style
 * from the lyrics, ready for generation or API submission.
 * It uses the provided config to generate a style prompt and 
 * directly uses the provided lyrics.
 */
export async function buildPrompt(config: PromptDNA): Promise<Prompt> {
  const styleConfig: PromptDNA = config.instrumental
    ? { ...config, vocalStyle: undefined }
    : config;
  const style = buildStyle(styleConfig);
  const lyrics = cleanLyricsForProduction(config.lyrics || "");
  const styleTags = (config.styleTags || []).filter((tag) => tag.trim().length > 0);

  const styleParts = [style];
  if (config.language) styleParts.push(`language: ${config.language}`);
  if (config.instrumental) styleParts.push("instrumental only, no vocals");
  if (styleTags.length > 0) styleParts.push(`style tags: ${styleTags.join(", ")}`);
  if (config.negativePrompt?.trim()) styleParts.push(`avoid: ${config.negativePrompt.trim()}`);
  const mergedStyle = styleParts.join(", ");

  const title = config.title?.trim() || generatePromptTitle(config);
  const technicalName = generateTechnicalName(title);


  return {
    title,
    technicalName,
    style: mergedStyle,
    lyrics: config.instrumental ? "" : lyrics,
  };
}
