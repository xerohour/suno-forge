const text = `
// Comment 1
  // Comment 2
Line 1

Line 2

// Comment 3
`;
function orig(blueprintLyrics: string): string {
  if (!blueprintLyrics) return '';

  const lines = blueprintLyrics.split('\n');
  const cleanedLines: string[] = [];
  let lastLineWasBlank = false;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('//')) {
      continue;
    }
    if (trimmedLine === '') {
      if (!lastLineWasBlank) {
        cleanedLines.push('');
        lastLineWasBlank = true;
      }
    } else {
      cleanedLines.push(trimmedLine);
      lastLineWasBlank = false;
    }
  }
  return cleanedLines.join('\n').trim();
}

const COMMENT_REGEX = /^\s*\/\/.*$/gm;
const MULTI_BLANK_REGEX = /\n{3,}/g;

function optimized(blueprintLyrics: string): string {
    if (!blueprintLyrics) return '';
    return blueprintLyrics
      .replace(COMMENT_REGEX, '')
      .replace(/[ \t]+$/gm, '')
      .replace(/^[ \t]+/gm, '')
      .replace(MULTI_BLANK_REGEX, '\n\n')
      .trim();
}

let start = performance.now();
for (let i = 0; i < 100000; i++) {
  orig(text);
}
console.log(`Original: ${(performance.now() - start).toFixed(2)}ms`);

start = performance.now();
for (let i = 0; i < 100000; i++) {
  optimized(text);
}
console.log(`Regex Optimized: ${(performance.now() - start).toFixed(2)}ms`);
