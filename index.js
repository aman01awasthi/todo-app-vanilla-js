let tasks = [];
console.log(tasks);
function addTask (name) {
    let newTask = {
        id: Date.now(),
        name: name,
        status: false,
    }
    tasks.push(newTask);
    renderTask();
}
// addTask();

function deleteTask(id){
    tasks = tasks.filter(task => id !== task.id);
    renderTask();
}

// deleteTask();
// console.log(tasks);

let toggleComplete = (id) => {
   let targetTask = tasks.find(task => id == task.id);
    targetTask.status = !targetTask.status;
    renderTask();
}
// toggleComplete();
// console.log(tasks);

function renderTask(){
    let count = document.getElementById('count');
    count.innerHTML = countRemaining();
    let displayTasks = document.getElementById('taskList');
    displayTasks.innerHTML = "";

    tasks.forEach(task => {
            let li = document.createElement('li');
            li.textContent = task.name;
            if(task.status){
                li.style.textDecoration = 'line-through';
                li.style.opacity = "0.5";
            }

            let delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.style.color = 'red';
            delBtn.style.marginInline = '10px';
            delBtn.style.background = '#ffff';
            delBtn.addEventListener('click', () => {
                deleteTask(task.id);
            })

            let completeBtn = document.createElement('button');
            completeBtn.textContent = task.status ? 'Undo' : 'Complete';
            completeBtn.addEventListener('click', () => {
                toggleComplete(task.id);
            })

            li.appendChild(delBtn);
            li.appendChild(completeBtn);
            displayTasks.appendChild(li);
        })
}
// renderTask(tasks);

document.getElementById('addBtn').addEventListener('click', () => {
    let input = document.getElementById('taskInput');
    let taskName = input.value.trim();

    if (taskName === '') return;

    addTask(taskName);
    input.value = '';
})


function countRemaining (){
    return tasks.filter(task => task.status === false).length;
}