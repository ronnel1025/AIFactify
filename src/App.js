// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import VoiceAnalyzer from './VoiceAnalyzer';
import MediaAnalyzer from './MediaAnalyzer';
import LinkAnalyzer from './LinkAnalyzer';
import ArticleAnalyzer from './ArticleAnalyzer';
import SocialHub from './SocialHub';
import SocialFeatures from './SocialFeatures';
import FactVibes from './FactVibes';
import Features from './Features';
import NextFeatureStep from './NextFeatureStep';
import Rebuttal from './Rebuttal';
import TruthThreads from './TruthThreads';
import Home from './Home';

function App() {
  return (
    <Router>
      <Helmet>
        <title>AI Factify - Verify Claims with AI</title>
        <meta name="description" content="AIFactify helps you verify facts and fight misinformation with AI-powered tools." />
        <meta property="og:title" content="AIFactify - Where Truth is Real" />
        <meta property="og:description" content="AI-powered fact-checking tool to analyze claims and media content." />
        <meta property="og:image" content="https://aifactify.com/og-image.png" />
        <meta property="og:url" content="https://aifactify.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="copyright" content="© 2025 Ron Echual. All rights reserved." />
        <meta name="robots" content="index, follow, noarchive" />
      </Helmet>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticleAnalyzer />} />
        <Route path="/voice" element={<VoiceAnalyzer />} />
        <Route path="/media" element={<MediaAnalyzer />} />
        <Route path="/link" element={<LinkAnalyzer />} />
        <Route path="/social-hub" element={<SocialHub />} />
        <Route path="/social-features" element={<SocialFeatures />} />
        <Route path="/fact-vibes" element={<FactVibes />} />
        <Route path="/features" element={<Features />} />
        <Route path="/next-step" element={<NextFeatureStep />} />
        <Route path="/rebuttal" element={<Rebuttal />} />
        <Route path="/truth-threads" element={<TruthThreads />} />
      </Routes>
    </Router>
  );
}

export default App;
