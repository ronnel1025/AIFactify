// src/SocialFeatures.js
import { useState } from 'react';

export default function SocialFeatures() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const vibes = [
    {
      claim: "The Earth is flat",
      verdict: "FALSE",
    },
    {
      claim: "Vaccines cause autism",
      verdict: "INCORRECT",
    },
    {
      claim: "5G spreads COVID",
      verdict: "FALSE",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        🌐 AIFactify Social Feed
      </h1>

      {/* Fact Vibes Feed */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">🔥 Fact Vibes (Live Public Feed)</h2>
        <ul className="space-y-3">
          {vibes.map((vibe, index) => (
            <li
              key={index}
              onClick={() => alert(`More details coming for: ${vibe.claim}`)}
              className="bg-blue-50 p-4 rounded shadow cursor-pointer hover:bg-blue-100 transition"
            >
              <span className="text-gray-600 italic">Someone just fact-checked</span>{' '}
              <strong className="text-blue-600">“{vibe.claim}”</strong> — Verdict:{' '}
              <span className="text-red-500 font-bold">{vibe.verdict}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Instant Rebuttal Generator */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">⚡ Instant Rebuttal Generator</h2>
        <p className="mb-2">Quick message to counter false claims:</p>
        <div className="bg-gray-100 p-4 rounded shadow text-sm relative">
          Hey, just checked this claim on <strong>AIFactify</strong>: <span className="text-red-600">Verdict is FALSE.</span> Here’s the explanation + sources 🧠💡
          <button
            onClick={() => handleCopy("Hey, just checked this claim on AIFactify: Verdict is FALSE.")}
            className="absolute top-2 right-2 text-blue-600 text-xs hover:underline"
          >
            📋 {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </section>

      {/* Top Fact Heroes */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">🏅 Top Fact Heroes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border p-4 rounded shadow text-center hover:shadow-md transition">
            <p className="font-bold text-blue-500">Bias Buster</p>
            <p className="text-gray-500 text-sm">Exposing media bias consistently</p>
          </div>
          <div className="bg-white border p-4 rounded shadow text-center hover:shadow-md transition">
            <p className="font-bold text-green-600">Medical Truth Advocate</p>
            <p className="text-gray-500 text-sm">Fact-checking health misinformation</p>
          </div>
          <div className="bg-white border p-4 rounded shadow text-center hover:shadow-md transition">
            <p className="font-bold text-purple-600">Youth Misinformation Fighter</p>
            <p className="text-gray-500 text-sm">Educating the next generation</p>
          </div>
        </div>
      </section>

      {/* Community Links */}
      <section className="text-center">
        <h2 className="text-xl font-semibold mb-4">💬 Get Involved</h2>
        <div className="flex flex-col items-center space-y-2">
          <a href="#" className="text-blue-500 hover:underline">Suggest a Claim</a>
          <a href="#" className="text-blue-500 hover:underline">Report Fake Content</a>
          <a href="#" className="text-blue-500 hover:underline">Become a Volunteer</a>
        </div>
      </section>

      <p className="text-center text-sm text-gray-400 mt-10">
        This is a preview of the upcoming social features designed to make fact-checking social, engaging, and educational.
      </p>
    </div>
  );
}
