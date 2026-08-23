
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

  let result = "";
  let lastLineWasBlank = false;
  let startIndex = 0;
  const len = blueprintLyrics.length;

  // Optimization: avoids expensive string allocation by replacing `.split('\n')` and `.trim()` with zero-allocation index tracking
  while (startIndex < len) {
    let endIndex = blueprintLyrics.indexOf('\n', startIndex);
    if (endIndex === -1) {
      endIndex = len;
    }

    let lineStart = startIndex;
    let lineEnd = endIndex;

    // trim left (spaces, tabs, carriage return)
    while (lineStart < lineEnd && (blueprintLyrics.charCodeAt(lineStart) === 32 || blueprintLyrics.charCodeAt(lineStart) === 9 || blueprintLyrics.charCodeAt(lineStart) === 13)) {
      lineStart++;
    }
    // trim right (spaces, tabs, carriage return)
    while (lineEnd > lineStart && (blueprintLyrics.charCodeAt(lineEnd - 1) === 32 || blueprintLyrics.charCodeAt(lineEnd - 1) === 9 || blueprintLyrics.charCodeAt(lineEnd - 1) === 13)) {
      lineEnd--;
    }

    const trimmedLength = lineEnd - lineStart;

    if (trimmedLength > 0) {
      // Rule 3: Remove Narrative Noise (by stripping comment lines). Check for '//'
      if (trimmedLength >= 2 && blueprintLyrics.charCodeAt(lineStart) === 47 && blueprintLyrics.charCodeAt(lineStart + 1) === 47) {
        startIndex = endIndex + 1;
        continue;
      }

      if (result.length > 0) result += '\n';
      result += blueprintLyrics.substring(lineStart, lineEnd);
      lastLineWasBlank = false;
    } else {
      // Ensure blank lines are respected for model separation but not duplicated
      if (!lastLineWasBlank && result.length > 0) {
        result += '\n';
        lastLineWasBlank = true;
      }
    }

    startIndex = endIndex + 1;
  }

  // Trim trailing newline if we ended on a blank line
  if (lastLineWasBlank && result.length > 0) {
     return result.substring(0, result.length - 1);
  }

  return result;
}
