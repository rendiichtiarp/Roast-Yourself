// Environment configuration
export const CONFIG = {
    GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
} as const;

// Validation
if (!CONFIG.GEMINI_API_KEY) {
    console.error('Missing GEMINI_API_KEY environment variable');
}