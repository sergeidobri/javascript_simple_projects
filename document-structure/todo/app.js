const formInput = document.querySelector("#task__input");
const btn = document.querySelector("#tasks__add");
const tasksList = document.querySelector("#tasks__list");

// handler
function handleClick(event) {
    event.preventDefault();

    const todoTitle = formInput.value.trim();
    if(todoTitle.length == 0) return;

    createTodo(todoTitle);
    saveTodoToStorage(todoTitle);
    formInput.closest("form").reset();
}

// work with TODOs
function createTodo(txt) {
    tasksList.insertAdjacentHTML('beforeend', `
        <div class="task">
            <div class="task__title">
                ${txt}
            </div>
            <a href="#" class="task__remove">&times;</a>
        </div>
    `);

    tasksList.lastElementChild.querySelector(".task__remove").addEventListener("click", deleteTodo);
}

function deleteTodo(event) {
    event.target.removeEventListener('click', deleteTodo);

    const thisTodo = event.target.closest(".task");
    const todoIndex = Array.from(tasksList.children).findIndex(task => task == thisTodo);

    deleteTodoFromStorage(todoIndex);
    thisTodo.remove();
}

// work with local storage
function saveTodoToStorage(todo) {
    const newTodos = [...JSON.parse(localStorage.getItem("todos")), todo];
    localStorage.setItem("todos", JSON.stringify(newTodos));
}

function deleteTodoFromStorage(todoIndex) {
    const newTodos = JSON.parse(localStorage.getItem("todos")).filter((_, i) => i != todoIndex);
    localStorage.setItem("todos", JSON.stringify(newTodos));
}

function loadTodosFromStorage() {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if(!todos) {
        localStorage.setItem("todos", JSON.stringify([]));
        return;
    }

    todos.forEach(todo => createTodo(todo));
}

// event listeners
document.addEventListener("DOMContentLoaded", loadTodosFromStorage);
btn.addEventListener("click", handleClick);