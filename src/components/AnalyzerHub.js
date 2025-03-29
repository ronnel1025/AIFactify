// src/AnalyzerHub.js
import React from 'react';
import { Link } from 'react-router-dom';

function AnalyzerHub() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="text-gray-500">AI</span>
          <span className="text-sky-400">Factify</span>
          <div className="text-sm text-gray-400 italic">Where Truth is Real</div>
        </div>
        <nav className="space-x-4 text-sm text-gray-600 hidden sm:block">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/social-hub" className="hover:underline">Social Hub</Link>
          <Link to="/features" className="hover:underline">Features</Link>
        </nav>
      </header>

      {/* Quadrant Layout */}
      <main className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">🧠 Choose a Tool to Analyze</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Link to="/image-analyzer" className="bg-white hover:shadow-xl border rounded-lg p-6 text-center transition">
            <h3 className="text-xl font-semibold mb-2">🖼 Image Analyzer</h3>
            <p className="text-sm text-gray-500">Detect fake or altered images using AI.</p>
          </Link>

          <Link to="/video" className="bg-white hover:shadow-xl border rounded-lg p-6 text-center transition">
            <h3 className="text-xl font-semibold mb-2">🎬 Video Analyzer</h3>
            <p className="text-sm text-gray-500">Check for deepfakes or edited videos.</p>
          </Link>

          <Link to="/voice" className="bg-white hover:shadow-xl border rounded-lg p-6 text-center transition">
            <h3 className="text-xl font-semibold mb-2">🎙️ Voice Analyzer</h3>
            <p className="text-sm text-gray-500">Analyze voice recordings for authenticity.</p>
          </Link>

          <Link to="/articles" className="bg-white hover:shadow-xl border rounded-lg p-6 text-center transition">
            <h3 className="text-xl font-semibold mb-2">📰 Article Analyzer</h3>
            <p className="text-sm text-gray-500">Check articles for bias, truth, or exaggeration.</p>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} AI Factify™ by Ron Echual — All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default AnalyzerHub;
