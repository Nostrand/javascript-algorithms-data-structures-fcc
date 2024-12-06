// Get references to DOM elements for user input, button, and display areas
const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

// Data for animating the call stack visualization when input is 5
const animationData = [
  {
    inputVal: 5,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    addElDelay: 2000,
    msg: "decimalToBinary(1) returns '1' (base case) and gives that value to the stack below. Then it pops off the stack.",
    showMsgDelay: 5000,
    removeElDelay: 10000,
  }
];


// Function to convert a decimal number to binary recursively
const decimalToBinary = (input) => {
  // Base case: return the number itself if it's 0 or 1
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    // Recursive case: Convert the quotient of input divided by 2 to binary, 
    // then add the remainder of input divided by 2 to form the full binary number.
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};



// Function to display the call stack animation for input 5

const showAnimation = () => {
  // Temporary text before animation completes
  result.innerText = "Call Stack Animation";

  animationData.forEach((obj) => {
    // Add a frame for the current call stack step after a delay
    setTimeout(() => {
      animationContainer.innerHTML += `
        <p id="${obj.inputVal}" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);

    // Update the frame with the explanatory message after a delay
    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    // Remove the frame after a delay
    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });

  // Show the final binary conversion result after the animation completes
  setTimeout(() => {
    result.textContent = decimalToBinary(5);
  }, 20000);
};

// Function to validate user input and perform the appropriate actions
const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
    alert("Please provide a decimal number greater than or equal to 0");
    return;
  }

  if (inputInt === 5) {
    showAnimation();
    return;
  }

  result.textContent = decimalToBinary(inputInt);
  numberInput.value = "";
};

// Add an event listener to the "Convert" button to trigger the conversion
convertBtn.addEventListener("click", checkUserInput);

// Add an event listener to allow pressing "Enter" to trigger the conversion
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});