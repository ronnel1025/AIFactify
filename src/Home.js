// src/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ResponsiveRadialBar } from '@nivo/radial-bar';

// ✅ Only keep ONE radialData declaration
const radialData = [
  {
    id: 'Bias Score',
    data: [
      { x: 'Google FC', y: 80 },
      { x: 'Snopes', y: 85 },
      { x: 'PolitiFact', y: 90 }
    ]
  }
];

function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [likes, setLikes] = useState(0);
  const [notHelpful, setNotHelpful] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleAnalyze = () => {
    if (!query.trim()) return;

    setResults([
      {
        source: 'Google Fact Check',
        verdict: 'False',
        bias: 80,
        exaggeration: 70,
        summary: 'The claim "Earth is flat" is scientifically disproven.',
        url: 'https://www.google.com/search?q=Earth+is+flat+fact+check',
      },
      {
        source: 'Snopes',
        verdict: 'False',
        bias: 85,
        exaggeration: 75,
        summary: 'Flat Earth theory has been repeatedly debunked by experts.',
        url: 'https://www.snopes.com/fact-check/flat-earth/',
      },
      {
        source: 'PolitiFact',
        verdict: 'Pants on Fire',
        bias: 90,
        exaggeration: 95,
        summary: 'There is no evidence supporting a flat Earth model.',
        url: 'https://www.politifact.com/factchecks/2017/jan/26/facebook-posts/flat-earth-claims-are-off-mark/',
      },
    ]);
  };

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    setComments([...comments, { name: 'Anonymous', text: comment }]);
    setComment('');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      <Helmet>
        <title>AI Factify - Where Truth is Real</title>
        <meta name="description" content="Analyze claims with AI-powered fact-checking." />
        <meta name="author" content="Ron Echual" />
        <meta name="copyright" content="© 2025 Ron Echual. All rights reserved." />
      </Helmet>
  
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="text-gray-500">AI</span>
          <span className="text-sky-400">Factify</span>
          <div className="text-sm text-gray-400 italic">Where Truth is Real</div>
        </div>
        <nav className="space-x-4 text-sm text-gray-600 hidden sm:block">
          <a href="/" className="hover:underline">Home</a>
          <a href="/socialhub" className="hover:underline">Social Hub</a>
          <a href="/about" className="hover:underline">About</a>
        </nav>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
  {/* 🔍 Quick Analyzer */}
  <section className="text-center mb-10">
    <h2 className="text-3xl font-bold mb-2">Start Analyzing Claims</h2>
    <p className="text-gray-600 mb-6">
      Enter a statement or paste a link below to check for truth, bias, or exaggeration.
    </p>

    <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Try: "Earth is flat" or paste a link like "https://cnn.com/article"'
        className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-md text-sm"
      />
      <button
        onClick={handleAnalyze}
        className="bg-sky-400 text-white px-6 py-2 rounded-md hover:bg-sky-500 transition"
      >
        Analyze
      </button>
    </div>
  </section>

  {/* ✅ Result Cards RIGHT after input */}
  {results.length > 0 && (
    <section className="space-y-6 mb-12">
      {results.map((result, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-1">{result.source}</h3>
          <p className="text-sm text-gray-600 mb-2">{result.summary}</p>
          <p className="text-sm">Verdict: <strong>{result.verdict}</strong></p>
          <p className="text-sm">Bias Score: <span className="text-yellow-600">{result.bias}%</span></p>
          <p className="text-sm mb-2">Exaggeration: <span className="text-red-500">{result.exaggeration}%</span></p>

          <div className="flex flex-wrap gap-4 items-center mb-2 text-sm">
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              🔗 Read More
            </a>
            <button className="text-blue-500 hover:underline">Share to Facebook</button>
            <button className="text-blue-500 hover:underline">Share to X</button>
          </div>

          <div className="flex flex-wrap space-x-2 text-sm">
            <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">👍 Like</button>
            <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">👎 Not Helpful</button>
            <input
              maxLength={250}
              placeholder="Comment (max 250 chars)"
              className="flex-grow px-2 py-1 border rounded text-xs"
            />
          </div>
        </div>
      ))}
    </section>
  )}
</main>

        {/* Bias Graph */}
        <section className="mb-12 bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">📊 Bias Score Overview</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveRadialBar
              data={radialData}
              keys={['y']}
              indexBy="x"
              maxValue={100}
              margin={{ top: 20, right: 40, bottom: 40, left: 40 }}
              padding={0.4}
              radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
              circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
              enableLabels={true}
              colors={{ scheme: 'set2' }}
              animate={true}
            />
          </div>
        </section>

        {/* Fake News Overview */}
        <section className="mb-16 bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold mb-2 text-center text-gray-700">🌐 Where Most Fake News Comes From</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-sm">
            <div>
              <h4 className="text-center mb-2 text-gray-600">By Source</h4>
              <ul className="space-y-2 text-gray-500">
                <li>📱 Social Media — <span className="text-red-500 font-semibold">42%</span></li>
                <li>📰 News Outlets — <span className="text-yellow-600 font-semibold">28%</span></li>
                <li>🌐 Random Websites — <span className="text-orange-500 font-semibold">21%</span></li>
                <li>💬 Messaging Apps — <span className="text-blue-400 font-semibold">9%</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-center mb-2 text-gray-600">Top Fake News Countries</h4>
              <ul className="space-y-2 text-gray-500">
                <li>🇺🇸 United States — <span className="text-red-500 font-semibold">35%</span></li>
                <li>🇮🇳 India — <span className="text-yellow-600 font-semibold">22%</span></li>
                <li>🇷🇺 Russia — <span className="text-orange-500 font-semibold">18%</span></li>
                <li>🇵🇭 Philippines — <span className="text-blue-400 font-semibold">12%</span></li>
                <li>🌍 Others — <span className="text-gray-500 font-semibold">13%</span></li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-xs text-center text-gray-400 italic">
            Data estimates are based on historical global trends and third-party analysis.
          </p>
        </section>

 
        {/* Result Cards */}
        {results.length > 0 && (
          <section className="space-y-6">
            {results.map((result, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-semibold mb-1">{result.source}</h3>
                <p className="text-sm text-gray-600 mb-2">{result.summary}</p>
                <p className="text-sm">Verdict: <strong>{result.verdict}</strong></p>
                <p className="text-sm">Bias Score: <span className="text-yellow-600">{result.bias}%</span></p>
                <p className="text-sm mb-2">Exaggeration: <span className="text-red-500">{result.exaggeration}%</span></p>

                <div className="flex flex-wrap gap-4 items-center mb-2 text-sm">
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    🔗 Read More
                  </a>
                  <button className="text-blue-500 hover:underline">Share to Facebook</button>
                  <button className="text-blue-500 hover:underline">Share to X</button>
                </div>

                <div className="flex flex-wrap space-x-2 text-sm mt-2">
                  <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">👍 Like</button>
                  <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">👎 Not Helpful</button>
                  <input
                    maxLength={250}
                    placeholder="Comment (max 250 chars)"
                    className="flex-grow px-2 py-1 border rounded text-xs"
                  />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ✅ Trusted News Spotlight */}
<section className="mt-20 mb-16 bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
  <h3 className="text-xl font-bold mb-6 text-gray-700 text-center">
    🗞️ Trusted News Spotlight
  </h3>

  <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 space-y-4">
    <h4 className="text-lg font-semibold text-blue-500">
      Climate scientists agree Earth is warming
    </h4>

    <p className="text-sm text-gray-600">
      Published by <span className="font-medium text-gray-800">Reuters</span> — Verified on{' '}
      <span className="italic text-gray-500">March 24, 2025</span>
    </p>

    <p className="text-sm text-gray-700 leading-relaxed">
      The overwhelming majority of climate scientists worldwide have reached consensus that human activity contributes to global warming...
    </p>

    {/* Scores */}
    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">Trust Score: 94%</span>
      <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full">Bias: Low</span>
      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Factify Verified</span>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-wrap items-center justify-start gap-4 text-sm pt-2">
      <a
        href="https://www.reuters.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        🔗 Read More
      </a>
      <button className="text-blue-500 hover:underline">Share to Facebook</button>
      <button className="text-blue-500 hover:underline">Share to X</button>
    </div>

    {/* 👍 Like / 👎 Not Helpful Buttons */}
    <div className="flex items-center gap-4 pt-4">
      <button
        onClick={() => setLikes(likes + 1)}
        className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 text-sm"
      >
        👍 Helpful ({likes})
      </button>

      <button
        onClick={() => setNotHelpful(notHelpful + 1)}
        className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 text-sm"
      >
        👎 Not Helpful ({notHelpful})
      </button>
    </div>

    {/* 💬 Comment Box */}
    <div className="mt-6 border-t border-gray-200 pt-4">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">💬 Start the conversation</h4>

      <textarea
        placeholder="Share your thoughts... (max 250 characters)"
        maxLength={250}
        className="w-full border border-gray-300 p-2 rounded text-sm resize-none mb-2"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <button
        onClick={() => {
          if (comment.trim()) {
            setComments([...comments, { name: 'User', text: comment }]);
            setComment('');
          }
        }}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        disabled={!comment.trim()}
      >
        Post Comment
      </button>

      <ul className="mt-4 space-y-2 text-sm text-gray-700">
        {comments.map((c, idx) => (
          <li key={idx} className="bg-gray-100 px-3 py-2 rounded">
            <strong>{c.name || 'Anonymous'}:</strong> {c.text}
          </li>
        ))}
      </ul>
    </div>
  </div>

  <p className="text-center text-xs mt-6 text-gray-400 italic">
    Only news with high AI-verified truth scores are featured here. Where Truth is Real — and We Take It Seriously.
  </p>
</section>


        {/* ✅ Digital Badge */}
        <section className="mt-16 mb-10 max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-bold text-gray-700 mb-4">🎖 AI Factify Verified Badge</h3>

          <div className="inline-block bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 p-5 rounded-lg shadow-md">
            <h4 className="text-2xl font-bold mb-1">
              <span className="text-gray-500">AI</span>
              <span className="text-blue-400">Factify</span>
            </h4>
            <p className="text-sm text-gray-600 mb-2 italic">Where Truth is Real</p>

            <div className="flex justify-center gap-3 text-sm mb-3">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">✅ Trust Score: 94%</span>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full">📅 Verified: Mar 24, 2025</span>
            </div>

            <a
              href="https://aifactify.com/verify/sample-news"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-xs hover:underline"
            >
              🔍 View Verification Report
            </a>
          </div>

          <p className="text-xs text-gray-400 mt-3">
            This badge certifies that this organization has passed AI Factify’s truth verification standards.
          </p>
        </section>


<main>
         {/* ✅ Footer */}
        <footer className="bg-gray-100 mt-10 py-4 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} AI Factify™ is a registered idea by Ron Echual — All Rights Reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="/about" className="hover:underline">About</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/mission" className="hover:underline">Mission</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Home;
