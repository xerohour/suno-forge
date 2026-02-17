// lib/styleEngine.test.ts

import { getMusicalStyle } from './styleEngine'; // Assuming styleEngine has an export like this

describe('styleEngine', () => {
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
