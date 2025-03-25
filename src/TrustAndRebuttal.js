import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TrustAndRebuttal() {
  const [threads, setThreads] = useState([
    {
      id: 1,
      claim: "Climate change is caused by human activities",
      verdict: "True",
      explanation:
        "Multiple studies confirm that human activities, including fossil fuel combustion and deforestation, are major drivers of climate change.",
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
      explanation:
        "Numerous large-scale studies have found no link between vaccines and autism.",
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
    <div className="min-h-screen bg-white text-gray-800 flex flex-col justify-between">
      <header className="p-6 border-b border-gray-200 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold tracking-wide">
          <span className="text-gray-400">AI</span>
          <span className="text-blue-400">Factify</span>
        </Link>
        <p className="text-sm text-gray-400 italic">Where Truth is Real</p>
      </header>

      <main className="flex-grow p-6">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-400">Truth</span>
            <span className="text-black"> and </span>
            <span className="text-blue-400">Rebuttal</span>
          </h1>
        </div>

        <div className="mb-4 text-center">
          <Link to="/social/truththreads" className="text-blue-500 underline">
            ← Back to Truth Threads
          </Link>
        </div>

        <div className="space-y-4">
          {threads.map((thread) => (
            <div key={thread.id} className="bg-gray-100 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Claim: {thread.claim}</h2>
              <p className="text-sm text-gray-500">Verdict: {thread.verdict}</p>
              <p className="text-gray-700 mt-2">{thread.explanation}</p>

              <div className="flex space-x-4 mt-4">
                <button
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200"
                  onClick={() => handleReaction(thread.id, 'helpful')}
                >
                  👍 Helpful ({thread.reactions.helpful})
                </button>
                <button
                  className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded hover:bg-yellow-200"
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
      </main>

      <footer className="bg-gray-100 py-4 border-t border-gray-200 text-center text-sm text-gray-600">
        <div className="flex justify-center space-x-6">
          <Link to="/" className="hover:text-blue-400 transition">🏠 AIFactify</Link>
          <Link to="/socialhub" className="hover:text-blue-400 transition">🌐 Social</Link>
          <Link to="/socialhub/rebuttal" className="hover:text-blue-400 transition">💬 Rebuttal</Link>
          <Link to="/socialhub/factvibes" className="hover:text-blue-400 transition">🔥 Fact Vibes</Link>
        </div>
      </footer>
    </div>
  );
}
