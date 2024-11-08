// Get references to HTML elements (inputs and button)
const messageInput = document.getElementById("message-input");
const result = document.getElementById("result");
const checkMessageButton = document.getElementById("check-message-btn");

// Define regex patterns for detecting various types of spam
const helpRegex = /please help|assist me/i;
const dollarRegex = /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i;
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;
const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;
const dearRegex = /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i;

// Array of regex patterns to check against the message
const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

// Function to check if the message matches any spam pattern
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));

// Event listener to check the message when the button is clicked
checkMessageButton.addEventListener("click", () => {
  if (messageInput.value === "") {
    alert("Please enter a message.");
    return;
  }

  // Display whether the message is spam or not
  result.textContent = isSpam(messageInput.value)
    ? "Oh no! This looks like a spam message."
    : "This message does not seem to contain any spam.";
  // Clear the input field after checking
  messageInput.value = "";
});