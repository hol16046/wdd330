const key = "listStorage"

export default class Storage {
    constructor() {
    }

    storeToDoList(toDoList) {
        const data = JSON.stringify(toDoList);
        localStorage.setItem(key, data);
    }

    readToDoList(key) {
        const data = JSON.parse(localStorage.getItem(key));
        return data;
    }
}