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
    // text
    const todoText = document.createElement("div");
    todoText.className = "task__title";
    todoText.innerText = txt;

    // btn
    const removeBtn = document.createElement("a");
    removeBtn.className = "task__remove";
    removeBtn.href = "#";
    removeBtn.innerText = `×`;  // ошибка с &times;
    removeBtn.addEventListener("click", deleteTodo);

    // element (text + btn)
    const todo = document.createElement("div");
    todo.className = "task";
    todo.append(todoText);
    todo.append(removeBtn);

    tasksList.append(todo);
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