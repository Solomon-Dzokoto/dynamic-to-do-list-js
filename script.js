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
        textContent.appendChild(button);

        button.onclick = function () {
            taskList.removeChild(textContent)
            tasks = tasks.filter(task => task !== taskText);
            saveTasks()
        };
        taskList.appendChild(textContent);
    }
    
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            tasks.push(taskText); // Update tasks array
            createTaskElement(taskText); 
            saveTasks();

            taskInput.value = ""; 
        } else {
            alert("Please enter a task");
        }
    }


    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    loadTasks();
});
