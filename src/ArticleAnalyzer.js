import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';

function ArticleAnalyzer() {
  const [articleText, setArticleText] = useState('');
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!articleText.trim()) return;
    setIsAnalyzing(true);

    // Simulated AI analysis (replace this later with real AI backend)
    setTimeout(() => {
      setResult({
        verdict: '✅ Mostly True',
        confidence: '88%',
        notes: 'Minor bias detected, but overall aligns with verified sources.',
        keywords: ['Climate Change', 'Renewable Energy', 'Global Warming'],
        relatedResults: [
          { id: 1, title: 'Climate Change Facts', summary: 'Verified insights on climate data and accuracy.' },
          { id: 2, title: 'Renewable Energy Analysis', summary: 'AI-driven exploration of renewable energy claims.' },
          { id: 3, title: 'Global Warming Trends', summary: 'Fact-checking global warming narratives.' },
        ],
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      <Helmet>
        <title>Article Analyzer - AI Factify</title>
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">
            <span className="text-gray-500">AI</span>
            <span className="text-sky-400">Factify</span>
          </h1>
          <p className="text-xs italic text-gray-400">Where Truth is Real</p>
        </div>
        <nav className="space-x-4 text-sm text-gray-600 hidden sm:block">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/voice" className="hover:underline">Voice</Link>
          <Link to="/video" className="hover:underline">Video</Link>
          <Link to="/image-analyzer" className="hover:underline">Image</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-2">📰 Article Analyzer</h2>
          <p className="text-sm text-gray-600 mb-4">
            Paste a full article or excerpt to check for factual accuracy and bias.
          </p>

          <ul className="text-xs text-gray-500 mb-4 bg-gray-50 p-3 rounded border border-gray-200 space-y-1">
            <li>• Supported input: Text-based articles or statements</li>
            <li>• Limit: Max 3000 characters</li>
            <li>• AI scans for factual consistency, exaggeration, and tone</li>
            <li>• We don’t store your article. Private and secure.</li>
          </ul>

          <textarea
            rows={6}
            value={articleText}
            onChange={(e) => setArticleText(e.target.value)}
            placeholder="Paste article text here..."
            maxLength={3000}
            className="w-full border border-gray-300 p-3 rounded text-sm resize-none mb-4"
          />

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !articleText.trim()}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm ${
              isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Article'}
          </button>

          {result && (
            <div className="mt-6 bg-gray-100 p-4 rounded shadow">
              <h4 className="text-md font-semibold mb-2">🔍 Result</h4>
              <p><strong>Verdict:</strong> {result.verdict}</p>
              <p><strong>Confidence:</strong> {result.confidence}</p>
              <p><strong>Notes:</strong> {result.notes}</p>

              {/* Keywords */}
              <div className="mt-3">
                <strong>🔑 Keywords:</strong>
                <ul className="list-disc ml-5">
                  {result.keywords.map((kw, i) => <li key={i}>{kw}</li>)}
                </ul>
              </div>

              {/* Related Results */}
              <div className="mt-4">
                <h5 className="text-md font-semibold">📚 Similar Analyses:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                  {result.relatedResults.slice(0,3).map((rel) => (
                    <div key={rel.id} className="bg-white p-3 border rounded shadow-sm">
                      <h6 className="font-semibold text-sm">{rel.title}</h6>
                      <p className="text-xs mt-1">{rel.summary}</p>
                      <button
                        className="mt-2 text-xs text-blue-500 underline"
                        onClick={() => navigate(`/discussion/${rel.id}`)}
                      >
                        🎤 Discuss
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-10 py-4 text-center text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} AI Factify™ by Ron Echual — All Rights Reserved.</p>
        <div className="mt-2 space-x-4">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </footer>
    </div>
  );
}

export default ArticleAnalyzer;