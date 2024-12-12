import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface RoastFormProps {
  name: string;
  loading: boolean;
  onNameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function RoastForm({ name, loading, onNameChange, onSubmit }: RoastFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 mb-12">
      <p className="text-white">
        Ceritain sedikit tentang diri lu disini (Sombong)
      </p>
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Cerita disini jing..."
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none text-white placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Roast!
            </>
          )}
        </button>
      </div>
    </form>
  );
}