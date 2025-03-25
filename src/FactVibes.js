// src/FactVibes.js

import { Link } from 'react-router-dom';

const mockVibes = [
  {
    claim: 'Earth is flat',
    verdict: 'FALSE',
    timestamp: 'Just now',
  },
  {
    claim: 'COVID-19 vaccine causes infertility',
    verdict: 'MISLEADING',
    timestamp: '5 minutes ago',
  },
  {
    claim: '5G spreads viruses',
    verdict: 'FALSE',
    timestamp: '10 minutes ago',
  },
];

export default function FactVibes() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <h1 className="text-3xl font-bold text-center mb-4">
        <span className="text-gray-600">🔥 Fact</span>
        <span className="text-blue-500"> Vibes</span>
      </h1>

      <p className="text-center mb-6 text-gray-600 max-w-xl mx-auto">
        Here’s what people are fact-checking in real time (anonymously). Feel the pulse of truth!
      </p>

      <div className="space-y-4 max-w-xl mx-auto">
        {mockVibes.map((vibe, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg shadow border-l-4 border-blue-400 hover:border-blue-600 transition">
            <p className="text-sm text-gray-500">{vibe.timestamp}</p>
            <p className="font-medium mt-1">
              Someone just fact-checked:
              <span className="text-blue-600"> “{vibe.claim}”</span>
            </p>
            <p className="mt-1 font-semibold text-red-600">Verdict: {vibe.verdict}</p>

            <div className="flex space-x-4 mt-2 text-sm text-gray-500">
              <span>❤️ 12</span>
              <span>💬 3</span>
              <span>🔁 5</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/social"
          className="text-blue-500 underline hover:text-blue-700 text-sm"
        >
          ← Back to Social Hub
        </Link>
      </div>
    </div>
  );
}
