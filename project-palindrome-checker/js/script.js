// References to HTML elements
const inputField = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

// Add an event listener to check palindrome when the button is clicked
checkButton.addEventListener('click', function(){
  // Trim whitespace from input to ensure accurate checking
  const trimmedText = inputField.value.trim();

  // Remove all non-alphanumeric characters and convert to lowercase for a case-insensitive comparison
  const cleanedText = trimmedText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  // Reverse the cleaned text to compare it to the original cleaned version
  const reversedText = cleanedText.split('').reverse().join('');

  // Alert the user if no input was provided
  if (cleanedText === ''){
    alert('Please input a value');
  }
  // Display palindrome result if the cleaned text matches the reversed version
  else if(cleanedText === reversedText){
    resultDiv.innerHTML = `${inputField.value} is a palindrome`;
  }
  // Display non-palindrome result if the cleaned text does not match the reversed version
  else {
    resultDiv.innerHTML = `${inputField.value} is not a palindrome`;
  }
})