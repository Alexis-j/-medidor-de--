// scoring.js
const fs = require('fs');
const path = require('path');

// Reads survey data from the 'src/answers/answers.json' file
function readSurveyData() {
  const data = fs.readFileSync(path.join(__dirname, '..', 'answers', 'challenge.answers.json'), 'utf-8');
  return JSON.parse(data);
}


// Adds the roundToOneDecimal function to round scores to one decimal place
function roundToOneDecimal(value) {
  return parseFloat(value.toFixed(1));
}

// Calculates scores based on survey responses
function calculateScores() {
  // Reads survey data
  const surveyData = readSurveyData();

  // Filters responses by gender
  const filterResponsesByGender = (gender) => surveyData.filter((response) => response.gender === gender);

  // Calculates the average score for a set of responses
  const calculateAverage = (responses) => {
    if (responses.length < 3) {
      return null;
    }

    // Filters only responses with a numeric value in the 'rating' property
    const validResponses = responses.filter(response => typeof response.rating === 'number');

    // Checks if there are no valid responses after filtering
    if (validResponses.length === 0) {
      console.error('No valid responses with numeric value to calculate the average.');
      return null;
    }


    // Calculates the average only with valid responses
    const totalRating = validResponses.reduce((sum, response) => sum + response.rating, 0);

    return roundToOneDecimal(totalRating / validResponses.length);
  };

  // Filters responses by gender
  const femaleResponses = filterResponsesByGender('female');
  const maleResponses = filterResponsesByGender('male');
  const diverseResponses = filterResponsesByGender('diverse');

  // Calculates average scores for each gender
  const femaleScore = calculateAverage(femaleResponses);
  const maleScore = calculateAverage(maleResponses);
  const diverseScore = calculateAverage(diverseResponses);

  // Checks if any score is null and adjusts as needed
  if (femaleScore === null || maleScore === null || diverseScore === null) {
    console.error('Not enough responses for some genders or other error occurred.');
  }


  return {
    femaleScore,
    maleScore,
    diverseScore,
  };
}

module.exports = { calculateScores };


