export const GEMINI_CONFIG = {
    MODEL: 'gemini-pro',
    ERROR_MESSAGES: {
      NO_API_KEY: 'Waduh! API key Gemini belum dikonfigurasi nih. Coba cek .env file kamu ya!',
      GENERATION_FAILED: 'Gatau, gw lagi cape roasting lu.',
      INVALID_CONTENTS: 'Masukin cerita lu dulu goblok!',
      EMPTY_RESPONSE: 'Ga abis pikir mau roasting apaan, hidup lo kaya sampah!'
    },
    DEFAULT_RESPONSE: "LU MONYET!",
  } as const;