import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function VideoAnalyzer() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleVideoUpload = (e) => {
    setSelectedVideo(e.target.files[0]);
    setVideoURL('');
    setResult(null);
  };

  const handleAnalyze = () => {
    if (!selectedVideo && !videoURL.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      setResult({
        verdict: '⚠️ Potentially Manipulated',
        confidence: '78%',
        notes: 'Some AI-generated characteristics detected in audio/visual sync.',
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      {/* ✅ Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="text-gray-500">AI</span>
          <span className="text-sky-400">Factify</span>
          <div className="text-sm text-gray-400 italic">Where Truth is Real</div>
        </div>
        <nav className="space-x-4 text-sm text-gray-600 hidden sm:block">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/voice" className="hover:underline">Voice</Link>
          <Link to="/image-analyzer" className="hover:underline">Image</Link>
          <Link to="/articles" className="hover:underline">Articles</Link>
        </nav>
      </header>

      {/* ✅ Main */}
      <main className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-2">🎬 Video Analyzer</h2>
        <p className="text-sm text-gray-600 mb-4">
          Upload a video or paste a link to analyze authenticity using AI tools.
        </p>

        {/* 📘 Instructions */}
        <ul className="text-xs text-gray-500 mb-4 bg-gray-50 p-3 rounded border border-gray-200 space-y-1">
          <li>• Supported formats: MP4, MOV, WEBM</li>
          <li>• Max file size: 50MB</li>
          <li>• We do not store your videos. Privacy is respected.</li>
          <li>• AI scans for deepfake indicators and editing inconsistencies.</li>
        </ul>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload a Video File:
            </label>
            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={handleVideoUpload}
              className="mb-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Or Paste a Video Link:
            </label>
            <input
              type="url"
              value={videoURL}
              onChange={(e) => {
                setVideoURL(e.target.value);
                setSelectedVideo(null);
                setResult(null);
              }}
              placeholder="https://example.com/video.mp4"
              className="w-full p-2 border rounded text-sm"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || (!selectedVideo && !videoURL.trim())}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm ${
              isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Video'}
          </button>
        </div>

        {/* 📽 Preview */}
        {selectedVideo && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Preview:</p>
            <video
              src={URL.createObjectURL(selectedVideo)}
              controls
              className="w-full max-w-sm rounded shadow-md"
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

export default VideoAnalyzer;
