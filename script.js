const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const totalTasksEl = document.getElementById("total-tasks");
const activeTasksEl = document.getElementById("active-tasks");
const completedTasksEl = document.getElementById("completed-tasks");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateStats() {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;

  totalTasksEl.textContent = total;
  activeTasksEl.textContent = active;
  completedTasksEl.textContent = completed;
}

function renderTodos() {
  if (todos.length === 0) {
    todoList.innerHTML = `
                    <div class="empty-state">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        <p>No tasks yet. Add one above to get started!</p>
                    </div>
                `;
  } else {
    todoList.innerHTML = todos
      .map(
        (todo, index) => `
                    <li class="todo-item ${todo.completed ? "completed" : ""}">
                        <div class="todo-checkbox ${todo.completed ? "checked" : ""}" onclick="toggleTodo(${index})"></div>
                        <span class="todo-text">${todo.text}</span>
                        <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
                    </li>
                `,
      )
      .join("");
  }
  updateStats();
}

function addTodo() {
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    todoInput.value = "";
    saveTodos();
    renderTodos();
  }
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

// Initial render
renderTodos();
