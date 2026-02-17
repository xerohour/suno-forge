export interface PromptConfig {
  genre: string
  mood: string
  tempo?: number
  instrumentation?: string
  vocalStyle?: string;
  production?: string;
  energy?: number
  theme?: string
  lyrics?: string
}

export interface PromptDNA extends PromptConfig {}

export interface GenerateRequest extends PromptConfig {}
