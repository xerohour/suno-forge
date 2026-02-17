import { mutatePrompt } from './mutationEngine';

describe('mutatePrompt', () => {
  const basePrompt = 'Write a song about a robot';

  it('should apply viral mutation correctly', () => {
    const result = mutatePrompt(basePrompt, 'viral');
    expect(result).toBe(`${basePrompt}\n\n[Mutation Applied: short, repetitive, catchy hook, high recall]`);
  });

  it('should apply emotional mutation correctly', () => {
    const result = mutatePrompt(basePrompt, 'emotional');
    expect(result).toBe(`${basePrompt}\n\n[Mutation Applied: deep, vulnerable, expressive lyrics]`);
  });

  it('should apply energy mutation correctly', () => {
    const result = mutatePrompt(basePrompt, 'energy');
    expect(result).toBe(`${basePrompt}\n\n[Mutation Applied: fast tempo, aggressive delivery]`);
  });

  it('should return "none" for an unknown mutation type', () => {
    const result = mutatePrompt(basePrompt, 'unknown');
    expect(result).toBe(`${basePrompt}\n\n[Mutation Applied: none]`);
  });

  it('should handle an empty prompt correctly', () => {
    const result = mutatePrompt('', 'viral');
    expect(result).toBe(`\n\n[Mutation Applied: short, repetitive, catchy hook, high recall]`);
  });
});
