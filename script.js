document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("task-list");
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    let tasks = [];

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                createTaskElement(task);
            });
        }
    }

    // Save tasks to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create and append a task element
    function createTaskElement(taskText) {
        const textContent = document.createElement("li");
        textContent.textContent = taskText;

        const button = document.createElement("button");
        button.textContent = "Remove";
        button.classList.add('remove-btn');

        button.onclick = function () {
            removeTask(taskText);
        };

        textContent.appendChild(button);
        taskList.appendChild(textContent);
    }

    // Add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            tasks.push(taskText); // Update tasks array
            createTaskElement(taskText); // Update DOM
            saveTasks(); // Save to Local Storage

            taskInput.value = ""; // Clear input
        } else {
            alert("Please enter a task");
        }
    }

    // Remove a task
    function removeTask(taskText) {
        tasks = tasks.filter(task => task !== taskText); // Update tasks array
        saveTasks(); // Save updated tasks to Local Storage
        taskList.innerHTML = ""; // Clear current list
        loadTasks(); // Reload from updated tasks array
    }

    // Event listeners for adding tasks
    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});
