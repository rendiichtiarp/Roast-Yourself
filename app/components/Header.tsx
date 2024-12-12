import React from 'react';
import { Flame } from 'lucide-react';

export function Header() {
  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-6">
        <Flame className="w-12 h-12 text-orange-500 animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-600 text-transparent bg-clip-text">
          Roast Yourself
        </h1>
      </div>
    </>
  );
}