import Fuse from 'fuse.js';

// Example data (this would be a list of possible search terms or phrases)
const searchData = [
  'Analyze truth in voice recordings',
  'Check media truth in images',
  'Fact-check shared links'
];

const options = {
  includeScore: true,
  threshold: 0.3, // Adjust threshold for match tolerance
  keys: ['name'] // Searchable fields
};

const fuse = new Fuse(searchData, options);

// In your handleCheck function, do a fuzzy search on the input query
const handleCheck = async () => {
  if (!input.trim()) return;

  const results = fuse.search(input);

  if (results.length > 0) {
    const closestMatch = results[0]; // The best match
    console.log('Did you mean:', closestMatch.item);
    // Continue with processing the result
  } else {
    console.log('No matches found.');
  }

  // Your existing logic for calling the API and handling the input
};
