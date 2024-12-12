import React from 'react';

interface RoastDisplayProps {
  roast: string;
}

export function RoastDisplay({ roast }: RoastDisplayProps) {
  if (!roast) {
    return (
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 max-w-2xl mx-auto">
        <p className="text-lg leading-relaxed italic">Roast ini 100% di generate oleh Artificial Intelligence (AI) tanpa ada campur tangan pembuat. <br/> <br/> Follow @rendiichtiar on Instagram</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 max-w-2xl mx-auto">
      <p className="text-lg leading-relaxed italic">{roast}</p>

      <div>
      <p className="text-sm text-gray-100 mt-4 text-center">
        Roast ini 100% di generate oleh Artificial Intelligence (AI) tanpa ada campur tangan pembuat website ini.
      </p>
      </div>
    </div>
  );
}