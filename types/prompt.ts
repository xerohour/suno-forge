export interface PromptDNA {
  genre?: string
  mood?: string
  energy?: number
  tempo?: number
  theme?: string
  vocalStyle?: string
  structure?: string[]
}

export interface GenerateRequest extends PromptDNA {}

export interface MutateRequest {
  prompt: string
  type: "viral" | "emotional" | "energy"
}

export type PromptConfig = PromptDNA
