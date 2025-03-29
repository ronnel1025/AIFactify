import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SignIn from './SignIn'; // SignIn component
import ForgotPassword from './ForgotPassword'; // ForgotPassword component
import Home from './Home';
import VoiceAnalyzer from './VoiceAnalyzer';
import ImageAnalyzer from './ImageAnalyzer';
import VideoAnalyzer from './VideoAnalyzer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  return (
    <Router>
      <Helmet>
        <title>AI Factify - Where Truth is Real</title>
        <meta name="description" content="AI-powered fact-checking and analysis." />
      </Helmet>

      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/voice" element={isLoggedIn ? <VoiceAnalyzer handleSearch={handleSearch} /> : <SignIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/image" element={isLoggedIn ? <ImageAnalyzer handleSearch={handleSearch} /> : <SignIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/video" element={isLoggedIn ? <VideoAnalyzer handleSearch={handleSearch} /> : <SignIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/articles" element={isLoggedIn ? <Analyzer handleSearch={handleSearch} /> : <SignIn setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
