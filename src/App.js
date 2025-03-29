import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Pages & Components
import Home from './Home';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import VoiceAnalyzer from './VoiceAnalyzer';
import ImageAnalyzer from './ImageAnalyzer';
import VideoAnalyzer from './VideoAnalyzer';
import LinkAnalyzer from './LinkAnalyzer';
import ArticleAnalyzer from './ArticleAnalyzer';
import SocialHub from './SocialHub';
import SocialFeatures from './SocialFeatures';
import FactVibes from './FactVibes';
import Features from './Features';
import NextFeatureStep from './NextFeatureStep';
import Rebuttal from './Rebuttal';
import TruthThreads from './TruthThreads';
import SignUp from './SignUp';
import FakeNewsInteractive from './components/FakeNewsInteractive';
import TrustedNewsSpotlight from './components/TrustedNewsSpotlight';  // Correct import
import FactifyNewsHub from './components/FactifyNewsHub';
import NewsSpotlight from './components/NewsSpotlight';
import VerifiedBadge from './components/VerifiedBadge';
import VerifyPage from './components/VerifyPage';
import Discussion from './components/Discussion';
import AnalyzerHub from './components/AnalyzerHub'; // Assuming this is the correct import for AnalyzerHub
import NewsSpotlightPage from './components/NewsSpotlight';
import FactAnalyzer from './FactAnalyzer';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Declare the isLoggedIn state
  const [searchCount, setSearchCount] = useState(0); // Track search count for guests

  // Function to handle searches
  const handleSearch = () => {
    if (!isLoggedIn && searchCount >= 3) {
      // If not logged in and reached 3 searches, redirect to sign-in
      alert("You have reached the maximum number of searches. Please sign in.");
    } else {
      setSearchCount(searchCount + 1); // Increment search count for guests
    }
  };

  // Function to handle the routes when not logged in
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? (
      children
    ) : (
      <Navigate to="/sign-in" replace />
    );
  };

  return (
    <Router>
      <Helmet>
        <title>AI Factify - Where Truth is Real</title>
        <meta name="description" content="AI-powered fact-checking and analysis." />
        <meta property="og:title" content="AI Factify - Where Truth is Real" />
        <meta property="og:description" content="AI-powered fact-checking tool to analyze claims and media content." />
      </Helmet>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/analyze"
          element={
            <ProtectedRoute>
              <AnalyzerHub handleSearch={handleSearch} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/voice"
          element={
            <ProtectedRoute>
              <VoiceAnalyzer handleSearch={handleSearch} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/image"
          element={
            <ProtectedRoute>
              <ImageAnalyzer handleSearch={handleSearch} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/video"
          element={
            <ProtectedRoute>
              <VideoAnalyzer handleSearch={handleSearch} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/link"
          element={
            <ProtectedRoute>
              <LinkAnalyzer handleSearch={handleSearch} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/articles"
          element={
            <ProtectedRoute>
              <ArticleAnalyzer handleSearch={handleSearch} />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />  {/* Home is rendered when visiting "/" */}
        <Route path="/sign-in-news" element={<SignIn />} />
        <Route path="/social-hub" element={<SocialHub />} />
        <Route path="/social-features" element={<SocialFeatures />} />
        <Route path="/fact-vibes" element={<FactVibes />} />
        <Route path="/features" element={<Features />} />
        <Route path="/next-step" element={<NextFeatureStep />} />
        <Route path="/rebuttal" element={<Rebuttal />} />
        <Route path="/truth-threads" element={<TruthThreads />} />
        <Route path="/sign-up" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/fake-news-interactive" element={<FakeNewsInteractive />} />
        <Route paath="/news-spotlight" element={<NewsSpotlight />} />
        <Route path="/article-analyzer" element={<ArticleAnalyzer />} />
        <Route path="/video-analyzer" element={<VideoAnalyzer />} />
        <Route path="/voice-analyzer" element={<VoiceAnalyzer />} />
        <Route path="/image-analyzer" element={<ImageAnalyzer />} />
        <Route path="/discussion" element={<Discussion />} />
        {/* Corrected imports and route setup for the components */}
        <Route path="/factify-news-hub" element={<FactifyNewsHub />} />
        <Route path="/verified-badge" element={<VerifiedBadge />} />
        <Route path="/verify-page" element={<VerifyPage />} />
        <Route path="/trusted-news-spotlight" element={<TrustedNewsSpotlight />} /> {/* Ensure this route is unique */}
        <Route path="/news-spotlight-page" element={<NewsSpotlightPage />} />
        
        {/* Redirect to home if no route matches */}
      </Routes>
    </Router>
  );
}

export default App;
