// References to HTML elements
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// Initialize task data from local storage
const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

// Function to remove special characters from strings
const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s]/g, '')
}

// Function to add a new task or update one
const addOrUpdateTask = () => {
   if(!titleInput.value.trim()){
    alert("Please provide a title");
    return;
  }
  // Check if the task is new or existing by checking the task array
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

  // Create a task object with cleaned inputs
  const taskObj = {
    id: `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: removeSpecialChars(titleInput.value),
    date: dateInput.value,
    description: removeSpecialChars(descriptionInput.value),
  };

  if (dataArrIndex === -1) { // If new task, add to the beginning of the array
    taskData.unshift(taskObj);
  } else { // If existing task, update it in the array
    taskData[dataArrIndex] = taskObj;
  }

  // Save updated task data to local storage and update the UI
  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer()
  reset()
};

// Function to render tasks in the container
const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  // Loop through each task and add HTML for each task to the container
  taskData.forEach(
    ({ id, title, date, description }) => {
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
        </div>
      `)
    }
  );
};

// Function to delete a task
const deleteTask = (buttonEl) => {
  // Find index of the task to delete based on its ID
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  // Remove the task from the DOM and task array, then update local storage
  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(taskData));
}

// Function to edit a task
const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex];

  // Populate form with existing task data for editing
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = "Update Task";

  taskForm.classList.toggle("hidden");  
}

// Function to reset the form and current task
const reset = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
}

// Initial rendering of tasks if there are any saved
if (taskData.length) {
  updateTaskContainer();
}

// Event listener to show the task form when "Add Task" button is clicked
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

// Event listener to handle form close confirmation if there are unsaved changes
closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
  const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

// Event listener to cancel form close in confirmation dialog
cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

// Event listener to discard changes and close the form in confirmation dialog
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset()
});

// Handle task form submission
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addOrUpdateTask();
});