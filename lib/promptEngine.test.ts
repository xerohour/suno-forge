// lib/promptEngine.test.ts
import { describe, it, expect } from "bun:test";
import { buildPrompt } from './promptEngine';

describe('promptEngine', () => {
  it('should include the correct style and lyrics in the generated prompt', async () => {
    const config = {
      genre: 'Synthwave',
      mood: 'Retro', // mood is used in buildStyle
      lyrics: 'Some lyrics',
    };

    const prompt = await buildPrompt(config);

    // Verify style contains expected descriptors from the real styleEngine
    expect(prompt.style).toContain('nostalgic 80s');
    expect(prompt.style).toContain('Synthwave');
    expect(prompt.style).toContain('Retro'); // mood

    // Verify lyrics
    expect(prompt.lyrics).toContain('Some lyrics');

    // Verify structure
    expect(prompt.title).toBeDefined();
    expect(prompt.technicalName).toBeDefined();
  });
});
