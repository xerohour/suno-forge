export interface PromptConfig {
  title?: string
  genre?: string
  mood?: string
  tempo?: number
  instrumentation?: string
  vocalStyle?: string
  production?: string
  energy?: number
  theme?: string
  lyrics?: string
  language?: string
  instrumental?: boolean
  styleTags?: string[]
  negativePrompt?: string
}

export interface PromptDNA extends PromptConfig { }

export interface GenerateRequest extends PromptConfig { }

export interface Prompt {
  title: string
  technicalName: string
  style: string
  lyrics: string
}

// Mutation types for prompt variations
export type MutationType =
  | 'viral'
  | 'emotional'
  | 'energy'
  | 'instrumental'
  | 'tempo-shift-up'
  | 'tempo-shift-down'
  | 'mood-invert'
  | 'genre-blend';

export interface MutateRequest {
  prompt: string
  type: MutationType
}
