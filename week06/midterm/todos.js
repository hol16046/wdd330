import Storage from './ls.js';


// To Do List Array
var toDoList = new Array();

export default class ToDos {
    constructor(elementId) {
        this.parentElement = document.getElementById(elementId);
        this.listParent = document.getElementById('toDoList');
        this.storage = new Storage();
    }

    getAllTasks() {
        toDoList = this.storage.readToDoList('listStorage');
        return toDoList;

    }

    getTaskByName(content) {
        return this.getAllTasks().find(task => task.content === content);
    }

    showToDoList() {
        this.listParent.innerHTML = '';
        renderToDoList(this.listParent, this.getAllTasks());
        renderForm(this.getAllTasks());
        this.addToDoListener(this.getAllTasks());
    }

    addToDo(newTask) {
        const storedList = this.storage.readToDoList('listStorage');
        if (storedList != null) {
            toDoList = storedList;
        } else {
            toDoList = new Array();
        }
        console.log('add task');
        console.log(toDoList);
        toDoList.push({id: new Date(),
            content: newTask,
            completed: false
        });
        this.storage.storeToDoList(toDoList);
        
    }

    completeTask(content) {
        const completedTask = this.getTaskByName(content);
        if (completedTask.completed === false) {
            completedTask.completed = true;
        } else if (completedTask.completed === true) {
            completedTask.completed = false;
        };
        this.storage.storeToDoList(toDoList);
        console.log(toDoList);
        return completedTask.completed;
    }

    removeTask(taskElement, taskContent) {
        let list = this.storage.readToDoList('listStorage');
        const removeMe = this.getTaskByName(taskContent);
        console.log(removeMe);
        const removeMeIndex = list.map(function(removeMe) { return removeMe.content; }).indexOf(taskContent);
        list.splice(removeMeIndex, 1);
        taskElement.remove();
        this.storage.storeToDoList(list);
        console.log(list);
    }

    filterCompleteTasks() {
        return this.getAllTasks().filter(task => (task.completed === true));
    }

    filterUnfinishedTasks() {
        return this.getAllTasks().filter(task => (task.completed === false));
    }

    addToDoListener() {
        // Task Completed Status
        const completeArray = Array.from(document.getElementsByClassName('completedBox'));
        completeArray.forEach(child => {
            child.addEventListener('click', e => {
                const status = this.completeTask(e.currentTarget.parentElement.dataset.name);
                console.log(status);
                if (status === true) {
                    child.classList.add('completed');
                } else {
                    child.className = 'completedBox';
                }
            });
        });

        // Remove Task
        const deleteArray = Array.from(document.getElementsByClassName('delete'));
        deleteArray.forEach(child => {
            child.addEventListener('click', e => {
                this.removeTask(e.currentTarget.parentElement, e.currentTarget.parentElement.dataset.name);
            });
        });

        // Add Task Form
        const newTaskContent = document.getElementById('newTask');
        console.log(document.getElementById('addButton'));
        document.getElementById('addButton').addEventListener('click', (event) => {
            this.addToDo(newTaskContent.value);
        console.log(toDoList);
        });
    }
     
    

}

//End of ToDos Class

function renderToDoList(parent, tasks) {
    if (tasks != null) {

        const checkBox = document.querySelector('.completedBox');
        tasks.forEach(task => {
            parent.appendChild(renderOneTask(task));
        });
    }
}

function renderOneTask(task) {
    const item = document.createElement('li');
    item.classList.add('task');
    item.setAttribute('data-name', task.content);
    item.innerHTML = `<div class="completedBox` + (task.completed ? `completed` : ``) + `"></div>
        <p>${task.content}</p>
        <div class="delete">
            <p>X</p>
        </div>`;
    return item;
}

function renderForm(list) {
    const form = document.createElement('form');
    form.classList.add('form');
    form.innerHTML = `<textarea name="newTask" id="newTask" placeholder="Enter your task here"></textarea>
        <button type="submit" id="addButton">+</button>`;
    document.getElementById('container').appendChild(form);
}
