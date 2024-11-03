// References to HTML elements
const currentDateParagraph = document.getElementById("current-date");
const dateOptionsSelectElement = document.getElementById("date-options");

// Getting the current date and extracting individual components
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();

// Default formatted date as day-month-year
const formattedDate = `${day}-${month}-${year}`;
currentDateParagraph.textContent = formattedDate;

// Event listener for when the user changes the format selection
dateOptionsSelectElement.addEventListener("change", () => {

  switch (dateOptionsSelectElement.value) {
    case "yyyy-mm-dd":
      // Reverse the format to year-month-day
      currentDateParagraph.textContent = formattedDate
        .split("-")
        .reverse()
        .join("-");
      break;
    case "mm-dd-yyyy-h-mm":
      // Format as month-day-year with hour and minute
      currentDateParagraph.textContent = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;
      break;
    default:
      // Default format (day-month-year) if no option selected
      currentDateParagraph.textContent = formattedDate;
  }
  });