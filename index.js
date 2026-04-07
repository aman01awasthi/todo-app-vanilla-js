// DATA: Load saved tasks from localStorage when app starts
// If nothing saved yet, loadTasks returns an empty array
let tasks = loadTasks();

// Render the task list immediately on page load
renderTask();

// PURPOSE: Create a new task object and add it to the tasks array
// RECEIVES: name (string) — the task text typed by the user
function addTask(name) {
    // Build a task object with a unique id, the name, and default status false
    let newTask = {
        id: Date.now(),   // Date.now() gives unique number based on current timestamp
        name: name,
        status: false,    // false = not completed yet
    }
    tasks.push(newTask);  // Add new task to the end of the array
    saveTasks();          // Persist updated array to localStorage
}

// PURPOSE: Remove a task from the array by its id
// RECEIVES: id (number) — the unique id of the task to delete
function deleteTask(id) {
    // Keep every task whose id does NOT match — effectively removes the target
    tasks = tasks.filter(task => id !== task.id);
    saveTasks();
}

// PURPOSE: Flip a task's status between complete and not complete
// RECEIVES: id (number) — the unique id of the task to toggle
let toggleComplete = (id) => {
    // Find the exact task object in the array whose id matches
    let targetTask = tasks.find(task => id == task.id);
    // ! flips the boolean — false becomes true, true becomes false
    targetTask.status = !targetTask.status;
    saveTasks();
}

// PURPOSE: Clear the DOM list and redraw it from the current tasks array
// RECEIVES: taskList (array, optional) — a filtered list or undefined
// If no argument passed, falls back to the full tasks array
function renderTask(taskList) {
    // Update the remaining count display
    let count = document.getElementById('count');
    count.innerHTML = countRemaining();

    // Grab the ul/ol container and wipe it before redrawing
    let displayTasks = document.getElementById('taskList');
    displayTasks.innerHTML = "";

    // Use filtered list if passed, otherwise show everything
    let listToRender = taskList || tasks;

    listToRender.forEach(task => {
        // Create a new li element for each task
        let li = document.createElement('li');
        li.textContent = task.name;

        // If task is completed, add CSS class for strikethrough + fade
        if (task.status) {
            li.classList.add('completed');
        }

        // Build the Delete button and wire its click to deleteTask
        let delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => {
            deleteTask(task.id);
        })

        // Build the Complete/Undo button — label changes based on current status
        let completeBtn = document.createElement('button');
        completeBtn.textContent = task.status ? 'Undo' : 'Complete';
        completeBtn.addEventListener('click', () => {
            toggleComplete(task.id);
        })

        // Attach both buttons to the li, then attach li to the list container
        li.appendChild(delBtn);
        li.appendChild(completeBtn);
        displayTasks.appendChild(li);
    })
}

// PURPOSE: Read input, validate it, call addTask, then clear the field
document.getElementById('addBtn').addEventListener('click', () => {
    let input = document.getElementById('taskInput');
    let taskName = input.value.trim();  // .trim() removes accidental spaces

    // Stop here if input is empty — don't add blank tasks
    if (taskName === '') return;

    addTask(taskName);
    input.value = '';  // Clear the input field after adding
})

// PURPOSE: Count how many tasks are not yet completed
// RETURNS: number
function countRemaining() {
    // Filter to only incomplete tasks, return how many there are
    return tasks.filter(task => task.status === false).length;
}

// PURPOSE: Save the current tasks array to localStorage
// localStorage only stores strings, so we convert array to JSON string
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// PURPOSE: Load tasks from localStorage when the app starts
// RETURNS: parsed array if data exists, empty array if nothing saved yet
function loadTasks() {
    let storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
        // Convert JSON string back to a real JavaScript array
        return JSON.parse(storedTasks);
    } else {
        // First time app loads — no data yet, start fresh
        return [];
    }
}

// PURPOSE: Return a filtered version of the tasks array based on the filter argument
// RECEIVES: filter (string) — "active", "complete", or anything else for all
// RETURNS: filtered array (does NOT change the original tasks array)
function filterTasks(filter) {
    if (filter === "active") {
        // Return only tasks not yet completed
        return tasks.filter(task => task.status === false)
    }

    if (filter === "complete") {
        // Return only completed tasks
        return tasks.filter(task => task.status === true)
    }

    else {
        // No filter — return everything
        return tasks;
    }
}

// Wire filter buttons — each one calls renderTask with the right filtered list
document.getElementById('allBtn').addEventListener('click', () => {
    renderTask(filterTasks("all"));
});

document.getElementById('activeBtn').addEventListener('click', () => {
    renderTask(filterTasks('active'));
});

document.getElementById('completeBtn').addEventListener('click', () => {
    renderTask(filterTasks('complete'));
});