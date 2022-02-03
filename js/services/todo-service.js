'use strict';

const STORAGE_KEY = 'todosDB';
var gTodos;
var gFilterBy = 'ALL';
var gSortBy;

function createTodos() {
  _createTodos();
}

function getTodosForDisplay() {
  _sortTodos(gSortBy);
  if (gFilterBy === 'ALL') return gTodos;
  return gTodos.filter(
    (todo) => (todo.isDone && gFilterBy === 'DONE') || (!todo.isDone && gFilterBy === 'ACTIVE')
  );
}

function removeTodo(todoId) {
  const idx = gTodos.findIndex((todo) => todo.id === todoId);
  gTodos.splice(idx, 1);
  _saveTodosToStorage();
}

function toggleTodo(todoId) {
  var todo = gTodos.find((todo) => todo.id === todoId);
  todo.isDone = !todo.isDone;
  _saveTodosToStorage();
}

function addTodo(txt, importance) {
  const todo = _createTodo(txt, importance);
  gTodos.unshift(todo);
  _saveTodosToStorage();
}

function getTodosCount() {
  return gTodos.length;
}

function getActiveTodosCount() {
  const activeTodos = gTodos.filter((todo) => !todo.isDone);
  return activeTodos.length;
}

function setFilter(filterBy) {
  gFilterBy = filterBy;
}

function isFiltered() {
  return gFilterBy === 'ALL';
}

function setSort(sortBy) {
  gSortBy = sortBy;
}

function editTodoLocation(direction, idx) {
  var temp = null;
  if (direction === 'up') {
    temp = gTodos[idx];
    gTodos[idx] = gTodos[idx - 1];
    gTodos[idx - 1] = temp;
    return;
  } else {
    temp = gTodos[idx];
    gTodos[idx] = gTodos[idx + 1];
    gTodos[idx + 1] = temp;
  }
}

function _createTodos() {
  gTodos = loadFromStorage(STORAGE_KEY);
  if (!gTodos || !gTodos.length) {
    gTodos = [
      _createTodo('Learn HTML'),
      _createTodo('Study CSS'),
      _createTodo('Master Javascript'),
    ];
    _saveTodosToStorage();
  }
}

function _createTodo(txt, importance = 1) {
  const todo = {
    id: _makeId(),
    txt: txt,
    isDone: false,
    createdAt: Date.now(),
    importance,
  };
  return todo;
}

function _makeId(length = 5) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function _saveTodosToStorage() {
  saveToStorage(STORAGE_KEY, gTodos);
}

function _sortTodos(sortBy) {
  if (gSortBy === 'None') return;
  switch (sortBy) {
    case 'CREATED':
      gTodos = gTodos.sort(
        (a, b) => b.createdAt - a.createdAt
        // b.createdAt > a.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
      );
      break;
    case 'TXT':
      gTodos.sort((a, b) => {
        var x = a.txt;
        var y = b.txt;
        return x.toUpperCase() > y.toUpperCase() ? 1 : y.toUpperCase() > x.toUpperCase() ? -1 : 0;
      });
      break;
    case 'IMPORTANCE':
      gTodos.sort(
        (a, b) => b.importance - a.importance
        // b.importance > a.importance ? 1 : a.importance > b.importance ? -1 : 0
      );
      break;
  }
}
