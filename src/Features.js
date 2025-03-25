// 🛠️ CLEANED App.js — Mission moved to dedicated route
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import Features from './Features';
import FactVibes from './FactVibes';
import TrustAndRebuttal from './TrustAndRebuttal';
import SocialHub from './SocialHub';
import TruthThreads from './TruthThreads';
import SocialFeatures from './SocialFeatures';

const radialData = [
  {
    id: 'Misinformation',
    data: [
      { x: 'News Channel A', y: 100 },
      { x: 'News Channel B', y: 85 },
      { x: 'News Channel C', y: 60 },
      { x: 'Social Media X', y: 75 },
      { x: 'Social Media Y', y: 90 },
    ],
  },
];

const GOOGLE_API_KEY = 'AIzaSyCVKJ-igzEgJASzQbXaHwaveCZpDb8ZfaE';

function HomePage() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [likes, setLikes] = useState(0);
  const [helpful, setHelpful] = useState(null);
  const [comment, setComment] = useState('');
  const [submittedComments, setSubmittedComments] = useState([]);

  const handleCheck = async () => {
    if (!input.trim()) return;
    try {
      const res = await fetch(
        `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(
          input
        )}&key=${GOOGLE_API_KEY}`
      );
      const data = await res.json();

      if (data.claims && data.claims.length > 0) {
        const newResults = data.claims.slice(0, 3).map((claim) => {
          const text = claim.text || input;
          const claimReview = claim.claimReview[0];

          return {
            label: claimReview.textualRating || 'UNKNOWN',
            explanation: claimReview.title || 'See more details in the link.',
            url: claimReview.url,
            bias: Math.floor(Math.random() * 100),
            exaggeration: Math.floor(Math.random() * 100),
            inputText: text,
          };
        });
        setResults(newResults);
        setSelectedIndex(null);
      } else {
        setResults([
          {
            label: 'NO MATCH',
            explanation: 'No matching fact-check found.',
            inputText: input,
            bias: Math.floor(Math.random() * 100),
            exaggeration: Math.floor(Math.random() * 100),
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching from Google Fact Check API:', error);
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setSubmittedComments([...submittedComments, comment]);
      setComment('');
    }
  };

  const selectedResult = selectedIndex !== null ? results[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800 font-sans flex flex-col justify-between">
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold tracking-wide">
          <span className="text-gray-600">AI</span>
          <span className="text-blue-500">Factify</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Where Truth is Real</p>
      </header>

      <main className="flex flex-col items-center px-4">
        <section className="max-w-xl w-full">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-2xl font-semibold mb-4">Start Fact-Checking</h2>
            <input
              type="text"
              placeholder="Paste a link or enter a claim..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleCheck}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Analyze
            </button>

            {results.length > 0 && (
              <div className="mt-6">
                {selectedIndex === null ? (
                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <div
                        key={index}
                        className="cursor-pointer bg-gray-50 p-4 rounded shadow hover:bg-gray-100"
                        onClick={() => setSelectedIndex(index)}
                      >
                        <p className="font-medium">Input: <span className="text-gray-700">{result.inputText}</span></p>
                        <p className="text-sm text-gray-500">Click to see full verdict</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded shadow text-left">
                    <button
                      onClick={() => setSelectedIndex(null)}
                      className="text-blue-500 text-sm underline mb-2"
                    >Back to Results</button>
                    <p className="font-medium">Input: <span className="text-gray-700">{selectedResult.inputText}</span></p>
                    <p className={`mt-2 font-bold ${selectedResult.label === 'true' ? 'text-green-600' : 'text-red-600'}`}>Verdict: {selectedResult.label.toUpperCase()}</p>
                    <p className="mt-1 text-sm text-gray-600">Explanation: {selectedResult.explanation}</p>
                    {selectedResult.url && (
                      <a href={selectedResult.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">Read more</a>
                    )}

                    <div className="mt-4">
                      <p className="text-sm text-gray-700">
                        <strong>Bias Score:</strong> <span className="text-blue-600">{selectedResult.bias}%</span>
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Exaggeration Score:</strong> <span className="text-blue-600">{selectedResult.exaggeration}%</span>
                      </p>
                    </div>

                    <div className="mt-6 space-y-2">
                      <div className="flex items-center gap-4">
                        <button
                          className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                          onClick={() => setLikes(likes + 1)}
                        >👍 {likes} Like</button>
                        <button
                          onClick={() => setHelpful('yes')}
                          className={`px-3 py-1 rounded ${helpful === 'yes' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'} hover:bg-blue-100`}
                        >Helpful</button>
                        <button
                          onClick={() => setHelpful('no')}
                          className={`px-3 py-1 rounded ${helpful === 'no' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'} hover:bg-red-100`}
                        >Not Helpful</button>
                      </div>
                      <div className="mt-4">
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Leave a comment..."
                          className="w-full p-2 border border-gray-300 rounded"
                        ></textarea>
                        <button
                          onClick={handleCommentSubmit}
                          className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        >Submit</button>
                        <div className="mt-2 space-y-2">
                          {submittedComments.map((c, i) => (
                            <p key={i} className="text-sm bg-gray-100 p-2 rounded">{c}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="mt-16 w-full max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">
              <span className="text-gray-600">AI</span>
              <span className="text-blue-500">Factify</span> Features
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Explore powerful tools that drive our fact-checking engine: sentiment analysis, multimedia detection, source ranking,
              and more — all designed to empower truth and restore trust.
            </p>
          </div>
          <Features />
        </section>
      </main>

      <footer className="bg-gray-100 mt-10 py-4 shadow-inner">
        <nav className="flex justify-center space-x-6 text-sm text-gray-600 font-medium">
          <a href="#about" className="hover:text-blue-600 transition">About Us</a>
          <a href="#mission" className="hover:text-blue-600 transition">Mission</a>
          <a href="#news" className="hover:text-blue-600 transition">News</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          <a href="#signin" className="hover:text-blue-600 transition">Sign In</a>
          <a href="#kids" className="hover:text-blue-600 transition">Kids</a>
        </nav>
        <p className="text-center text-xs text-gray-400 mt-2">&copy; {new Date().getFullYear()} AIFactify by Ron Echual</p>
      </footer>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/social" element={<SocialHub />} />
        <Route path="/socialhub/rebuttal" element={<TrustAndRebuttal />} />
        <Route path="/socialhub/factvibes" element={<FactVibes />} />
        <Route path="/socialhub/truththreads" element={<TruthThreads />} />
        <Route path="/socialhub/features" element={<SocialFeatures />} />
        <Route path="/about/mission" element={<div className='p-10 text-center text-gray-600'>Mission content coming soon...</div>} />
      </Routes>
    </Router>
  );
}
