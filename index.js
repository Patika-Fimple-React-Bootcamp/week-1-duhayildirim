let todos = [];
const todoList = document.getElementById("todoList");
todoList.innerHTML = "<p>Loading...</p>";

fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then(response => response.json())
    .then(data => {
        todos = data;
        renderTodos();
        console.log(todos);
    })
    .catch(error => {
        console.log("hata: ", error);
    })

function renderTodos() {
    let todosHtml = todos.map(todo => {
        console.log(todo)
        return `
            <li class="todo-item" id="${todo.id}">
                <input onclick="handleChecked(${todo.id})" ${todo.completed ? 'checked' : ''} type="checkbox">
                    <p class="${todo.completed ? 'text-line' : ''}"> ${todo.title} </p>
                <button onclick="removeTodo(${todo.id})" class="delete-btn"> Delete </button>
            </li>
        `;
    }).join(' ');

    todoList.innerHTML = todosHtml;
}

const handleChecked = (id) => {
    let todo = todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    renderTodos();
}

const removeTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

const todoForm = document.getElementById("todoForm");
todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputTodo = document.getElementById("todoTitle").value;

    todos = [...todos, {
        id: todos.length + 1,
        title: inputTodo,
        completed: false
    }];

    renderTodos();
    todoForm.reset();
});

