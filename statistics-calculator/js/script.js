// Function to calculate the mean (average) of an array
const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

// Function to calculate the median of an array
const getMedian = (array) => {
  // Sort the array in ascending order
  const sorted = array.toSorted((a, b) => a - b);

  // Check if the length is even or odd and calculate the median
  const median =
    sorted.length % 2 === 0
      ? getMean([sorted[sorted.length / 2], sorted[sorted.length / 2 - 1]])
      : sorted[Math.floor(sorted.length / 2)];
  return median;
}

// Function to calculate the mode of an array (most frequent number(s))
const getMode = (array) => {
  const counts = {};
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  })

  // Check if all numbers appear the same number of times (no mode)
  if (new Set(Object.values(counts)).size === 1) {
    return null;
  }

  // Sort the keys by frequency (highest first) and get the highest frequency element(s)
  const highest = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a]
  )[0];

  // Get all elements that appear the most times (mode)
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  );

  // Return the mode(s) as a comma-separated string
  return mode.join(", ");
}

// Function to calculate the range of an array (difference between max and min values)
const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
}

// Function to calculate the variance of an array (average of squared differences from the mean)
const getVariance = (array) => {
  const mean = getMean(array);
  const variance = array.reduce((acc, el) => {
    const difference = el - mean;
    const squared = difference ** 2;
    return acc + squared;
  }, 0) / array.length;
  return variance;
}

// Function to calculate the standard deviation (square root of variance)
const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
}

// Function to get all the calculated values and display them on the page
const calculate = () => {
  // Get the input values from the user (comma-separated string of numbers)
  const value = document.querySelector("#numbers").value;

  // Convert the input string into an array of numbers
  const array = value.split(/,\s*/g);
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
  
  // Calculate the required statistical values
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);

  // Display the results in the corresponding elements on the page
  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
}