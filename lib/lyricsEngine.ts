/**
 * Cleans a "blueprint" lyric string into a "production" string
 * by removing comments and normalizing whitespace.
 * This is based on the Blueprint-to-Production workflow from the compendium.
 * @param blueprintLyrics The raw lyrics, possibly with comments and extra whitespace.
 * @returns A production-ready lyric string.
 */
export function cleanLyricsForProduction(blueprintLyrics: string): string {
  if (!blueprintLyrics) {
    return "";
  }

  const lines = blueprintLyrics.split("\n");
  const cleanedLines: string[] = [];
  let lastLineWasBlank = false;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Rule 3: Remove Narrative Noise (by stripping comment lines)
    if (trimmedLine.startsWith("//")) {
      continue;
    }

    // Ensure blank lines are respected for model separation but not duplicated
    if (trimmedLine === "") {
      if (!lastLineWasBlank) {
        cleanedLines.push("");
        lastLineWasBlank = true;
      }
    } else {
      // This is a content line
      cleanedLines.push(trimmedLine);
      lastLineWasBlank = false;
    }
  }

  // Join the cleaned lines and trim any leading/trailing whitespace from the whole block
  return cleanedLines.join("\n").trim();
}
