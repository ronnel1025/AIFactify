
// src/Discussion.js
import { useState, useEffect } from 'react';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Discussion() {
  const { resultId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Load comments from local storage clearly for each resultId
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(`comments-${resultId}`)) || [];
    setComments(savedComments);
  }, [resultId]);

  // Handle comment submission clearly
  const handleCommentSubmit = () => {
    if (!newComment.trim()) {
      alert("Please enter your comment clearly first!");
      return;
    }
    const updatedComments = [...comments, { id: Date.now(), text: newComment }];
    setComments(updatedComments);
    localStorage.setItem(`comments-${resultId}`, JSON.stringify(updatedComments));
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      <Helmet>
        <title>Discussion - AI Factify</title>
      </Helmet>

      {/* Consistent Header clearly explained (exactly like Home page) */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">
            <span className="text-gray-500">AI</span><span className="text-sky-400">Factify</span>
          </h1>
          <p className="text-xs italic text-gray-400">Where Truth is Real</p>
        </div>
        <nav className="space-x-4 text-sm text-gray-600 hidden sm:block">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/voice" className="hover:underline">Voice</Link>
          <Link to="/video" className="hover:underline">Video</Link>
          <Link to="/image-analyzer" className="hover:underline">Image</Link>
          <Link to="/article-analyzer" className="hover:underline">Article</Link>
        </nav>
      </header>

      {/* Main Discussion Content clearly explained */}
      <main className="p-6 max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Link to="/" className="text-blue-500 hover:underline">← Back to Results</Link>
          <h2 className="text-xl font-bold text-gray-700 my-4">🎤 Discussion for Result #{resultId}</h2>

          {/* Comment Box clearly explained */}
          <textarea
            placeholder="Your awesome comment..."
            className="w-full border border-gray-300 p-3 rounded text-sm resize-none mb-4"
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button
            onClick={handleCommentSubmit}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 text-sm"
          >
            🎤 Drop the Mic
          </button>

          {/* Comments Display clearly explained */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-600 mb-2">💬 Comments ({comments.length})</h3>
            {comments.length === 0 ? (
              <p className="text-sm text-gray-500">Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="border-b py-2">
                  <p className="text-sm text-gray-700">{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Consistent Footer clearly explained */}
      <footer className="bg-gray-100 mt-10 py-4 text-center text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} AI Factify™ by Ron Echual — All Rights Reserved.</p>
        <div className="mt-2 space-x-4">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </footer>
    </div>
  );
}

export default Discussion;