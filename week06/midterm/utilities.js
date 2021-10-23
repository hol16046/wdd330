import ToDos from './todos.js';

const myToDos = new ToDos('container');
window.addEventListener('load', () => {
    myToDos.showToDoList();
})