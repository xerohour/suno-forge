import { buildStyle } from "./styleEngine";
import { cleanLyricsForProduction } from "./lyricsEngine";
import { Prompt, PromptDNA } from "@/types/prompt";

function generatePromptTitle(config: PromptDNA): string {
  const genre = config.genre || 'Music';
  const mood = config.mood || 'Vibes';
  return `${genre.charAt(0).toUpperCase() + genre.slice(1)} - ${mood.charAt(0).toUpperCase() + mood.slice(1)}`;
}

// Module-level pre-compiled regexes to avoid recompilation overhead
const NON_ALPHANUM_REGEX = /[^a-z0-9_\s-]/g;
const WHITESPACE_REGEX = /\s+/g;

function generateTechnicalName(title: string): string {
    const now = new Date();

    // Manual date extraction avoids intermediate string allocations and regex parsing
    // Preserves original YYYYMMDDHHMMSS format strictly.
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth() + 1;
    const day = now.getUTCDate();
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();
    const seconds = now.getUTCSeconds();

    const timestamp = `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}${hours < 10 ? '0' : ''}${hours}${minutes < 10 ? '0' : ''}${minutes}${seconds < 10 ? '0' : ''}${seconds}`;

    const safeTitle = title.toLowerCase().replace(NON_ALPHANUM_REGEX, ' ').trim().replace(WHITESPACE_REGEX, '_');
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
