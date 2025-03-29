// src/Home.js

 

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from './components/Config/firebase';  
import { ResponsiveBar } from '@nivo/bar';
import { Helmet } from 'react-helmet';
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import FactifyNewsHub from './components/FactifyNewsHub';
import FakeNewsInteractive from './components/FakeNewsInteractive';

 // Correct import

// SignIn Component




const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/">
        <div className="text-2xl font-bold">
          <span className="text-gray-500">AI</span><span className="text-sky-400">Factify</span>
          <div className="text-sm italic text-gray-400">Where Truth is Real</div>
        </div>
      </Link>

      <nav className="relative">
        <button onClick={() => setIsOpen(!isOpen)} className="text-sky-400 hover:text-sky-500">
          ☰
        </button>
        {isOpen && (
          <ul className="absolute right-0 bg-white shadow-lg rounded-md p-4 space-y-2">
            <li><Link to="/analyze" className="block hover:text-sky-500">🔍 Analyze</Link></li>
            <li><Link to="/verify" className="block hover:text-sky-500">🎖️ Verify</Link></li>
            <li><Link to="/badges" className="block hover:text-sky-500">🏅 Badges</Link></li>
            <li><Link to="/about" className="block hover:text-sky-500">📖 About</Link></li>
            <li><Link to="/sign-in" className="block hover:text-sky-500">👤 Sign In</Link></li>
            <li><Link to="/sign-up" className="block hover:text-sky-500">🚀 Sign Up</Link></li>
          </ul>
        )}
      </nav>
    </header>
  );
};


// Radial graph data ("By Source") for the chart
const radialData = [
  {
    id: 'By Source',
    data: [
      { x: 'Social Media', y: 45 },
      { x: 'News Outlets', y: 29 },
      { x: 'Random Websites', y: 31 },
      { x: 'Messaging Apps', y: 8 },
    ],
  },
];

function Home() {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [likes, setLikes] = useState(0);
  const [notHelpful, setNotHelpful] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);


 /* Define new state for topics and saved results*/
 const [followedTopics, setFollowedTopics] = useState(JSON.parse(localStorage.getItem("followedTopics")) || []);
 const [savedResults, setSavedResults] = useState(JSON.parse(localStorage.getItem("savedResults")) || []);


  /* Save state to localStorage when updated */
  useEffect(() => {
    localStorage.setItem("followedTopics", JSON.stringify(followedTopics));}, [followedTopics]);
  
  useEffect(() => {
    localStorage.setItem("savedResults", JSON.stringify(savedResults));
  }, [savedResults]);
  
/* Add functions to handle following/unfollowing topics and saving/removing results */
const toggleFollowTopic = (topic) => {
  setFollowedTopics((prevTopics) => {
    if (prevTopics.includes(topic)) {
      return prevTopics.filter((t) => t !== topic);
    } else {
      return [...prevTopics, topic];
    }
  });
};

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
    setError("Please enter a query to analyze.");
    return;
  }

  try {
    setError(null);
    setResults([]);

    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    if (!apiKey) {
      setError("API key is not defined. Please set it in your .env file.");
      return;
    }

    const fetchClaims = async (searchQuery) => {
      const response = await fetch(
        `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(searchQuery)}&key=${apiKey}`
      );
      const data = await response.json();
      return data.claims || [];
    };

    let claims = await fetchClaims(query);

    // Fallback: if no results, try keyword-based search
    if (claims.length === 0 && query.split(' ').length > 1) {
      const keywords = query.split(' ').slice(0, 3).join(' ');
      claims = await fetchClaims(keywords);
    }

    if (claims.length > 0) {
      const mappedResults = claims.slice(0, 3).map((claim) => ({
        source: claim.claimReview?.[0]?.publisher?.name || 'Unknown Source',
        verdict: claim.claimReview?.[0]?.textualRating || 'Not Rated',
        summary: claim.text || 'No summary available',
        url: claim.claimReview?.[0]?.url || '#',
        bias: Math.floor(Math.random() * 50) + 50,
        exaggeration: Math.floor(Math.random() * 50) + 50,
      }));

      setResults(mappedResults);
    } else {
      setError("No results found. Please try a different query or simplify your keywords.");
    }
  } catch (error) {
    console.error(error);
    setError("Error fetching data. Please try again.");
  }
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
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/socialhub" className="hover:underline">Social Hub</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/image" className="hover:underline">Image</Link>
        </nav>
      </header>


 {/* Quick Analyzer */}
      <main className="p-6 max-w-4xl mx-auto">
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



        {/* Analyzer Result Cards */}
        {results.length > 0 ? (
  <section className="space-y-6 mb-12">
    {results.map((result, index) => (
      <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-1">{result.source}</h3>
        <p className="text-sm text-gray-600 mb-2">{result.summary}</p>
        <p className="text-sm">Verdict: <strong>{result.verdict}</strong></p>
        <p className="text-sm">Bias Score: <span className="text-yellow-600">{result.bias}%</span></p>
        <p className="text-sm mb-2">Exaggeration: <span className="text-red-500">{result.exaggeration}%</span></p>
        <div className="flex flex-wrap gap-4 items-center mb-2 text-sm">
          <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">🔗 Read More</a>
          <button onClick={() => toggleSaveResult(result)} className="text-green-500 hover:underline">
            {savedResults.find((r) => r.url === result.url) ? "✅ Saved" : "📝 Save"}
          </button>
          <button onClick={() => toggleFollowTopic(query)} className="text-purple-500 hover:underline">
            {followedTopics.includes(query) ? `💜 Unfollow "${query}"` : `🤍 Follow "${query}"`}
          </button>
        </div>
        <div className="mt-3 text-sm">
          <a 
            href={`https://www.google.com/search?q=${encodeURIComponent(query)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition"
          >
            🔎 Find More Results
          </a>
        </div>
      </div>
    ))}
  </section>
) : error && (
  <section className="text-center text-red-500">{error}</section>
)}


     {/* Personalized Dashboard */}
<section className="my-12 bg-gray-200 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
  <h3 className="text-xl font-semibold mb-4 text-center">📝 Your Personalized Dashboard</h3>

  <div className="mb-6">
    <h4 className="font-semibold mb-2">💜 Topics You're Following:</h4>
    {followedTopics.length > 0 ? (
      <ul className="list-disc list-inside text-sm">
        {followedTopics.map((topic, idx) => <li key={idx}>{topic}</li>)}
      </ul>
    ) : (
      <p className="text-sm text-gray-600 italic">You haven't followed any topics yet.</p>
    )}
  </div>

  <div>
    <h4 className="font-semibold mb-2">✅ Your Saved Fact-Checks:</h4>
    {savedResults.length > 0 ? (
      <ul className="list-disc list-inside text-sm space-y-1">
        {savedResults.map((saved, idx) => (
          <li key={idx}>
            <a href={saved.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {saved.summary.slice(0, 70)}...
            </a>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-gray-600 italic">You haven't saved any fact-checks yet.</p>
    )}
  </div>
</section>

        {/* Radial Graph with Legend (By Source) */}
        <section className="mb-12 bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
            📊 Source of Fake News (Bias Score Overview)
          </h3>
          <div style={{ height: '400px' }}>
            <ResponsiveRadialBar
              data={radialData}
              keys={['y']}
              indexBy="x"
              maxValue={100}
              margin={{ top: 20, right: 40, bottom: 80, left: 80 }}
              padding={0.4}
              radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
              circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
              enableLabels={true}
              colors={{ scheme: 'set2' }}
              animate={true}
              legends={[
                {
                  anchor: 'left',
                  direction: 'column',
                  justify: false,
                  translateX: -20,
                  translateY: 0,
                  itemsSpacing: 10,
                  itemDirection: 'left-to-right',
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#333333',
                  symbolSize: 20,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: { itemTextColor: '#000000' },
                    },
                  ],
                },
              ]}
            />
          </div>
        </section>


<section className="my-12 bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
  <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
    📈 Major News Outlets: Bias & Exaggeration Overview
  </h3>
  <div style={{ height: '500px' }}>
    <ResponsiveBar
      data={[
        { outlet: 'CNN', bias: 35, exaggeration: 25 },
        { outlet: 'Fox News', bias: 65, exaggeration: 60 },
        { outlet: 'BBC', bias: 18, exaggeration: 10 },
        { outlet: 'NY Times', bias: 22, exaggeration: 15 },
        { outlet: 'Reuters', bias: 12, exaggeration: 5 },
        { outlet: 'MSNBC', bias: 55, exaggeration: 45 },
        { outlet: 'Al Jazeera', bias: 25, exaggeration: 20 },
      ]}
      keys={['bias', 'exaggeration']}
      indexBy="outlet"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: 'paired' }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -30,
        legend: 'News Outlet',
        legendPosition: 'middle',
        legendOffset: 45,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Score (%)',
        legendPosition: 'middle',
        legendOffset: -50,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="#fff"
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  </div>
</section>

        {/* Interactive "By Source & By Country" Section */}
        <FakeNewsInteractive />



        {/* Time to AI Factify your File */}







  <div className="grid grid-cols-2 gap-4 text-center font-semibold">
  <Link to="/article-analyzer" className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg shadow">
    🔍 Article Analyzer
  </Link>
  <Link to="/image-analyzer" className="p-4 bg-green-100 hover:bg-green-200 rounded-lg shadow">
    🎖️ Image Analyzer
  </Link>
  <Link to="/video-analyzer" className="p-4 bg-yellow-100 hover:bg-yellow-200 rounded-lg shadow">
    🏅 Video Analyzer
  </Link>
  <Link to="/voice-analyzer" className="p-4 bg-purple-100 hover:bg-purple-200 rounded-lg shadow">
    📖 Voice Analyzer
  </Link>
</div>

{/*Trusted News Spotlight */}


    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-sky-50 to-sky-100 shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold text-sky-600">🗞️ Trusted News Spotlight</h2>
        <p className="text-gray-700 my-4">
          Climate scientists agree Earth is warming...
        </p>
        <Link to="/news-spotlight-page" className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-full font-semibold">
          🚀 Explore More Exciting AI-Verified Spotlight News
        </Link>
      </div>
    </div>
  

        {/* Digital Badge */}
     
        <section className="mt-16 mb-10 max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-bold text-gray-700 mb-4">🎖 AI Factify Verified Badge</h3>
          <div className="inline-block bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 p-5 rounded-lg shadow-md">
            <h4 className="text-2xl font-bold mb-1">
              <span className="text-gray-500">AI</span>
              <span className="text-blue-400">Factify</span>
            </h4>
            <p className="text-sm text-gray-600 mb-2 italic">Where Truth is Real</p>
            <div className="flex justify-center gap-3 text-sm mb-3">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                ✅ Trust Score: 94%
              </span>
              <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                📅 Verified: Mar 24, 2025
              </span>
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
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-10 py-4 text-center text-xs text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} AI Factify™ is a registered idea by Ron Echual — All Rights Reserved.
        </p>
        <div className="mt-2 space-x-4">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/mission" className="hover:underline">Mission</Link>
        </div>
      </footer>
    </div>
  );
}

export default Home;

