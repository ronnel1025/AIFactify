// src/ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from './components/Config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

// Header Component (consistent & fun clearly)
const Header = () => (
  <header className="bg-white shadow p-4 flex justify-between items-center">
    <Link to="/">
      <div className="text-2xl font-bold">
        <span className="text-gray-500">AI</span>
        <span className="text-sky-400">Factify</span>
        <div className="text-sm text-gray-400 italic">Where Truth is Real</div>
      </div>
    </Link>
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link to="/sign-in" className="text-sky-400 hover:text-sky-500">Sign In</Link>
        </li>
        <li>
          <Link to="/sign-up" className="text-sky-400 hover:text-sky-500">Sign Up</Link>
        </li>
      </ul>
    </nav>
  </header>
);

// Footer Component (consistent clearly)
const Footer = () => (
  <footer className="bg-gray-100 mt-10 py-4 text-center text-xs text-gray-400">
    <p>© {new Date().getFullYear()} AI Factify™ — All Rights Reserved.</p>
  </footer>
);

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setMessage('Oops! 🧐 That doesn\'t look like a valid email.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(`✨ Magic link sent! Check your inbox at ${email}. ✨`);
      setTimeout(() => navigate('/sign-in'), 4000);
    } catch (error) {
      setMessage('Hmm, something went wrong. 🤔 Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100">
      <Header />
      <main className="flex-grow flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-2 text-sky-400">
            🎩 Forgot Your Password?
          </h2>
          <p className="text-xs italic text-center text-gray-500 mb-4">
            Don't worry, even geniuses forget passwords sometimes! 😉
          </p>

          {message && (
            <p className={`text-center text-sm ${message.includes('Magic link') ? 'text-green-500' : 'text-red-500'} mb-4`}>
              {message}
            </p>
          )}

          <form onSubmit={handlePasswordReset}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Your Email Address
              </label>
              <input
                type="email"
                className="w-full p-2 border rounded-md mt-1"
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full p-2 rounded-md ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-400 hover:bg-sky-500'} text-white`}
              disabled={loading}
            >
              {loading ? 'Sending Magic Link...' : 'Send Reset Link ✨'}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/sign-in')}
              className="text-sky-400 text-sm hover:underline"
            >
              Remembered your password? Sign In
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}