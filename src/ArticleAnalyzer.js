// ✅ Cleaned App.js with menu, additional pages, and consistent layout
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import VoiceAnalyzer from './VoiceAnalyzer';
import MediaAnalyzer from './MediaAnalyzer';
import LinkAnalyzer from './LinkAnalyzer';
import ArticleAnalyzer from './ArticleAnalyzer';
import FactVibes from './FactVibes';
import Features from './Features';
import NextFeatureStep from './NextFeatureStep';
import Rebuttal from './Rebuttal';
import SocialHub from './SocialHub';
import SocialFeatures from './SocialFeatures';
import TruthThreads from './TruthThreads';
import { ResponsiveRadialBar } from '@nivo/radial-bar';

const radialData = [
  {
    id: 'Bias Score',
    data: [
      { x: 'News A', y: 70 },
      { x: 'News B', y: 85 },
      { x: 'News C', y: 60 },
      { x: 'Social X', y: 40 },
    ],
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      <Helmet>
        <title>AI Factify - Where Truth is Real</title>
        <meta name="description" content="Analyze media, voice, articles and links for truth." />
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">AI Factify</h1>
        <nav className="space-x-4 text-sm text-gray-600">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/articles" className="hover:underline">Articles</Link>
          <Link to="/voice" className="hover:underline">Voice</Link>
          <Link to="/media" className="hover:underline">Media</Link>
          <Link to="/link" className="hover:underline">Link</Link>
          <Link to="/factvibes" className="hover:underline">FactVibes</Link>
          <Link to="/features" className="hover:underline">Features</Link>
          <Link to="/next" className="hover:underline">Next Step</Link>
          <Link to="/rebuttal" className="hover:underline">Rebuttal</Link>
          <Link to="/socialhub" className="hover:underline">Social Hub</Link>
          <Link to="/socialfeatures" className="hover:underline">Social Features</Link>
          <Link to="/truththreads" className="hover:underline">TruthThreads</Link>
        </nav>
      </header>

      {/* Main */}
      <main className="p-6">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Explore the Truth with AI</h2>
          <p className="text-gray-600">Start analyzing different types of content below.</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link to="/articles" className="bg-white rounded-lg p-6 shadow hover:shadow-md transition">
            <p className="font-semibold">📰 Article Analyzer</p>
            <p className="text-sm text-gray-500 mt-1">Check for accuracy and bias in written claims.</p>
          </Link>
          <Link to="/voice" className="bg-white rounded-lg p-6 shadow hover:shadow-md transition">
            <p className="font-semibold">🎙 Voice Analyzer</p>
            <p className="text-sm text-gray-500 mt-1">Upload and analyze speech content.</p>
          </Link>
          <Link to="/media" className="bg-white rounded-lg p-6 shadow hover:shadow-md transition">
            <p className="font-semibold">🖼 Media Analyzer</p>
            <p className="text-sm text-gray-500 mt-1">Analyze images or videos for authenticity.</p>
          </Link>
          <Link to="/link" className="bg-white rounded-lg p-6 shadow hover:shadow-md transition">
            <p className="font-semibold">🔗 Link Analyzer</p>
            <p className="text-sm text-gray-500 mt-1">Paste a link to check its credibility.</p>
          </Link>
        </section>

        {/* Sample Graph */}
        <section className="mt-16 bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 text-center">📊 Bias Score Comparison</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveRadialBar
              data={radialData}
              keys={['y']}
              indexBy="x"
              maxValue={100}
              margin={{ top: 20, right: 40, bottom: 40, left: 40 }}
              padding={0.3}
              radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
              circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
              enableLabels={true}
              colors={{ scheme: 'category10' }}
              animate={true}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-10 py-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} AI Factify by Ron Echual — All Rights Reserved.
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticleAnalyzer />} />
        <Route path="/voice" element={<VoiceAnalyzer />} />
        <Route path="/media" element={<MediaAnalyzer />} />
        <Route path="/link" element={<LinkAnalyzer />} />
        <Route path="/factvibes" element={<FactVibes />} />
        <Route path="/features" element={<Features />} />
        <Route path="/next" element={<NextFeatureStep />} />
        <Route path="/rebuttal" element={<Rebuttal />} />
        <Route path="/socialhub" element={<SocialHub />} />
        <Route path="/socialfeatures" element={<SocialFeatures />} />
        <Route path="/truththreads" element={<TruthThreads />} />
      </Routes>
    </Router>
  );
}

export default App;
