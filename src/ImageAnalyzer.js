import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function ImageAnalyzer() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (e) => {
    setSelectedImage(e.target.files[0]);
    setResult(null);
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);

    // Simulated result (replace later with real backend API call)
    setTimeout(() => {
      setResult({
        verdict: '✅ Authentic Image',
        confidence: '95%',
        notes: 'No signs of AI tampering or manipulation detected.',
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      <Helmet>
        <title>Image Analyzer - AI Factify</title>
      </Helmet>

      {/* ✅ Header and Navigation (Corrected clearly) */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="text-gray-500">AI</span>
          <span className="text-sky-400">Factify</span>
          <div className="text-sm text-gray-400 italic">Where Truth is Real</div>
        </div>
        <nav className="space-x-4 text-sm text-gray-600 hidden sm:block">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/article-analyzer" className="hover:underline">Articles</Link>
          <Link to="/video-analyzer" className="hover:underline">Video</Link>
          <Link to="/voice-analyzer" className="hover:underline">Voice</Link>
        </nav>
      </header>

      {/* ✅ Main Content */}
      <main className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-2">🖼 Image Analyzer</h2>
        <p className="text-sm text-gray-600 mb-4">
          Upload an image to verify its authenticity using AI detection tools.
        </p>

        {/* 📘 Instructions */}
        <ul className="text-xs text-gray-500 mb-4 bg-gray-50 p-3 rounded border border-gray-200 space-y-1">
          <li>• Supported formats: JPG, PNG, WEBP, GIF</li>
          <li>• Max file size: 10MB</li>
          <li>• Your image is not stored. We respect your privacy.</li>
          <li>• AI checks for common signs of manipulation and deepfakes.</li>
        </ul>

        <input
          type="file"
          accept="image/png, image/jpeg, image/webp, image/gif"
          onChange={handleImageUpload}
          className="mb-4"
        />

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !selectedImage}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm ${
            isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
        </button>

        {/* 📷 Preview */}
        {selectedImage && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Preview:</p>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="w-full max-w-sm rounded shadow-md"
            />
          </div>
        )}

        {/* ✅ Results */}
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

export default ImageAnalyzer;