const express = require('express');
const { calculateScores } = require('../scoring/scoring.js');

const app = express();
const PORT = 3000;

// Route for the root, serves an HTML page with a button
app.get('/', (req, res) => {
  res.send(html);
});

// Route for /scores
app.get('/scores', (req, res) => {
  // Calculates scores using the calculateScores function
  const scores = calculateScores();

  // Sends the scores as a JSON response
  res.json(scores);
});

// Starts the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
