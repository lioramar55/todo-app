'use strict';

// called on body load
function onInit() {
  renderTodos();
}

function onRemoveTodo(ev, todoId) {
  ev.stopPropagation();

  if (confirm('Are you sure you want to delete this TODO?')) removeTodo(todoId);
  renderTodos();
}

function renderTodos() {
  // get todos from service
  const todos = getTodosForDisplay();
  var strHTMLs = ``;
  if (todos.length) {
    strHTMLs = todos.map((todo, idx) => {
      return `<li class="${todo.isDone ? 'done' : ''}" onclick="onToggleTodo(event, '${todo.id}')">
              ${todo.txt} | ${getPrintedTime(todo.createdAt)} | ${createEditButtons(idx)} 
              <button class= "inline-btn" onclick="onRemoveTodo(event, '${todo.id}')">X</button>
              (${todo.importance})
            </li>`;
    });
    strHTMLs = strHTMLs.join('');
  } else {
    strHTMLs += `<h3>Add something to do...</h3>`;
  }
  document.querySelector('.todo-list').innerHTML = strHTMLs;

  document.querySelector('.todos-total-count').innerText = getTodosCount();
  document.querySelector('.todos-active-count').innerText = getActiveTodosCount();
}

function createEditButtons(idx) {
  if (!isFiltered()) return '';
  var strHTML = '';
  if (idx > 0)
    strHTML += `<button onclick="onEditLocation(event, 'up', ${idx})" class="inline-btn">↑</button>`;
  if (idx < gTodos.length - 1)
    strHTML += `<button onclick="onEditLocation(event, 'down', ${idx})" class="inline-btn">↓</button>`;
  return strHTML;
}

function onEditLocation(ev, direction, idx) {
  editTodoLocation(direction, idx);
  ev.stopPropagation();
  renderTodos();
}

function onToggleTodo(ev, todoId) {
  toggleTodo(todoId);
  ev.stopPropagation();

  renderTodos();
}

function onAddTodo() {
  const elTxt = document.querySelector('input[name=todoTxt]');
  const importance = document.querySelector('.importance-level').value.trim();
  const txt = elTxt.value;

  if (txt.length) {
    addTodo(txt, importance);
  }

  elTxt.value = '';
  renderTodos();
}

function onSetFilter(filterBy) {
  setFilter(filterBy);
  renderTodos();
}

function onSetSort(sortBy) {
  setSort(sortBy);
  renderTodos();
}
