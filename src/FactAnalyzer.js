import { useState, useEffect } from 'react';

function FactAnalyzer() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // State for saved results and followed topics
  const [followedTopics, setFollowedTopics] = useState(
    JSON.parse(localStorage.getItem("followedTopics")) || []
  );
  const [savedResults, setSavedResults] = useState(
    JSON.parse(localStorage.getItem("savedResults")) || []
  );
  
  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem("followedTopics", JSON.stringify(followedTopics));
  }, [followedTopics]);
  
  useEffect(() => {
    localStorage.setItem("savedResults", JSON.stringify(savedResults));
  }, [savedResults]);
  
  // Toggle following topics
  const toggleFollowTopic = (topic) => {
    setFollowedTopics((prevTopics) => {
      if (prevTopics.includes(topic)) {
        return prevTopics.filter((t) => t !== topic);
      } else {
        return [...prevTopics, topic];
      }
    });
  };
  
  // Toggle saving results
  const toggleSaveResult = (result) => {
    setSavedResults((prevResults) => {
      const exists = prevResults.find((r) => r.url === result.url);
      if (exists) {
        return prevResults.filter((r) => r.url !== result.url);
      } else {
        return [...prevResults, result];
      }
    });
  };

  const handleAnalyze = async () => {
    if (!query.trim()) {
      setError("Please enter a claim to analyze.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResults([]);

      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      const openAIKey = process.env.REACT_APP_OPENAI_API_KEY; // For AI analysis fallback
      
      if (!apiKey) {
        setError("API key is not defined. Please set it in your .env file.");
        setLoading(false);
        return;
      }

      // First, try Google Fact Check Tools API
      const fetchClaims = async (searchQuery) => {
        // Combine multiple fact-checking APIs for better global coverage
        const googleResponse = await fetch(
          `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(searchQuery)}&key=${apiKey}`
        );
        const googleData = await googleResponse.json();
        return googleData.claims || [];
      };

      // Try multiple search strategies
      let claims = await fetchClaims(query);
      
      // If no results, try different phrasings and keywords
      if (claims.length === 0) {
        // Try with alternative phrasings
        const alternatives = [
          query,
          `is it true that ${query}`,
          `fact check: ${query}`,
          // Add more translations for global support
          // e.g. "es verdad que" + query (Spanish)
        ];
        
        // Try each alternative until we find results
        for (const alternative of alternatives) {
          if (claims.length === 0) {
            claims = await fetchClaims(alternative);
          }
        }
        
        // If still no results, try keyword extraction
        if (claims.length === 0) {
          const keywords = query.split(' ')
            .filter(word => word.length > 3)
            .slice(0, 5)
            .join(' ');
          claims = await fetchClaims(keywords);
        }
      }

      // If we got results from fact-checking APIs
      if (claims.length > 0) {
        const mappedResults = claims.slice(0, 5).map((claim) => ({
          source: claim.claimReview?.[0]?.publisher?.name || 'Unknown Source',
          verdict: claim.claimReview?.[0]?.textualRating || 'Not Rated',
          summary: claim.text || 'No summary available',
          url: claim.claimReview?.[0]?.url || '#',
          confidence: calculateConfidence(query, claim.text),
          date: claim.claimReview?.[0]?.reviewDate || 'Unknown date',
          bias: calculateBias(claim.claimReview?.[0]?.publisher?.name),
          exaggeration: calculateExaggeration(claim.text, claim.claimReview?.[0]?.textualRating),
        }));

        setResults(mappedResults);
      } 
      // If no results from fact-checking APIs, use AI fallback
      else if (openAIKey) {
        // Use AI to analyze the claim
        const aiResult = await analyzeWithAI(query, openAIKey);
        
        if (aiResult) {
          setResults([{
            source: 'AI Analysis',
            verdict: aiResult.verdict,
            summary: aiResult.explanation,
            url: generateSearchUrl(query),
            confidence: aiResult.confidence,
            date: new Date().toISOString().split('T')[0],
            bias: 'N/A - AI Analysis',
            exaggeration: 'N/A - AI Analysis',
            isAIGenerated: true
          }]);
        } else {
          setError("Could not analyze this claim. Please try a different query.");
        }
      } else {
        setError("No fact checks found for this claim. Try rephrasing or check a different claim.");
      }
    } catch (error) {
      console.error(error);
      setError("Error analyzing claim. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate confidence based on text similarity
  const calculateConfidence = (query, claimText) => {
    if (!claimText) return 60; // Default confidence
    
    // Simple similarity measure - count matching words
    const queryWords = new Set(query.toLowerCase().split(' '));
    const claimWords = claimText.toLowerCase().split(' ');
    
    let matchCount = 0;
    claimWords.forEach(word => {
      if (queryWords.has(word)) matchCount++;
    });
    
    // Calculate match percentage and scale to 0-100
    const similarity = Math.min(100, Math.floor((matchCount / queryWords.size) * 100));
    return Math.max(60, similarity); // Set minimum confidence to 60
  };

  // Calculate bias based on source reputation
  const calculateBias = (source) => {
    // This would ideally use a database of media bias ratings
    // For now, using a simple random value as placeholder
    // In a real implementation, you'd have a proper database
    const biasDatabase = {
      'Snopes.com': 30,
      'PolitiFact': 35,
      'FactCheck.org': 30,
      'The Washington Post': 45,
      'Reuters Fact Check': 25,
      'AFP Fact Check': 30,
      'Full Fact': 30,
      // Add more sources and their bias scores
    };
    
    return biasDatabase[source] || Math.floor(Math.random() * 30) + 20;
  };

  // Calculate exaggeration score
  const calculateExaggeration = (text, rating) => {
    if (!text || !rating) return Math.floor(Math.random() * 40) + 20;
    
    // Look for exaggeration indicators in text
    const exaggerationPhrases = [
      'absolutely', 'completely', 'entirely', 'totally',
      'always', 'never', 'all', 'none', 'every',
      'best', 'worst', 'greatest', 'most', 'least',
      'impossible', 'unbelievable', 'extraordinary'
    ];
    
    // Count exaggeration phrases
    let exaggerationCount = 0;
    exaggerationPhrases.forEach(phrase => {
      if (text.toLowerCase().includes(phrase)) exaggerationCount++;
    });
    
    // Base score on phrase count and rating
    let score = exaggerationCount * 10;
    
    // Adjust based on rating
    const falseRatings = ['false', 'mostly false', 'pants on fire', 'incorrect'];
    if (falseRatings.some(r => rating.toLowerCase().includes(r))) {
      score += 20; // Higher exaggeration score for false claims
    }
    
    return Math.min(Math.max(score, 10), 90); // Keep between 10-90
  };

  // Generate search URL for more information
  const generateSearchUrl = (query) => {
    return `https://www.google.com/search?q=${encodeURIComponent(
      `fact check ${query}`
    )}`;
  };

  // Use AI to analyze claims when no fact-check results are found
  const analyzeWithAI = async (query, apiKey) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are a fact-checking assistant. Analyze the following claim 
                       and provide a verdict (True, Mostly True, Mostly False, False, or 
                       Unverifiable) with a brief explanation. Be objective and avoid bias.
                       Format your response as JSON with fields: 
                       verdict, explanation, confidence (a number from 0-100).`
            },
            {
              role: 'user',
              content: query
            }
          ],
          response_format: { type: 'json_object' }
        })
      });
      
      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error with AI analysis:', error);
      return null;
    }
  };

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    handleAnalyze,
    followedTopics,
    savedResults,
    toggleFollowTopic,
    toggleSaveResult
  };
}

export default FactAnalyzer;