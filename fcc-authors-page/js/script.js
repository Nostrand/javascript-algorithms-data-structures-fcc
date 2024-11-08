// Select the container element where authors will be displayed
const authorContainer = document.getElementById('author-container');

// Select the button that loads more authors when clicked
const loadMoreBtn = document.getElementById('load-more-btn');

// Initialize indices to control which authors are displayed
let startingIndex = 0;
let endingIndex = 8; // Initially display 8 authors
let authorDataArr = []; // Array to hold the author data fetched from the API

// Fetch the author data from the provided JSON URL
fetch('https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json')
  .then((res) => res.json()) // Parse response as JSON
  .then((data) => {
    authorDataArr = data; // Store fetched data in the authorDataArr array
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex)); // Display the first 8 authors
  })
  .catch((err) => {
    // Display an error message if there's a problem loading data
    authorContainer.innerHTML = '<p class="error-msg">There was an error loading the authors</p>';
  });

// Function to fetch and display more authors when "Load More" button is clicked
const fetchMoreAuthors = () => {
  // Update indices to fetch the next set of 8 authors
  startingIndex += 8;
  endingIndex += 8;

  // Display the next set of authors using updated indices
  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));

  // Disable the "Load More" button if there are no more authors to load
  if (authorDataArr.length <= endingIndex) {
    loadMoreBtn.disabled = true; // Disable button
    loadMoreBtn.style.cursor = "not-allowed"; // Change cursor style to indicate it's disabled
    loadMoreBtn.textContent = 'No more data to load'; // Update button text
  }
};

// Function to display a list of author objects on the page
const displayAuthors = (authors) => {
  // Iterate over each author object in the provided authors array
  authors.forEach(({ author, image, url, bio }, index) => {
    // Append HTML for each author's card to the authorContainer element
    authorContainer.innerHTML += `
    <div id="${index}" class="user-card">
      <h2 class="author-name">${author}</h2>
      <img class="user-img" src="${image}" alt="${author} avatar">
      <div class="purple-divider"></div>
      <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + '...' : bio}</p>
      <a class="author-link" href="${url}" target="_blank">${author} author page</a>
    </div>
  `;
  });
};

// Add an event listener to the "Load More" button to fetch more authors on click
loadMoreBtn.addEventListener('click', fetchMoreAuthors);