// src/TruthThreads.js

import { Link } from 'react-router-dom';

export default function TruthThreads() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col justify-between">
      <header className="p-6 border-b border-gray-200 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold tracking-wide">
          <span className="text-gray-400">AI</span>
          <span className="text-blue-400">Factify</span>
        </Link>
        <p className="text-sm text-gray-400 italic">Where Truth is Real</p>
        {/* Menu Links */}
        <nav className="space-x-4 text-sm text-gray-600 hidden sm:block">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/social-hub" className="hover:text-blue-400 transition">Social Hub</Link>
          <Link to="/about" className="hover:text-blue-400 transition">About</Link>
        </nav>
      </header>

      <main className="flex-grow p-6">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-gray-500">Truth</span>{' '}
            <span className="text-blue-400">Threads</span>
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Explore the most debated claims and how the community responds with truth, facts, and respectful rebuttals.
          </p>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/social/rebuttal"
            className="text-blue-500 underline text-sm hover:text-blue-600 transition"
          >
            → Dive into Trust & Rebuttal
          </Link>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto mt-8">
          {/* List of threads, each with Claim and Verdict */}
          {/* Simulated list, can be dynamic from your backend */}
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Claim: "Climate change is caused by human activities"</h2>
            <p className="text-sm text-gray-500 mb-2">Verdict: True</p>
            <p className="text-gray-700 mb-4">
              Explanation: Multiple studies confirm that human activities, such as fossil fuel burning and deforestation, are significant drivers of climate change.
            </p>
            <p className="text-sm text-blue-500">Bias: Low | Exaggeration: Minimal</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Claim: "Vaccines cause autism"</h2>
            <p className="text-sm text-gray-500 mb-2">Verdict: False</p>
            <p className="text-gray-700 mb-4">
              Explanation: Numerous studies have debunked any connection between vaccines and autism.
            </p>
            <p className="text-sm text-blue-500">Bias: Moderate | Exaggeration: High</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-4 border-t border-gray-200 text-center text-sm text-gray-600">
        <div className="flex justify-center space-x-6">
          <Link to="/" className="hover:text-blue-400 transition">🏠 AIFactify</Link>
          <Link to="/social-hub" className="hover:text-blue-400 transition">🌐 Social Hub</Link>
          <Link to="/socialhub/rebuttal" className="hover:text-blue-400 transition">💬 Rebuttal</Link>
          <Link to="/socialhub/factvibes" className="hover:text-blue-400 transition">🔥 Fact Vibes</Link>
        </div>
      </footer>
    </div>
  );
}
