import { buildPrompt } from "./lib/promptEngine";

const config = {
  genre: "Synthwave",
  mood: "Retro",
  lyrics: "Test lyrics",
};

async function runBench() {
  const start = performance.now();
  for (let i = 0; i < 10000; i++) {
    await buildPrompt(config);
  }
  const end = performance.now();
  console.log(`Async/Await time: ${(end - start).toFixed(2)} ms`);
}

runBench();
