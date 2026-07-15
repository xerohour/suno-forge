function validateMutationType1(type: unknown) {
    const validTypes: string[] = [
        'viral',
        'emotional',
        'energy',
        'instrumental',
        'tempo-shift-up',
        'tempo-shift-down',
        'mood-invert',
        'genre-blend',
    ];

    return typeof type === 'string' && validTypes.includes(type as string);
}

const VALID_MUTATION_TYPES = new Set([
  'viral',
  'emotional',
  'energy',
  'instrumental',
  'tempo-shift-up',
  'tempo-shift-down',
  'mood-invert',
  'genre-blend',
]);

function validateMutationType2(type: unknown) {
  return typeof type === 'string' && VALID_MUTATION_TYPES.has(type);
}

const VALID_MUTATION_ARRAY = [
  'viral',
  'emotional',
  'energy',
  'instrumental',
  'tempo-shift-up',
  'tempo-shift-down',
  'mood-invert',
  'genre-blend',
];
function validateMutationType3(type: unknown) {
  return typeof type === 'string' && VALID_MUTATION_ARRAY.includes(type);
}

const typeStr = 'mood-invert';
let start = performance.now();
for (let i = 0; i < 1000000; i++) {
  validateMutationType1(typeStr);
}
console.log(`Original (Array creation inside): ${(performance.now() - start).toFixed(2)}ms`);

start = performance.now();
for (let i = 0; i < 1000000; i++) {
  validateMutationType2(typeStr);
}
console.log(`Global Set: ${(performance.now() - start).toFixed(2)}ms`);

start = performance.now();
for (let i = 0; i < 1000000; i++) {
  validateMutationType3(typeStr);
}
console.log(`Global Array: ${(performance.now() - start).toFixed(2)}ms`);
