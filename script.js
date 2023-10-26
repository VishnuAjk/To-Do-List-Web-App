// Variables to Handle Events
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
let todoCount = document.getElementById("todo-count");

// Add button event handler
addButton.addEventListener("click", () => {
    const todoText = todoInput.value.trim(); /* Fetching input from Input-field*/
    if (todoText) {
        const li = document.createElement("li"); /*Creating an new task   */
        // Adding checkbox and dlete button to the current tasks
        li.innerHTML = `                        
            <input type="checkbox" class="checkbox">       
            <span>${todoText}</span>
            <button class="delete">Delete</button>
        `;
        todoList.appendChild(li);    /*Adding new task to toDo-List*/
        todoInput.value = "";        /*Clearing the input-field*/
        updateTaskCount();
    }
});

//List Event handler (delete and checkbox)
todoList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("delete")) {
        target.parentElement.remove();
        updateTaskCount();
    } else if (target.classList.contains("checkbox")) {
        const span = target.nextElementSibling;
        span.classList.toggle("completed");
    }
});

// List Count Updater
function updateTaskCount() {
    const tasks = todoList.getElementsByTagName("li").length;
    todoCount.innerHTML = `<h5>Total Tasks</h5> [ ${tasks} ]`;
    if(tasks==0){
        todoCount.innerHTML='Lets make a ToDo-List for your day!!';
    }
}


// Filter buttons event handlers
document.getElementById("all-tasks").addEventListener("click",() =>{
    filterTasks("All");
});

document.getElementById("completed-tasks").addEventListener("click",() =>{
    filterTasks("Completed");
});

document.getElementById("pending-tasks").addEventListener("click",() => {
    filterTasks("Pending");
});


// Filter tasks based on the selected filter
function filterTasks(selectedFilter) {
    const tasks = todoList.getElementsByTagName("li");
    let visibleTaskCount = 0; 
    for (const task of tasks) {
        const isCompleted = task.querySelector(".checkbox").checked;
        if (
            (selectedFilter === "All") ||
            (selectedFilter === "Completed" && isCompleted) ||
            (selectedFilter === "Pending" && !isCompleted)
        ) {
            task.style.display = "block";
            visibleTaskCount++;
        } else {
            task.style.display = "none";
        }
    }
    todoCount.innerHTML = `<h5>${selectedFilter} Tasks</h5> [ ${visibleTaskCount} ]`;

    if (visibleTaskCount === 0) {
        todoCount.innerHTML = 'No tasks match the selected filter.';
    }
}

