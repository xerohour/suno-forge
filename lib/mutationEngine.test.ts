import { mutatePrompt } from './mutationEngine';

describe('mutationEngine', () => {
  const basePrompt = 'synthwave, nostalgic, 100 BPM, mid energy, smooth vocals';

  describe('viral mutation', () => {
    it('should add viral characteristics', () => {
      const result = mutatePrompt(basePrompt, 'viral');
      expect(result).toContain('catchy hook');
      expect(result).toContain('high recall');
      expect(result).toContain('earworm melody');
    });
  });

  describe('emotional mutation', () => {
    it('should enhance emotional depth', () => {
      const result = mutatePrompt(basePrompt, 'emotional');
      expect(result).toContain('vulnerable');
      expect(result).toContain('heartfelt');
      expect(result).toContain('emotional resonance');
    });
  });

  describe('energy mutation', () => {
    it('should boost energy level', () => {
      const result = mutatePrompt(basePrompt, 'energy');
      expect(result).toContain('high energy');
      expect(result).toContain('intense');
      expect(result).toContain('driving rhythm');
    });
  });

  describe('instrumental mutation', () => {
    it('should remove vocal references', () => {
      const result = mutatePrompt(basePrompt, 'instrumental');
      expect(result).not.toContain('smooth vocals');
      expect(result).toContain('instrumental only');
      expect(result).toContain('no vocals');
    });
  });

  describe('tempo-shift-up mutation', () => {
    it('should increase tempo by 20 BPM', () => {
      const result = mutatePrompt(basePrompt, 'tempo-shift-up');
      expect(result).toContain('120 BPM');
      expect(result).not.toContain('100 BPM');
    });

    it('should cap tempo at 200 BPM', () => {
      const highTempoPrompt = 'rock, energetic, 190 BPM';
      const result = mutatePrompt(highTempoPrompt, 'tempo-shift-up');
      expect(result).toContain('200 BPM');
    });

    it('should add uptempo descriptor if no BPM found', () => {
      const noBpmPrompt = 'jazz, smooth';
      const result = mutatePrompt(noBpmPrompt, 'tempo-shift-up');
      expect(result).toContain('uptempo');
      expect(result).toContain('faster pace');
    });
  });

  describe('tempo-shift-down mutation', () => {
    it('should decrease tempo by 20 BPM', () => {
      const result = mutatePrompt(basePrompt, 'tempo-shift-down');
      expect(result).toContain('80 BPM');
      expect(result).not.toContain('100 BPM');
    });

    it('should floor tempo at 40 BPM', () => {
      const lowTempoPrompt = 'ambient, calm, 50 BPM';
      const result = mutatePrompt(lowTempoPrompt, 'tempo-shift-down');
      expect(result).toContain('40 BPM');
    });

    it('should add downtempo descriptor if no BPM found', () => {
      const noBpmPrompt = 'folk, acoustic';
      const result = mutatePrompt(noBpmPrompt, 'tempo-shift-down');
      expect(result).toContain('downtempo');
      expect(result).toContain('slower pace');
    });
  });

  describe('mood-invert mutation', () => {
    it('should invert happy to melancholic', () => {
      const happyPrompt = 'pop, happy, upbeat';
      const result = mutatePrompt(happyPrompt, 'mood-invert');
      expect(result).toContain('melancholic');
      expect(result).not.toContain('happy');
    });

    it('should invert dark to bright', () => {
      const darkPrompt = 'ambient, dark, mysterious';
      const result = mutatePrompt(darkPrompt, 'mood-invert');
      expect(result).toContain('bright');
      expect(result).not.toContain('dark');
    });

    it('should invert calm to energetic', () => {
      const calmPrompt = 'lofi, calm, relaxed';
      const result = mutatePrompt(calmPrompt, 'mood-invert');
      expect(result).toContain('energetic');
      expect(result).not.toContain('calm');
    });
  });

  describe('genre-blend mutation', () => {
    it('should add fusion elements', () => {
      const result = mutatePrompt(basePrompt, 'genre-blend');
      expect(result).toContain('genre fusion');
      expect(result).toContain('experimental blend');
      expect(result).toContain('cross-genre');
    });
  });

  describe('error handling', () => {
    it('should throw error for unknown mutation type', () => {
      expect(() => {
        mutatePrompt(basePrompt, 'unknown' as any);
      }).toThrow('Unknown mutation type');
    });
  });
});

