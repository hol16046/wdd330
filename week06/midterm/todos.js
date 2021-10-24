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

    getTaskByid(id) {
		console.log(id);
		console.log(this.getAllTasks());
        return this.getAllTasks().find(task => task.id === id);
    }

    showToDoList() {
        this.listParent.innerHTML = '';
        renderToDoList(this.listParent, this.getAllTasks());
        renderForm();
		renderFilters();
        this.addToDoListener();
		this.addToDoListenerManip();
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
        toDoList.push(
		{
			id: new Date(),
            content: newTask,
            completed: false
        });
        this.storage.storeToDoList(toDoList);
		console.log(toDoList);
        
    }

    completeTask(id) {
        const completedTask = this.getTaskByid(id);
        if (completedTask.completed === false) {
            completedTask.completed = true;
        } else if (completedTask.completed === true) {
            completedTask.completed = false;
        };
		//completedTask.completed = !completedTask.completed;
        this.storage.storeToDoList(toDoList);
        console.log(toDoList);
        return completedTask.completed;
    }

    removeTask(taskElement, taskid) {
        let list = this.storage.readToDoList('listStorage');
        const removeMe = this.getTaskByid(taskid);
        const removeMeIndex = list.map(function(removeMe) { return removeMe.id; }).indexOf(taskid);
		if (removeMeIndex != -1)
		{
			list.splice(removeMeIndex, 1);
			taskElement.remove();
			this.storage.storeToDoList(list);
		}
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
	}
	addToDoListenerManip() {
        // Filter Task
        const toDoFilters = Array.from(document.getElementsByClassName('toDoFilters'));
        toDoFilters.forEach(child => {
            child.addEventListener('click', e => {
                //this.removeTask(e.currentTarget.parentElement, e.currentTarget.parentElement.dataset.name);
				console.log(e.target.id);
				if(e.target.id == "activeTasks")
				{
					this.listParent.innerHTML = '';
					renderToDoList(this.listParent, this.filterUnfinishedTasks());
					this.addToDoListener();
				}
				if(e.target.id == "completedTasks")
				{
					this.listParent.innerHTML = '';
					renderToDoList(this.listParent, this.filterCompleteTasks());
					this.addToDoListener();
				}
				if(e.target.id == "allTasks")
				{
					this.listParent.innerHTML = '';
					renderToDoList(this.listParent, this.getAllTasks());
					this.addToDoListener();
				}
            });
        });

        // Add Task Form
        const newTaskContent = document.getElementById('newTask');
        console.log(newTaskContent.value);
        document.getElementById('addButton').addEventListener('click', (event) => {
            this.addToDo(newTaskContent.value);
        });
    }
}

//End of ToDos Class

function renderToDoList(parent, tasks) {
	console.log(parent)
	//this.listParent.innerHTML = '';
    if (tasks != null) {
        const checkBox = document.querySelector('.completedBox');
        tasks.forEach(task => {
			//console.log(renderOneTask(task));
            parent.appendChild(renderOneTask(task));
		});
	}
}
function renderOneTask(task) {
    const item = document.createElement('li');
    item.classList.add('task');
    //item.setAttribute('data-name', task.content);
    item.setAttribute('data-name', task.id);
    item.innerHTML = `<div class="completedBox` + (task.completed ? ` completed` : `` )+ `"></div>
        <p>${task.content}</p>
        <div class="delete">
            <p>X</p>
        </div>`;
    return item;
}

function renderForm() {
    const form = document.createElement('form');
    form.classList.add('form');
    form.innerHTML = `<textarea name="newTask" id="newTask" placeholder="Enter your task here"></textarea>
        <button type="submit" id="addButton">+</button>`;
    document.getElementById('container').appendChild(form);
}

function renderFilters() {
    const form = document.createElement('form2');
    form.classList.add('form2');
    form.innerHTML = `<button id="allTasks" class="toDoFilters">All</button>
	<button id="activeTasks" class="toDoFilters">Active</button>
	<button id="completedTasks" class="toDoFilters">Completed</button>`;
    document.getElementById('container').appendChild(form);
}