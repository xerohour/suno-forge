import { MutationType } from "@/types/prompt";

/**
 * Applies a mutation to a prompt string, transforming it based on the mutation type.
 * Mutations can alter mood, tempo, instrumentation, or overall character of the prompt.
 */
export function mutatePrompt(prompt: string, type: MutationType): string {
  const mutations: Record<MutationType, (p: string) => string> = {
    viral: (p) => {
      // Add viral characteristics: short, catchy, repetitive
      const viralElements = "short, repetitive, catchy hook, high recall, earworm melody";
      return `${p}, ${viralElements}`;
    },

    emotional: (p) => {
      // Enhance emotional depth
      const emotionalElements =
        "deep, vulnerable, expressive lyrics, heartfelt delivery, emotional resonance";
      return `${p}, ${emotionalElements}`;
    },

    energy: (p) => {
      // Boost energy level
      const energyElements =
        "fast tempo, aggressive delivery, high energy, intense, driving rhythm";
      return `${p}, ${energyElements}`;
    },

    instrumental: (p) => {
      // Convert to instrumental by removing vocal references
      let result = p.replace(/\b(vocal|vocals|singing|lyrics|voice|sung)\b[^,]*/gi, "");
      // Clean up multiple commas and extra spaces
      result = result
        .replace(/,\s*,+/g, ",")
        .replace(/^,\s*|\s*,$/g, "")
        .trim();
      return `${result}, instrumental only, no vocals`;
    },

    "tempo-shift-up": (p) => {
      // Increase tempo references
      const tempoMatch = p.match(/(\d+)\s*BPM/i);
      if (tempoMatch) {
        const currentTempo = parseInt(tempoMatch[1]);
        const newTempo = Math.min(currentTempo + 20, 200);
        return p.replace(/\d+\s*BPM/i, `${newTempo} BPM`);
      }
      return `${p}, uptempo, faster pace`;
    },

    "tempo-shift-down": (p) => {
      // Decrease tempo references
      const tempoMatch = p.match(/(\d+)\s*BPM/i);
      if (tempoMatch) {
        const currentTempo = parseInt(tempoMatch[1]);
        const newTempo = Math.max(currentTempo - 20, 40);
        return p.replace(/\d+\s*BPM/i, `${newTempo} BPM`);
      }
      return `${p}, downtempo, slower pace`;
    },

    "mood-invert": (p) => {
      // Invert mood descriptors using placeholders to avoid circular replacements
      const moodMap: Record<string, string> = {
        happy: "melancholic",
        sad: "uplifting",
        dark: "bright",
        light: "dark",
        uplifting: "somber",
        melancholic: "joyful",
        energetic: "calm",
        calm: "energetic",
        aggressive: "gentle",
        gentle: "intense",
      };

      // Use placeholders to avoid circular replacements
      let result = p;
      const placeholder = "__MOOD_PLACEHOLDER_";
      const replacements: Array<[string, string]> = [];

      // First pass: replace with placeholders
      Object.entries(moodMap).forEach(([original, inverted], index) => {
        const regex = new RegExp(`\\b${original}\\b`, "gi");
        const tempPlaceholder = `${placeholder}${index}__`;
        result = result.replace(regex, tempPlaceholder);
        replacements.push([tempPlaceholder, inverted]);
      });

      // Second pass: replace placeholders with actual values
      replacements.forEach(([tempPlaceholder, inverted]) => {
        result = result.replace(new RegExp(tempPlaceholder, "g"), inverted);
      });

      return result;
    },

    "genre-blend": (p) => {
      // Add fusion elements
      const fusionElements = "genre fusion, experimental blend, cross-genre elements";
      return `${p}, ${fusionElements}`;
    },
  };

  const mutationFn = mutations[type];
  if (!mutationFn) {
    throw new Error(`Unknown mutation type: ${type}`);
  }

  return mutationFn(prompt);
}
