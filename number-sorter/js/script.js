// Get the 'sort' button element
const sortButton = document.getElementById("sort");

// Event handler for sorting when the 'sort' button is clicked
const sortInputArray = (event) => {
  event.preventDefault();

  // Collect values from all dropdowns with the class 'values-dropdown' and convert them to numbers
  const inputValues = [
    ...document.getElementsByClassName("values-dropdown")
  ].map((dropdown) => Number(dropdown.value));

  // Sort the input values in ascending order (from smallest to largest)
  const sortedValues = inputValues.sort((a, b) => {
    return a - b;
  });

  // Update the UI to display the sorted values
  updateUI(sortedValues);
}

// Function to update the user interface with sorted values
const updateUI = (array = []) => {
  // Iterate over the array and update the displayed value for each index
  array.forEach((num, i) => {
    // Get the corresponding element to display the sorted value
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  })
}

// Bubble Sort algorithm for sorting the array
const bubbleSort = (array) => {
  // Outer loop to go through the entire array
  for (let i = 0; i < array.length; i++) {
    // Inner loop to compare each pair of adjacent elements
    for (let j = 0; j < array.length - 1; j++) {
      // If the current element is greater than the next element, swap them
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
}

// Selection Sort algorithm for sorting the array
const selectionSort = (array) => {
  // Outer loop to iterate through the entire array
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;

    // Inner loop to find the smallest element in the remaining unsorted part of the array
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        // Update the minimum index if a smaller value is found
        minIndex = j;
      }
    }

    // Swap the found minimum element with the element at index i
    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }

  return array;
}

// Insertion Sort algorithm for sorting the array
const insertionSort = (array) => {
  // Start from the second element, as the first element is already "sorted"
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i];
    let j = i - 1;
    // Move elements that are greater than the current value to the right
    while (j >= 0 && array[j] > currValue) {
      // Shift the larger element to the right
      array[j + 1] = array[j];
      // Move to the previous element
      j--;
    }
    // Insert the current value at its correct position
    array[j + 1] = currValue;
  }
  return array;
}

// Add an event listener to the 'sort' button to trigger sorting when clicked
sortButton.addEventListener("click", sortInputArray);