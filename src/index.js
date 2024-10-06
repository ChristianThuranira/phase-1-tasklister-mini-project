document.addEventListener("DOMContentLoaded", () => {
  // your code here
});
document.addEventListener("DOMContentLoaded", () => {
  // your code here
});
document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');

  // Load tasks from localStorage on page load
  loadTasks();

  // Function to load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTask(task.description));
  }

  // Function to save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#tasks li').forEach(li => {
      tasks.push({ description: li.firstChild.textContent });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to create a new task
  function createTask(taskDescription) {
    const li = document.createElement('li');
    li.textContent = taskDescription;

    // Create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('task-button'); // Add class for styling
    editButton.addEventListener('click', () => {
      const newTaskDescription = prompt('Edit your task:', taskDescription);
      if (newTaskDescription) {
        li.firstChild.textContent = newTaskDescription; // Update the text of the task
        saveTasks(); // Save tasks after editing
      }
    });

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X'; // Change text to 'X'
    deleteButton.classList.add('task-button'); // Add class for styling
    deleteButton.addEventListener('click', () => {
      taskList.removeChild(li);
      saveTasks(); // Save tasks after deletion
    });

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    saveTasks(); // Save tasks after adding a new one
  }

  // Event listener for form submission
  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskInput = document.getElementById('new-task-description');
    const taskDescription = taskInput.value.trim();
    
    if (taskDescription) {
      createTask(taskDescription);
      taskInput.value = ''; // Clear the input field
    } else {
      alert('Please enter a task description. You cannot submit an empty field.'); // Warning message
    }
  });
});
