document.addEventListener("DOMContentLoaded",function(){
    const  addButton = document.getElementById("add-task-btn");
    const  taskInput = document.getElementById("task-input");
    const  taskList = document.getElementById("task-list");
 

    function addTask(){
        const taskText = taskInput.value.trim();

        if(taskText !== ""){
            const textContent = document.createElement("li");
            textContent.textContent = taskText;
            const button = document.createElement("button");
            button.textContent = "Remove";
            button.className = 'remove-btn'
            button.onclick = function(){
                taskList.removeChild(textContent)
            }
            textContent.appendChild(button);
            taskList.appendChild(textContent);

            taskInput.value = "";
        }else{
            alert("please enter a task")
        }
    }

    addButton.addEventListener("click",addTask)
    taskInput.addEventListener("keypress",function(event){
        if(event.key === "Enter"){
            addTask()
        }
    }
)

document.addEventListener("DOMContentLoaded",addTask)

})