export default function TestTailwind() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-5xl font-extrabold text-blue-600 underline mb-4">
          Tailwind is ALIVE! 🔥
        </h1>
        <p className="text-lg text-gray-700 max-w-md">
          If you're seeing styles like big fonts, blue text, gradients, and centered content... it means Tailwind is working via CDN!
        </p>
      </div>
    );
  }
  