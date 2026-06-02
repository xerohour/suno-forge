import { buildStyle } from "./lib/styleEngine";
import { cleanLyricsForProduction } from "./lib/lyricsEngine";
import { Prompt, PromptDNA } from "./types/prompt";

function generatePromptTitle(config: PromptDNA): string {
  const genre = config.genre || 'Music';
  const mood = config.mood || 'Vibes';
  return `${genre.charAt(0).toUpperCase() + genre.slice(1)} - ${mood.charAt(0).toUpperCase() + mood.slice(1)}`;
}

function generateTechnicalName(title: string): string {
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 19).replace(/[-:T]/g, ''); // YYYYMMDDHHMMSS
    const safeTitle = title.toLowerCase().replace(/[^a-z0-9_\s-]/g, ' ').trim().replace(/\s+/g, '_');
    return `${safeTitle}_${timestamp}`;
}

async function buildPromptAsync(config: PromptDNA): Promise<Prompt> {
  const styleConfig: PromptDNA = config.instrumental
    ? { ...config, vocalStyle: undefined }
    : config;
  const style = buildStyle(styleConfig);
  const lyrics = cleanLyricsForProduction(config.lyrics || "");
  const styleTags = (config.styleTags || []).filter((tag) => tag.trim().length > 0);

  const styleParts = [style];
  if (config.language) styleParts.push(`language: ${config.language}`);
  if (config.instrumental) styleParts.push("instrumental only, no vocals");
  if (styleTags.length > 0) styleParts.push(`style tags: ${styleTags.join(", ")}`);
  if (config.negativePrompt?.trim()) styleParts.push(`avoid: ${config.negativePrompt.trim()}`);
  const mergedStyle = styleParts.join(", ");

  const title = config.title?.trim() || generatePromptTitle(config);
  const technicalName = generateTechnicalName(title);


  return {
    title,
    technicalName,
    style: mergedStyle,
    lyrics: config.instrumental ? "" : lyrics,
  };
}

function buildPromptSync(config: PromptDNA): Prompt {
  const styleConfig: PromptDNA = config.instrumental
    ? { ...config, vocalStyle: undefined }
    : config;
  const style = buildStyle(styleConfig);
  const lyrics = cleanLyricsForProduction(config.lyrics || "");
  const styleTags = (config.styleTags || []).filter((tag) => tag.trim().length > 0);

  const styleParts = [style];
  if (config.language) styleParts.push(`language: ${config.language}`);
  if (config.instrumental) styleParts.push("instrumental only, no vocals");
  if (styleTags.length > 0) styleParts.push(`style tags: ${styleTags.join(", ")}`);
  if (config.negativePrompt?.trim()) styleParts.push(`avoid: ${config.negativePrompt.trim()}`);
  const mergedStyle = styleParts.join(", ");

  const title = config.title?.trim() || generatePromptTitle(config);
  const technicalName = generateTechnicalName(title);


  return {
    title,
    technicalName,
    style: mergedStyle,
    lyrics: config.instrumental ? "" : lyrics,
  };
}

const configs: PromptDNA[] = [
  { genre: "synthwave", mood: "dreamy", energy: 0.9, instrumental: true, title: "Night Drive" },
  { genre: "pop", tempo: 120, vocalStyle: "clear diction", lyrics: "[Verse 1]\nHello" },
  { genre: "rock", mood: "intense", energy: 0.95 },
  { genre: "lofi", mood: "chill", tempo: 80, instrumental: true },
  { mood: "ethereal", instrumentation: "piano" }
];

async function runAsync() {
    const start = performance.now();
    for (let i = 0; i < 100000; i++) {
        const config = configs[i % configs.length];
        await buildPromptAsync(config);
    }
    const end = performance.now();
    console.log(`Async time: ${end - start}ms`);
}

function runSync() {
    const start = performance.now();
    for (let i = 0; i < 100000; i++) {
        const config = configs[i % configs.length];
        buildPromptSync(config);
    }
    const end = performance.now();
    console.log(`Sync time: ${end - start}ms`);
}

await runAsync();
runSync();
