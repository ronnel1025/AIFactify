// src/SocialHub.js
import { Link } from 'react-router-dom';

export default function SocialHub() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col justify-between">
      <header className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center">
        <Link to="/" className="text-3xl font-bold tracking-wide mb-4 sm:mb-0">
          <span className="text-gray-500">AI</span>
          <span className="text-sky-400">Factify</span>
        </Link>
        <p className="text-sm text-gray-400 italic">Where Truth is Real</p>
        <nav className="flex space-x-4 text-sm text-gray-600">
          <Link to="/articles" className="hover:text-sky-400">Articles</Link>
          <Link to="/voice" className="hover:text-sky-400">Voice</Link>
          <Link to="/media" className="hover:text-sky-400">Media</Link>
          <Link to="/link" className="hover:text-sky-400">Links</Link>
        </nav>
      </header>

      <main className="flex-grow p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-gray-500">Social</span> <span className="text-sky-400">Hub</span>
        </h1>
        <p className="mb-6 text-gray-600 max-w-xl mx-auto">
          Explore how truth spreads through community interactions, facts, and constructive rebuttals.
        </p>

        <div className="mt-6 max-w-lg mx-auto flex">
          <input
            type="text"
            placeholder="Quick Search & Analyze"
            className="w-full border border-gray-300 rounded-l-lg py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          <button className="bg-sky-400 text-white py-3 px-4 rounded-r-lg hover:bg-sky-500 transition">
            Search
          </button>
        </div>

        <div className="mt-10 space-y-4 max-w-md mx-auto">
          <Link to="/socialhub/rebuttal" className="block bg-sky-50 text-sky-600 py-2 px-4 rounded-lg hover:bg-sky-100">
            💬 Trust & Rebuttal
          </Link>
          <Link to="/socialhub/truththreads" className="block bg-green-50 text-green-600 py-2 px-4 rounded-lg hover:bg-green-100">
            🧵 Truth Threads
          </Link>
          <Link to="/socialhub/factvibes" className="block bg-purple-50 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-100">
            🔥 Fact Vibes Feed
          </Link>
        </div>

        <div className="mt-10 text-sm text-gray-500 italic">
          💡 Tip: See what people are checking, debating, and busting — live!
        </div>
      </main>

      <footer className="bg-gray-50 py-4 border-t border-gray-200 text-center text-sm text-gray-400">
        <nav className="flex justify-center space-x-4 mb-2">
          <Link to="/about" className="hover:text-gray-500">About Us</Link>
          <Link to="/contact" className="hover:text-gray-500">Contact Us</Link>
          <Link to="/mission" className="hover:text-gray-500">Mission</Link>
        </nav>
        &copy; {new Date().getFullYear()} AIFactify™ is a registered idea by Ron Echual — All Rights Reserved.
      </footer>
    </div>
  );
}
