// src/NewsSpotlightPage.js
import React, { useEffect, useState } from 'react';
import { db } from './Config/firebase';
import { collection, query, orderBy, where, limit, onSnapshot } from 'firebase/firestore';

const categories = [
  { name: 'Politics', emoji: '🌐' },
  { name: 'World', emoji: '🌍' },
  { name: 'Entertainment', emoji: '🎬' }
];

export default function NewsSpotlightPage() {
  const [news, setNews] = useState({
    Politics: [],
    World: [],
    Entertainment: []
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
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-sky-500 mb-8">🗞️ Factify News Spotlight</h1>

      {categories.map(({ name, emoji }) => (
        <section key={name} className="mb-12">
          <h2 className="text-2xl font-semibold border-b-2 border-sky-300 pb-2 mb-4">
            {emoji} {name}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {news[name].map(article => (
              <div key={article.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {article.summary.substring(0, 120)}...
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex gap-2 text-xs mb-2">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      ✅ Trust: {article.trustScore}%
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      🎯 Bias: {article.bias}
                    </span>
                  </div>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline text-sm">
                    🔗 Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}