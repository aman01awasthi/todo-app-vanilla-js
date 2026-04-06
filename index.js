let tasks = [];

function addTask (name) {
    let i = tasks.length +1;
    let newTask = {
        id: i,
        name: name,
        status: false,
    }
    tasks.push(newTask);
    renderTask()
}
// addTask();

function deleteTask(id){
    tasks = tasks.filter(task => id !== task.id);
}

// deleteTask();
// console.log(tasks);

let toggleComplete = (id) => {
   let newTasks = tasks.find(task => id == task.id);
    newTasks.status = !newTasks.status;
}
// toggleComplete();
// console.log(tasks);

function renderTask(){
    let count = document.getElementById('count');
    count.innerHTML = countRemaining();;
    let displayTasks = document.getElementById('taskList');
    displayTasks.innerHTML = "";

    tasks.forEach(task => {
            let li = document.createElement('li');
            li.textContent = task.name;
            li.style.listStyleType = 'none';
            li.style.padding = '10px';
            li.style.border = '1px solid #e2e2e2';
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
                renderTask();
            })

            let completeBtn = document.createElement('button');
            completeBtn.textContent = task.status ? 'Undo' : 'Complete';
            completeBtn.addEventListener('click', () => {
                toggleComplete(task.id);
                renderTask();   
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