// src/VerifiedBadge.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function VerifiedBadge({ sourceName, trustScore, verifiedDate }) {
  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg p-4 border border-green-300">
      <div className="text-center">
        <div className="text-2xl mb-2">🎖️</div>
        <div className="font-bold text-sky-500">AI Factify™ Verified</div>
        <div className="text-xs italic text-gray-500">"Where Truth is Real"</div>
      </div>

      <div className="mt-4 flex flex-col items-center space-y-2">
        <div className="text-sm font-semibold text-gray-700">{sourceName}</div>
        <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
          ✅ Trust Score: {trustScore}%
        </div>
        <div className="text-xs text-gray-500">📅 Verified: {verifiedDate}</div>
        <Link to={`/verify/${sourceName}`} className="text-xs text-sky-400 hover:underline">
          🔍 View Verification Report
        </Link>
      </div>
    </div>
  );
}