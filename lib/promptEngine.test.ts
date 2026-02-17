// lib/promptEngine.test.ts

import { buildPrompt } from './promptEngine';
import * as styleEngine from './styleEngine';

// Mock the styleEngine.buildStyle function
jest.mock('./styleEngine', () => ({
  ...jest.requireActual('./styleEngine'),
  buildStyle: jest.fn(),
}));

// Mock the lyricsEngine.generateLyrics function
jest.mock('./lyricsEngine', () => ({
  generateLyrics: jest.fn(() => 'Mocked lyrics here.'),
}));

describe('promptEngine', () => {
  it('should include the correct style descriptors for \'Synthwave\' in the generated prompt', () => {
    // Mock buildStyle to return a predictable string for Synthwave
    (styleEngine.buildStyle as jest.Mock).mockReturnValueOnce(
      'synthwave, retro 80s, 120 BPM, mid energy, synthesizer, drum machine, bass guitar, retro pads, studio quality, clear vocals'
    );

    const config = {
      genre: 'Synthwave',
      theme: 'Neon City Night',
    };

    const prompt = buildPrompt(config);

    expect(prompt).toContain('retro 80s');
    expect(prompt).toContain('synthwave');
    expect(prompt).toContain('Neon City Night');
    expect(prompt).toContain('Mocked lyrics here.');
  });
});
