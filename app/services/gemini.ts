import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { CONFIG } from '../config/env';
import { GEMINI_CONFIG } from '../config/constants';
import type { GeminiResponse } from '../types/gemini';

interface GeminiError {
  message?: string;
}

export class GeminiService {
  private static instance: GeminiService;
  private ai: GoogleGenerativeAI;

  private constructor() {
    if (!CONFIG.GEMINI_API_KEY) {
      throw new Error(GEMINI_CONFIG.ERROR_MESSAGES.NO_API_KEY);
    }
    this.ai = new GoogleGenerativeAI(CONFIG.GEMINI_API_KEY);
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  private generatePrompt(contents: string): string {
    return `Kamu adalah seorang roaster sarkas profesional yang ahli dalam membuat roasting yang sarkas dan pedas dengan bahasa casual indonesia misal: lu dan gua.
    
    Buatkan roasting untuk seseorang yang "${contents}" dengan kriteria berikut:
    
    Gaya bahasa:
    - Gunakan bahasa Indonesia yang casual/gaul tapi menusuk hati (tidak boleh bahasa baku)
    - Sarkas tingkat tinggi tanpa bahasa baku
    - Sarkas tanpa humor`;
  }

  public async generateRoast(contents: string): Promise<GeminiResponse> {
    try {
      const model = this.ai.getGenerativeModel({ 
        model: GEMINI_CONFIG.MODEL,
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.8,
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH  
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
          }
        ]
      });

      const result = await model.generateContent([
        { text: this.generatePrompt(contents) }
      ]);

      const response = await result.response;
      const text = response.text();
      
      if (!text?.trim()) {
        throw new Error(GEMINI_CONFIG.ERROR_MESSAGES.EMPTY_RESPONSE);
      }
      
      return { text: text.trim() };
    } catch (error: unknown) {
      console.error('Gemini API Error:', error);
      
      const geminiError = error as GeminiError;
      
      if (geminiError.message?.includes('blocked due to SAFETY')) {
        return {
          text: "Maaf, konten yang diminta tidak dapat diproses karena melanggar kebijakan keamanan. Coba gunakan kata-kata yang lebih sopan ya!",
          error: 'Coba submit ulang blok!'
        };
      }

      // Menangani error rate limit
      if (geminiError.message?.includes('RATE_LIMIT_EXCEEDED')) {
        return {
          text: "Waduh, terlalu banyak permintaan nih. Tunggu beberapa saat ya sebelum coba lagi!",
          error: 'Lagi banyak yang pake, nanti lagi jing!'
        };
      }

      // Error default
      return {
        text: GEMINI_CONFIG.DEFAULT_RESPONSE,
        error: 'GENERATION_FAILED'
      };
    }
  }
}