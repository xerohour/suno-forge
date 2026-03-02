export function getComplexityLabel(complexity: number): string {
  if (complexity > 75) {
    return "High";
  }
  if (complexity > 40) {
    return "Medium";
  }
  return "Low";
}
