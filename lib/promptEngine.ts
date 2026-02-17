import { buildStyle } from './styleEngine';
import { generateLyrics } from './lyricsEngine';
import { PromptConfig } from '../types/prompt';

export function buildPrompt(config: PromptConfig) {
  const style = buildStyle(config);
  const lyrics = generateLyrics(config);

  return `
[Style of Music]
${style}

[Lyrics]
[Title: ${config.theme || 'Untitled Song'}]
${lyrics}
`;
}
