
/**
 * Cleans a "blueprint" lyric string into a "production" string
 * by removing comments and normalizing whitespace.
 * This is based on the Blueprint-to-Production workflow from the compendium.
 * @param blueprintLyrics The raw lyrics, possibly with comments and extra whitespace.
 * @returns A production-ready lyric string.
 */
const COMMENT_REGEX = /^\s*\/\/.*$/gm;
const MULTI_BLANK_REGEX = /\n{3,}/g;

// Optimization: Use single regex chain instead of split/loop array processing for better memory efficiency and speed
export function cleanLyricsForProduction(blueprintLyrics: string): string {
  if (!blueprintLyrics) {
    return '';
  }

  return blueprintLyrics
    .replace(COMMENT_REGEX, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/^[ \t]+/gm, '')
    .replace(MULTI_BLANK_REGEX, '\n\n')
    .trim();
}
