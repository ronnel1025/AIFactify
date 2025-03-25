// src/TrustAndRebuttal.js

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TrustAndRebuttal() {
  const [threads, setThreads] = useState([
    {
      id: 1,
      claim: "Climate change is caused by human activities",
      verdict: "True",
      explanation: "Multiple studies confirm that human activities, including fossil fuel combustion and deforestation, are major drivers of climate change.",
      reactions: {
        helpful: 12,
        surprising: 4,
        notTrue: 1,
      },
    },
    {
      id: 2,
      claim: "Vaccines cause autism",
      verdict: "False",
      explanation: "Numerous large-scale studies have found no link between vaccines and autism.",
      reactions: {
        helpful: 20,
        surprising: 2,
        notTrue: 15,
      },
    },
  ]);

  const handleReaction = (threadId, reactionType) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              reactions: {
                ...thread.reactions,
                [reactionType]: thread.reactions[reactionType] + 1,
              },
            }
          : thread
      )
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        <span className="text-gray-600">Trust</span>
        <span className="text-blue-500"> & Rebuttal</span>
      </h1>

      <p className="text-center text-gray-500 max-w-2xl mx-auto mb-6">
        Let your voice be heard. React to popular claims with support, surprise, or disagreement.
      </p>

      <div className="text-center mb-8">
        <Link to="/social" className="text-blue-500 underline hover:text-blue-600">
          ← Back to Social Hub
        </Link>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        {threads.map((thread) => (
          <div key={thread.id} className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Claim: {thread.claim}</h2>
            <p className="text-sm text-gray-500 mb-1">Verdict: {thread.verdict}</p>
            <p className="text-gray-700">{thread.explanation}</p>

            <div className="flex space-x-4 mt-4">
              <button
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200"
                onClick={() => handleReaction(thread.id, 'helpful')}
              >
                👍 Helpful ({thread.reactions.helpful})
              </button>
              <button
                className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded hover:bg-yellow-200"
                onClick={() => handleReaction(thread.id, 'surprising')}
              >
                🤯 Surprising ({thread.reactions.surprising})
              </button>
              <button
                className="bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200"
                onClick={() => handleReaction(thread.id, 'notTrue')}
              >
                👎 Not True ({thread.reactions.notTrue})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
