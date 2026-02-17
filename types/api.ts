// API Request/Response Types
export interface GenerateResponse {
  prompt: {
    title: string;
    technicalName: string;
    style: string;
    lyrics: string;
  };
}

export interface MutateResponse {
  mutated: string;
}

export interface BatchRequest {
  config: Record<string, unknown>;
  count: number;
}

export interface BatchResponse {
  prompts: Array<{
    title: string;
    technicalName: string;
    style: string;
    lyrics: string;
  }>;
}

export interface VisionRequest {
  imageDescription: string;
  style?: string;
}

export interface VisionResponse {
  prompt: {
    title: string;
    technicalName: string;
    style: string;
    lyrics: string;
  };
}

export interface ErrorResponse {
  error: string;
  details?: string;
  code?: string;
}
