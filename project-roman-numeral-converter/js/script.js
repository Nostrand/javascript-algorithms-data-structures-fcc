// Object mapping of decimal values to Roman numerals
const romanNumerals = {
  1000: 'M',
  900: 'CM',
  500: 'D',
  400: 'CD',
  100: 'C',
  90: 'XC',
  50: 'L',
  40: 'XL',
  10: 'X',
  9: 'IX',
  5: 'V',
  4: 'IV',
  1: 'I'
};

// Create an array of Roman numeral keys sorted from largest to smallest
const keys = Object.keys(romanNumerals).sort((a, b) => b - a);

// Grab the 'Convert' button and output element from the DOM
const convert = document.getElementById("convert-btn");
const output = document.getElementById('output');

// Function to return Roman numeral for exact matches
const romanConverter = (input) => {
  return romanNumerals[input];
}

// Function to convert a number to its full Roman numeral representation, when there isn't an exact match right away
const romanFullConverter = (input) => {
  let result = "";
  let remainder = input;

  // Loop through each Roman numeral starting from the largest
  for (let i = 0; i < keys.length ; i++){
    const key = parseInt(keys[i]);
    while(remainder >= key){
      result += romanNumerals[key];
      remainder -= key;
    }
  }
  return result;
}

// Event listener for the 'Convert' button click
convert.addEventListener("click", () => {
  const input = document.getElementById("number").value.trim();

  // Validation checks for the input
  if (input === ""){
    output.textContent = 'Please enter a valid number';
  } else if (input <= 0){
    output.textContent = 'Please enter a number greater than or equal to 1'
  } else if (input > 3999){
    output.textContent = 'Please enter a number less than or equal to 3999'
  } else if (romanNumerals[input]){
    output.textContent = romanConverter(input);
  } else {
    // If the input is not an exact match, convert it using the full converter
    output.textContent = romanFullConverter(parseInt(input));
  }
})