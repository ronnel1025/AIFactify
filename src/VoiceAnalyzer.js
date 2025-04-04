import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function VoiceAnalyzer() {
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAudioUpload = (e) => {
    setSelectedAudio(e.target.files[0]);
    setAudioURL('');
    setResult(null);
  };

  const handleAnalyze = () => {
    if (!selectedAudio && !audioURL.trim()) return;
    setIsAnalyzing(true);

    // Simulated AI analysis (replace later with real backend API call)
    setTimeout(() => {
      setResult({
        verdict: '✅ Authentic',
        confidence: '92%',
        notes: 'No clear indicators of AI-generated or manipulated audio detected.',
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      <Helmet>
        <title>Voice Analyzer - AI Factify</title>
      </Helmet>

      {/* ✅ Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-gray-500">AI</span>
            <span className="text-sky-400">Factify</span>
          </h1>
          <p className="text-xs italic text-gray-400">Where Truth is Real</p>
        </div>
        <nav className="space-x-4 text-sm hidden sm:block">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/article-analyzer" className="hover:underline">Articles</Link>
          <Link to="/video-analyzer" className="hover:underline">Video</Link>
          <Link to="/image-analyzer" className="hover:underline">Image</Link>
        </nav>
      </header>

      {/* ✅ Main Content */}
      <main className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-2">🎙️ Voice Analyzer</h2>
        <p className="text-sm text-gray-600 mb-4">
          Upload an audio file or paste a link to analyze its authenticity using AI.
        </p>

        {/* 📘 Instructions */}
        <ul className="text-xs text-gray-500 mb-4 bg-gray-50 p-3 rounded border border-gray-200 space-y-1">
          <li>• Supported formats: MP3, WAV, OGG</li>
          <li>• Max file size: 25MB</li>
          <li>• AI scans for deepfake audio indicators and digital manipulation.</li>
          <li>• Your audio files remain private and secure.</li>
        </ul>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Audio File:
            </label>
            <input
              type="file"
              accept="audio/mp3,audio/wav,audio/ogg"
              onChange={handleAudioUpload}
              className="mb-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Or Paste Audio URL:
            </label>
            <input
              type="url"
              value={audioURL}
              onChange={(e) => {
                setAudioURL(e.target.value);
                setSelectedAudio(null);
                setResult(null);
              }}
              placeholder="https://example.com/audio.mp3"
              className="w-full p-2 border rounded text-sm"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || (!selectedAudio && !audioURL.trim())}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm ${
              isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Voice'}
          </button>
        </div>

        {/* 🎧 Audio Preview */}
        {selectedAudio && (
          <div className="mt-4">
            <p className="text-sm mb-1">Preview:</p>
            <audio
              src={URL.createObjectURL(selectedAudio)}
              controls
              className="w-full max-w-sm"
            />
          </div>
        )}

        {/* ✅ Result */}
        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded shadow">
            <h4 className="text-md font-semibold mb-2">🔍 Result</h4>
            <p><strong>Verdict:</strong> {result.verdict}</p>
            <p><strong>Confidence:</strong> {result.confidence}</p>
            <p><strong>Notes:</strong> {result.notes}</p>
          </div>
        )}
      </main>

      {/* ✅ Footer */}
      <footer className="bg-gray-100 mt-10 py-4 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} AI Factify™ by Ron Echual — All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default VoiceAnalyzer;