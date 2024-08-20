// References to HTML elements
const inputField = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

checkButton.addEventListener('click', function(){
  const trimmedText = inputField.value.trim();
  const cleanedText = trimmedText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  const reversedText = cleanedText.split('').reverse().join('');
  if (cleanedText === ''){
    alert('Please input a value');
  } else if(cleanedText === reversedText){
    resultDiv.innerHTML = `${inputField.value} is a palindrome`;
  }
  else {
    resultDiv.innerHTML = `${inputField.value} is not a palindrome`;
  }
})