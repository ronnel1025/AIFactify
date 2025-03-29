// src/FactifyNewsHub.js
import React, { useEffect, useState } from 'react';
import { db } from './Config/firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';

const categories = [
  { name: 'Politics', emoji: '🌐' },
  { name: 'Business', emoji: '📈' },
  { name: 'Entertainment', emoji: '🎬' },
  { name: 'Sports', emoji: '⚽' }
];

export default function FactifyNewsHub() {
  const [news, setNews] = useState({
    Politics: [], Business: [], Entertainment: [], Sports: []
  });

  useEffect(() => {
    categories.forEach(({ name }) => {
      const q = query(
        collection(db, 'news'),
        where('category', '==', name),
        orderBy('dateVerified', 'desc'),
        limit(3)
      );
      onSnapshot(q, (snapshot) => {
        setNews(prev => ({ ...prev, [name]: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) }));
      });
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-sky-500 text-center mb-10">
        🗞️ Factify News Hub
      </h1>

      {categories.map(({ name, emoji }) => (
        <section key={name} className="mb-14">
          <h2 className="text-2xl font-bold border-l-4 border-sky-400 pl-3 mb-6 flex items-center gap-2">
            {emoji} {name}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {news[name].map(article => (
              <div key={article.id} className="bg-white rounded-lg shadow-lg p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-3">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{article.summary.substring(0, 110)}...</p>
                </div>
                <div>
                  <div className="flex gap-2 text-xs mb-3">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      ✅ Trust: {article.trustScore}%
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      🎯 Bias: {article.bias}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">
                      🔗 Read More
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(article.url)}&text=${encodeURIComponent(article.title)}&hashtags=FactifyVerified,TrustedNews,${name}`}
                      target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                      🐦 Share
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}