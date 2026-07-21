
const COMMENT_REGEX = /^[ \t]*\/\/.*(?:\r?\n|$)/gm;
const WHITESPACE_REGEX = /^[ \t]+|[ \t\r]+$/gm;
const NEWLINE_REGEX = /\n{3,}/g;

/**
 * Cleans a "blueprint" lyric string into a "production" string
 * by removing comments and normalizing whitespace.
 * This is based on the Blueprint-to-Production workflow from the compendium.
 * @param blueprintLyrics The raw lyrics, possibly with comments and extra whitespace.
 * @returns A production-ready lyric string.
 */
export function cleanLyricsForProduction(blueprintLyrics: string): string {
  if (!blueprintLyrics) return '';
  // Optimization: Use pre-compiled regex for O(1) matching overhead and native C++ engine speed
  // instead of O(N) string splitting, trimming, and array joining in JavaScript
  return blueprintLyrics
    .replace(COMMENT_REGEX, '')
    .replace(WHITESPACE_REGEX, '')
    .replace(NEWLINE_REGEX, '\n\n')
    .trim();
}
