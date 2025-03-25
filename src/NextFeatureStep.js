import { Link } from 'react-router-dom';

export default function NextFeatureStep() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Coming Soon: Social Interaction Features</h1>
      
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <p className="text-lg">
          We're building the next layer of truth: interactive, social-powered fact-checking that brings community and credibility together.
        </p>

        <div className="space-y-2">
          <Link
            to="/social/rebuttal"
            className="block bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition"
          >
            💬 Trust & Rebuttal
          </Link>
          <Link
            to="/social/truththreads"
            className="block bg-green-500 text-white py-3 px-6 rounded-lg shadow hover:bg-green-600 transition"
          >
            🧵 Truth Threads
          </Link>
          <Link
            to="/social/factvibes"
            className="block bg-purple-500 text-white py-3 px-6 rounded-lg shadow hover:bg-purple-600 transition"
          >
            🔥 Fact Vibes Feed
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Want to be part of the first batch of verified users and testers? Let us know soon!
        </p>
      </div>
    </div>
  );
}
