import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // To navigate to different pages within your app
import { db } from './Config/firebase';  // Your Firestore database reference
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';  // Firestore queries

// This is your React functional component.

  function TrustedNewsSpotlight() {
  const [latestArticle, setLatestArticle] = useState(null);  // State to store the latest article
  const [likes, setLikes] = useState(0);  // State to store the number of likes
  const [notHelpful, setNotHelpful] = useState(0);  // State to track "not helpful" votes
  const [comment, setComment] = useState('');  // State to handle comment input
  const [comments, setComments] = useState([]);  // State to store comments

  // Fetch the latest verified article from Firestore
  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('dateVerified', 'desc'), limit(1));  // Firestore query
    const unsubscribe = onSnapshot(q, (snapshot) => {  // Listen for real-time updates
      if (!snapshot.empty) {
        setLatestArticle({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
      }
    });

    // Cleanup function to unsubscribe from the Firestore listener
    return unsubscribe;
  }, []);  // Empty dependency array means this effect runs only once when the component mounts

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, { text: comment }]);  // Add the comment to the list
      setComment('');  // Clear the comment input field
    }
  };

  // If there's no latest article, show a loading message
  if (!latestArticle) {
    return <div className="text-center py-6">Loading latest verified news...</div>;
  }

  // Render the component when the latest article is loaded
  return (
    <section className="mt-20 mb-16 bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
      <h3 className="text-xl font-bold mb-6 text-gray-700 text-center">
        🗞️ Trusted News Spotlight
      </h3>
      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 space-y-4">
        <h4 className="text-lg font-semibold text-blue-500">{latestArticle.title}</h4>
        <p className="text-sm text-gray-600">
          Published by{' '}
          <span className="font-medium text-gray-800">{latestArticle.publisher}</span> — Verified on{' '}
          <span className="italic text-gray-500">
            {new Date(latestArticle.dateVerified.seconds * 1000).toLocaleDateString()}
          </span>
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          {latestArticle.summary.substring(0, 200)}...
        </p>

        {/* Section for comment and like functionality */}
        <div className="flex gap-4">
          <button className="text-green-500" onClick={() => setLikes(likes + 1)}>
            👍 Helpful ({likes})
          </button>
          <button className="text-red-500" onClick={() => setNotHelpful(notHelpful + 1)}>
            👎 Not Helpful ({notHelpful})
          </button>
        </div>

        {/* Comments section */}
        <div className="mt-6">
          <textarea
            className="w-full border rounded-md p-2 text-sm"
            placeholder="Share your thoughts... (max 250 characters)"
            maxLength={250}
            value={comment}
            onChange={(e) => setComment(e.target.value)}  // Update comment state
          />
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
            onClick={handleCommentSubmit}
          >
            Post Comment
          </button>
        </div>

        {/* Display comments */}
        <div className="mt-6 space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="border-t pt-2">
              <p className="text-sm text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div>

        {/* Link to explore more news */}
        <div className="text-center mt-6">
          <Link
            to="/news-spotlight"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold"
          >
            🚀 Explore Latest Verified News
          </Link>
        </div>
        <p className="text-center text-xs mt-6 text-gray-400 italic">
          Only news with high AI-verified truth scores are featured here. Where Truth is Real — and
          We Take It Seriously.
        </p>
      </div>
    </section>
  );
}

export default TrustedNewsSpotlight;