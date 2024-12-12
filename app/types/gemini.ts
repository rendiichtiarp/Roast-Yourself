export interface GeminiResponse {
    text: string;
    error?: string;
  }
  
  export interface GeminiConfig {
    apiKey: string;
    model: string;
  }