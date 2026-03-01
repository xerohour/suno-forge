import { mutatePrompt } from "./lib/mutationEngine";

const iterations = 100000;
const testPrompt = "happy, calm, light, uplifting, energetic, sad, dark, aggressive";

console.log(`Benchmarking 'mood-invert' with ${iterations} iterations...`);

const start = performance.now();

for (let i = 0; i < iterations; i++) {
  mutatePrompt(testPrompt, 'mood-invert');
}

const end = performance.now();
const duration = end - start;
const opsPerSec = Math.round(iterations / (duration / 1000));

console.log(`Duration: ${duration.toFixed(2)}ms`);
console.log(`Speed: ${opsPerSec.toLocaleString()} ops/sec`);
