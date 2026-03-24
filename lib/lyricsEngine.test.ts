import { cleanLyricsForProduction } from './lyricsEngine';

describe('cleanLyricsForProduction', () => {
  it('should remove comment lines entirely', () => {
    const input = `
// First comment
Some lyrics
  // Indented comment
More lyrics
// Last comment
`;
    const expected = 'Some lyrics\nMore lyrics';
    expect(cleanLyricsForProduction(input)).toBe(expected);
  });

  it('should trim individual lines', () => {
    const input = '   Spaced out lyrics   \n   More spaced lyrics   ';
    const expected = 'Spaced out lyrics\nMore spaced lyrics';
    expect(cleanLyricsForProduction(input)).toBe(expected);
  });

  it('should treat lines with only whitespace as empty lines', () => {
    const input = 'Verse 1\n   \n\t\t\nVerse 2';
    const expected = 'Verse 1\n\nVerse 2';
    expect(cleanLyricsForProduction(input)).toBe(expected);
  });

  it('should collapse multiple empty or whitespace lines into a single blank line (two newlines)', () => {
    const input = 'Line 1\n\n\n\nLine 2\n  \n  \nLine 3';
    const expected = 'Line 1\n\nLine 2\n\nLine 3';
    expect(cleanLyricsForProduction(input)).toBe(expected);
  });

  it('should correctly handle Windows-style CRLF line endings', () => {
    const input = 'Verse 1\r\n\r\n// Comment\r\nVerse 2\r\n  \r\nVerse 3';
    const expected = 'Verse 1\n\nVerse 2\n\nVerse 3';
    expect(cleanLyricsForProduction(input)).toBe(expected);
  });

  it('should correctly handle other non-breaking whitespace characters', () => {
    // Contains \u00A0 (non-breaking space) and \u3000 (ideographic space)
    const input = 'Line 1\n\u00A0 \u3000 \nLine 2\u00A0 \u3000';
    const expected = 'Line 1\n\nLine 2';
    expect(cleanLyricsForProduction(input)).toBe(expected);
  });

  it('should handle completely empty input', () => {
    expect(cleanLyricsForProduction('')).toBe('');
    expect(cleanLyricsForProduction('   \n  \n  ')).toBe('');
    expect(cleanLyricsForProduction(' \r\n \r\n \r\n ')).toBe('');
  });
});
