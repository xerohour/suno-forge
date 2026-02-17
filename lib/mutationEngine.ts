export function mutatePrompt(prompt: string, type: string) {
  switch (type) {
    case "viral":
      return prompt.replace(/\n/g, "\n") + "\n(repetitive hook, catchy phrasing)"
    case "emotional":
      return prompt + "\n(deeper emotional tone, vulnerable lyrics)"
    case "energy":
      return prompt + "\n(faster tempo, aggressive delivery)"
    default:
      return prompt
  }
}
