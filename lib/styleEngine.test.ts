// lib/styleEngine.test.ts

import { getMusicalStyle, buildStyle } from './styleEngine'; // Assuming styleEngine has an export like this

describe('styleEngine', () => {
  describe('getMusicalStyle', () => {
    it('should throw an error for a non-existent musical style', () => {
      expect(() => getMusicalStyle('NonExistentStyle')).toThrow('Musical style "NonExistentStyle" not found.');
    });

    it('should return the correct descriptors for "Synthwave" musical style', () => {
      const synthwaveStyle = getMusicalStyle('Synthwave');
      expect(synthwaveStyle).toEqual({
        instruments: ["synthesizer", "drum machine", "bass guitar", "retro pads"],
        minTempo: 100,
        maxTempo: 140,
        descriptor: "retro 80s",
      });
    });
  });

  describe('buildStyle', () => {
    it('should build a style string for Synthwave with default settings', () => {
      const config = { genre: 'Synthwave' };
      const style = buildStyle(config);
      
      expect(style).toContain('Synthwave');
      expect(style).toContain('retro 80s');
      expect(style).toContain('synthesizer, drum machine, bass guitar, retro pads');
      expect(style).toContain('mid energy');
      expect(style).toContain('studio quality, clear vocals');
      
      // Check tempo range
      const tempoMatch = style.match(/(\d+) BPM/);
      const tempo = parseInt(tempoMatch![1]);
      expect(tempo).toBeGreaterThanOrEqual(100);
      expect(tempo).toBeLessThanOrEqual(140);
    });

    it('should build a style string with custom mood and tempo', () => {
      const config = { 
        genre: 'Pop', 
        mood: 'Upbeat', 
        tempo: 125,
        energy: 0.9
      };
      const style = buildStyle(config);
      
      expect(style).toContain('Pop');
      expect(style).toContain('Upbeat');
      expect(style).toContain('125 BPM');
      expect(style).toContain('high energy');
      expect(style).toContain('catchy');
    });

    it('should handle low energy and avoid duplicate descriptors', () => {
      const config = { 
        genre: 'Lofi', 
        mood: 'Chill vibes', 
        energy: 0.2
      };
      const style = buildStyle(config);
      
      expect(style).toContain('Lofi');
      expect(style).toContain('Chill vibes');
      expect(style).toContain('low energy');
      // 'chill' is the descriptor for lofi, it should be excluded if 'Chill vibes' is the mood
      // Wait, the logic is: (mood || "").toLowerCase().includes(genreInfo.descriptor) ? "" : genreInfo.descriptor
      // "chill vibes".includes("chill") is true, so it should return "" for the descriptor part.
      expect(style.toLowerCase()).not.toMatch(/chill, chill vibes/);
    });

    it('should default to Pop if genre is unknown', () => {
      const config = { genre: 'UnknownGenre' };
      const style = buildStyle(config);
      
      expect(style).toContain('UnknownGenre');
      expect(style).toContain('catchy'); // Pop descriptor
      expect(style).toContain('mid energy');
    });
  });
});
