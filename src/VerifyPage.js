// src/VerifyPage.js
import React from 'react';

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-blue-500">AI Factify Verification Report</h1>
      <p className="text-sm text-gray-500 italic mb-6">Where Truth is Real — and We Take It Seriously</p>

      <section className="bg-gray-50 p-5 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Source: <span className="text-black">Reuters</span></h2>
        <p className="text-sm text-gray-600 mb-3">Verified on: <strong>March 24, 2025</strong></p>
        <div className="flex gap-4 text-sm mb-3">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">✅ Trust Score: 94%</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Bias: Low</span>
        </div>
        <p className="text-sm text-gray-700">
          This source passed our AI analysis with a high trust score. It consistently provides well-sourced, non-exaggerated content and has low bias.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">📰 Articles Analyzed</h3>
        <ul className="text-sm text-blue-600 list-disc list-inside space-y-1">
          <li><a href="https://www.reuters.com/article/climate-change" target="_blank" rel="noopener noreferrer">“Climate scientists agree Earth is warming”</a></li>
          <li><a href="https://www.reuters.com/article/covid-vaccine-trust" target="_blank" rel="noopener noreferrer">“No evidence of microchips in COVID-19 vaccines”</a></li>
        </ul>
      </section>

      <p className="text-xs text-gray-400 italic mt-10">
        This page is part of AI Factify's verification program. If you believe this score needs to be reevaluated, please contact us at verify@aifactify.com.
      </p>
    </div>
  );
}
