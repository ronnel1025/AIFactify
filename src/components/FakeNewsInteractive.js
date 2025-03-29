// src/FakeNewsInteractive.js
import React from 'react';

const FakeNewsInteractive = () => {
  const sourceData = [
    { label: 'Social Media', icon: '📱', percentage: 45, color: 'text-red-500' },
    { label: 'News Outlets', icon: '📰', percentage: 29, color: 'text-yellow-600' },
    { label: 'Random Websites', icon: '🌐', percentage: 31, color: 'text-orange-500' },
    { label: 'Messaging Apps', icon: '💬', percentage: 8, color: 'text-blue-400' },
  ];

  const countryData = [
    { label: 'United States', icon: '🇺🇸', percentage: 35, color: 'text-red-500' },
    { label: 'India', icon: '🇮🇳', percentage: 22, color: 'text-yellow-600' },
    { label: 'Russia', icon: '🇷🇺', percentage: 18, color: 'text-orange-500' },
    { label: 'Philippines', icon: '🇵🇭', percentage: 12, color: 'text-blue-400' },
    { label: 'Others', icon: '🌍', percentage: 13, color: 'text-gray-500' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-4xl mx-auto mb-12">
      {/* By Source Section */}
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">By Categories Source of Fake News</h3>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {sourceData.map((item, index) => (
          <React.Fragment key={`source-${index}`}>
            <div className="flex items-center text-gray-700">
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </div>
            <div className={`font-semibold ${item.color} text-right`}>
              {item.percentage}%
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* By Country Section */}
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">Top Fake News by Countries</h3>
      <div className="grid grid-cols-2 gap-4">
        {countryData.map((item, index) => (
          <React.Fragment key={`country-${index}`}>
            <div className="flex items-center text-gray-700">
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </div>
            <div className={`font-semibold ${item.color} text-right`}>
              {item.percentage}%
            </div>
          </React.Fragment>
        ))}
      </div>
      <p className="mt-6 text-xs text-center text-gray-400 italic">
        Data reflects current trends.
      </p>
    </div>
  );
};

export default FakeNewsInteractive;
