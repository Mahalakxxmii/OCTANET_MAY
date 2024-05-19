const todoList = document.getElementById('todo-list');
const addTodoForm = document.getElementById('add-todo-form');
const newTodoInput = document.getElementById('new-todo');

// Get existing to-do items from local storage (optional)
const storedTodos = JSON.parse(localStorage.getItem('todos'));

// If there are stored to-dos, add them to the list
if (storedTodos) {
  storedTodos.forEach(todo => {
    addTodo(todo.text, todo.completed);
  });
}

// Add a new to-do item
function addTodo(text, completed = false) {
  const listItem = document.createElement('li');
  listItem.innerText = text;
  listItem.classList.add('todo-item');

  const completeButton = document.createElement('button');
  completeButton.innerText = completed ? 'Undo' : 'Complete';
  completeButton.addEventListener('click', () => {
    listItem.classList.toggle('completed');
    completeButton.innerText = listItem.classList.contains('completed') ? 'Undo' : 'Complete';
    updateTodos();
  });

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', () => {
    todoList.removeChild(listItem);
    updateTodos();
  });

  listItem.appendChild(completeButton);
  listItem.appendChild(deleteButton);

  if (completed) {
    listItem.classList.add('completed');
  }

  todoList.appendChild(listItem);
  newTodoInput.value = ''; // Clear input field after adding
  updateTodos();
}

// Update to-do list in local storage (optional)
function updateTodos() {
  const todos = Array.from(todoList.querySelectorAll('.todo-item'))
    .map(item => ({
      text: item.innerText.slice(0, -8), // Remove completion status text
      completed: item.classList.contains('completed'),
    }));
  localStorage.setItem('todos', JSON.stringify(todos));
}