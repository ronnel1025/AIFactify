// src/Widgets.js
import React from 'react';

export function MostTalkedPerson() {
  return (
    <div className="bg-white shadow p-4 rounded-lg text-center">
      <h3 className="text-lg font-bold text-gray-800">Most Talked About</h3>
      <p className="text-blue-600 mt-2">John Doe</p>
    </div>
  );
}

export function MostFactCheckedPerson() {
  return (
    <div className="bg-white shadow p-4 rounded-lg text-center">
      <h3 className="text-lg font-bold text-gray-800">Most Fact-Checked</h3>
      <p className="text-purple-600 mt-2">Jane Smith</p>
    </div>
  );
}
