// src/SignUp.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from './components/Config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Consistent Header Component
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

// Consistent Footer Component
const Footer = () => (
  <footer className="bg-gray-100 mt-10 py-4 text-center text-xs text-gray-400">
    <p>© {new Date().getFullYear()} AI Factify™ — All Rights Reserved.</p>
  </footer>
);

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/sign-in');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100">
      <Header />
      <main className="flex-grow flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-2 text-sky-400">
            🚀 Join AI Factify
          </h2>
          <p className="text-xs italic text-center text-gray-500 mb-4">
            "Did you know? AI Factify verifies over 1,000 facts every day!" ✨
          </p>
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
          <form onSubmit={handleSignUp}>
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
            <button type="submit" className="w-full p-2 bg-sky-400 text-white rounded-md hover:bg-sky-500">
              Sign Up
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-700">Already have an account?</p>
            <button
              onClick={() => navigate('/sign-in')}
              className="text-sky-400 text-sm hover:underline"
            >
              Sign In
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}