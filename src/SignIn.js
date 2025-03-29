// src/SignIn.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from './components/Config/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

// ✅ Consistent Header Component
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
          <Link to="/sign-in" className="text-sky-400 hover:text-sky-500">
            Sign In
          </Link>
        </li>
        <li>
          <Link to="/sign-up" className="text-sky-400 hover:text-sky-500">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

// ✅ Consistent Footer Component
const Footer = () => (
  <footer className="bg-gray-100 mt-10 py-4 text-center text-xs text-gray-400">
    <p>© {new Date().getFullYear()} AI Factify™ — All Rights Reserved.</p>
  </footer>
);

export default function SignIn({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        navigate('/'); // Redirect to homepage if logged in
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, [navigate, setIsLoggedIn]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100">
      <Header />
      <main className="flex-grow flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-2 text-sky-400">
            🔑 Welcome Back!
          </h2>
          <p className="text-xs italic text-center text-gray-500 mb-4">
            "Welcome back, truth seeker! Time to unlock more verified facts." ✨
          </p>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded-md mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-sky-400 text-white rounded-md hover:bg-sky-500"
            >
              Sign In
            </button>
          </form>
          <div className="text-center mt-4 space-y-1">
            <p className="text-sm text-gray-700">Don't have an account?</p>
            <button
              onClick={() => navigate('/sign-up')}
              className="text-sky-400 text-sm hover:underline"
            >
              Sign Up
            </button>
            <p className="text-sm mt-2">
              <Link to="/forgot-password" className="text-sky-400 hover:underline">
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}