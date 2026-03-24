
// Pre-compiled regular expressions for performance
// Matches Windows-style line endings (\r\n) or lone \r
const CRLF_REGEX = /\r\n|\r/g;
// Matches any line starting with optional whitespace and "//", including its trailing newline or end-of-string
// [^\S\n] matches any whitespace character EXCEPT a newline
const COMMENT_REGEX = /^[^\S\n]*\/\/.*(?:\n|$)/gm;
// Matches leading and trailing whitespace on each line
const LEADING_TRAILING_SPACES_REGEX = /^[^\S\n]+|[^\S\n]+$/gm;
// Matches 3 or more consecutive newlines (with optional whitespace in between) to collapse into exactly 2 newlines
const MULTIPLE_NEWLINES_REGEX = /\n[^\S\n]*\n[^\S\n]*\n+/g;

/**
 * Cleans a "blueprint" lyric string into a "production" string
 * by removing comments and normalizing whitespace.
 * This is based on the Blueprint-to-Production workflow from the compendium.
 * @param blueprintLyrics The raw lyrics, possibly with comments and extra whitespace.
 * @returns A production-ready lyric string.
 */
export function cleanLyricsForProduction(blueprintLyrics: string): string {
  if (!blueprintLyrics) {
    return '';
  }

  // Optimization: Use pre-compiled regex replacements instead of splitting,
  // iterating, and re-joining lines to avoid intermediate array allocations
  // and reduce CPU overhead on large lyrics blocks.
  return blueprintLyrics
    .replace(CRLF_REGEX, '\n') // Normalize line endings first
    .replace(COMMENT_REGEX, '')
    .replace(LEADING_TRAILING_SPACES_REGEX, '')
    .replace(MULTIPLE_NEWLINES_REGEX, '\n\n')
    .trim();
}
