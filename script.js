document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("task-list");
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    let tasks = [];

    
    const loadTasks =() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                createTaskElement(task);
            });
        }
    }

   
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

    
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            tasks.push(taskText); // Update tasks array
            createTaskElement(taskText); 
            saveTasks(); // Save to Local Storage

            taskInput.value = ""; 
        } else {
            alert("Please enter a task");
        }
    }

   
    function removeTask(taskText) {
        tasks = tasks.filter(task => task !== taskText); // Update tasks array
        saveTasks(); 
        taskList.innerHTML = ""; t
        loadTasks(); 
    }

   
    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    loadTasks();
});
