
/**
 * Cleans a "blueprint" lyric string into a "production" string
 * by removing comments and normalizing whitespace.
 * This is based on the Blueprint-to-Production workflow from the compendium.
 * @param blueprintLyrics The raw lyrics, possibly with comments and extra whitespace.
 * @returns A production-ready lyric string.
 */
export function cleanLyricsForProduction(blueprintLyrics: string): string {
  if (!blueprintLyrics) return '';

  // Optimization: Use chained regex replacements instead of splitting, looping, and rejoining arrays
  return blueprintLyrics
    .replace(/\r\n/g, '\n')
    .replace(/^[ \t]*\/\/.*(?:\n|$)/gm, '')
    .replace(/^[ \t]+|[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
