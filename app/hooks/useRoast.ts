'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { GeminiService } from '../services/gemini';
import { GEMINI_CONFIG } from '../config/constants';

export function useRoast() {
  const [name, setName] = useState('');
  const [roast, setRoast] = useState('');
  const [loading, setLoading] = useState(false);

  const generateRoast = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error(GEMINI_CONFIG.ERROR_MESSAGES.INVALID_CONTENTS);
      return;
    }

    setLoading(true);
    try {
      const geminiService = GeminiService.getInstance();
      const response = await geminiService.generateRoast(name);
      
      if (response.error) {
        toast.error(response.error);
        setRoast('');
        return;
      }
      
      setRoast(response.text);
      if (!response.text) {
        throw new Error(GEMINI_CONFIG.ERROR_MESSAGES.EMPTY_RESPONSE);
      }
    } catch (error) {
      console.error('Error generating roast:', error);
      toast.error(GEMINI_CONFIG.ERROR_MESSAGES.GENERATION_FAILED);
      setRoast('');
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    roast,
    loading,
    setName,
    generateRoast
  };
}