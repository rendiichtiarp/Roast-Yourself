'use client'

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { RoastForm } from './components/RoastForm';
import { RoastDisplay } from './components/RoastDisplay';
import { useRoast } from './hooks/useRoast';

export default function App() {
  const { name, roast, loading, setName, generateRoast } = useRoast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-800 via-red-900 to-red-950 text-orange-200">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="w-full max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Header />
          <RoastForm
            name={name}
            loading={loading}
            onNameChange={setName}
            onSubmit={generateRoast}
          />
          <RoastDisplay roast={roast} />
        </div>
      </div>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          className: 'text-sm sm:text-base',
          duration: 3000,
        }} 
      />
    </div>
  );
}