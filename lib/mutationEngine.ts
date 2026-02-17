export function mutatePrompt(prompt: string, type: string) {
  const mutations: Record<string, string> = {
    viral: "short, repetitive, catchy hook, high recall",
    emotional: "deep, vulnerable, expressive lyrics",
    energy: "fast tempo, aggressive delivery",
  }

  return `${prompt}\n\n[Mutation Applied: ${mutations[type] || "none"}]`
}
