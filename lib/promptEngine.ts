import { buildStyle } from "./styleEngine";
import { cleanLyricsForProduction } from "./lyricsEngine";
import { Prompt, PromptDNA } from "@/types/prompt";

function generatePromptTitle(config: PromptDNA): string {
  const genre = config.genre || 'Music';
  const mood = config.mood || 'Vibes';
  return `${genre.charAt(0).toUpperCase() + genre.slice(1)} - ${mood.charAt(0).toUpperCase() + mood.slice(1)}`;
}

const NON_ALPHANUM_REGEX = /[^a-z0-9_\s-]/g;
const WHITESPACE_REGEX = /\s+/g;

function generateTechnicalName(title: string): string {
    const now = new Date();
    // Optimization: Use manual string construction for timestamp (YYYYMMDDHHMMSS) to avoid ISO parsing and regex overhead
    const yyyy = now.getUTCFullYear();
    const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(now.getUTCDate()).padStart(2, '0');
    const hh = String(now.getUTCHours()).padStart(2, '0');
    const min = String(now.getUTCMinutes()).padStart(2, '0');
    const ss = String(now.getUTCSeconds()).padStart(2, '0');
    const timestamp = `${yyyy}${mm}${dd}${hh}${min}${ss}`;

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

  // Optimization: Pre-allocate strings to avoid intermediate arrays with .filter().push().join()
  const styleParts = [style];
  if (config.language) styleParts.push(`language: ${config.language}`);
  if (config.instrumental) styleParts.push("instrumental only, no vocals");

  if (config.styleTags && config.styleTags.length > 0) {
      let tagsStr = "";
      for (let i = 0; i < config.styleTags.length; i++) {
          const tag = config.styleTags[i].trim();
          if (tag.length > 0) {
              if (tagsStr.length > 0) tagsStr += ", ";
              tagsStr += tag;
          }
      }
      if (tagsStr.length > 0) styleParts.push(`style tags: ${tagsStr}`);
  }

  if (config.negativePrompt) {
      const negativeTrimmed = config.negativePrompt.trim();
      if (negativeTrimmed.length > 0) styleParts.push(`avoid: ${negativeTrimmed}`);
  }

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
