// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
laodEventListeners();


//load all event listeners 

function laodEventListeners() {
    // dom load event
    document.addEventListener('DOMContentLoaded', getTasks);


    // add task list
    form.addEventListener('submit', addTask);
    // remove taskList
    taskList.addEventListener('click', removeTask);
    // clear taskevent
    clearBtn.addEventListener('click', clearTasks);
    // filter tsks event
    filter.addEventListener('keyup', filterTasks);
}
    
// get tasks from local storage
    function getTasks() {
        let tasks;
        if(localStorage.getItem('tasks') === null) {
            tasks = [];
        }   else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(task){
             // create li element
                const li =document.createElement('li');
                // Add class
                li.className = 'collection-item';
                // create text node and append to li
                li.appendChild(document.createTextNode(task));
                // create new link element
                const link = document.createElement('a');
                // Add class
                link.className = 'delete-item secondary-content';
                // add icon html
                link.innerHTML = '<i class="fa fa-remove"></i>';
                // append the link to li
                li.appendChild(link);
                // append li to ul
                taskList.appendChild(li);
        }) ;   
    }

// add task

function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }
    // create li element
    const li =document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);

    // store in local storage
    storeTaskInLocalStorage(taskInput.value); 

    // clear input
    taskInput.value = '';

    e.preventDefault();
}

// local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }   else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
       
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));



}

// removeTask
function removeTask(e) {

    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
        e.target.parentElement.parentElement.remove();
            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    
    // e.preventDefault();
}
// remove from LS

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }   else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index) {
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks 

function clearTasks() {
    
    // one way of doing
            // taskList.innerHTML = '';
    // another way
    // faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from Ls
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage()
 {
    localStorage.clear();
 }

// filterTasks

function filterTasks (e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';

        }
    });
}