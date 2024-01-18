// scoring.test.js
const fs = require('fs');
const path = require('path');
const { calculateScores } = require('../src/scoring/scoring.js');

test('Calculates scores correctly', () => {
  // Path to the JSON file with survey data
  const filePath = path.resolve(__dirname, '../src/answers/challenge.answers.json');

  // Read the content of the JSON file
  const rawSurveyData = fs.readFileSync(filePath, 'utf-8');

  // Convert the content of the JSON file to an object
  const surveyData = JSON.parse(rawSurveyData);

  // Call the function and check the expected results
  const scores = calculateScores(surveyData);

  // Check that the returned scores are truthy (not undefined or null)
  expect(scores).toBeTruthy();
});
