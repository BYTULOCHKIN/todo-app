"use strict";

// CONST
// create toDo
const todoInput = document.querySelector(".todo__input"),
  todoButton = document.querySelector(".todo__button"),
  todoList = document.querySelector(".todo-list"),
  todoItem = document.querySelectorAll(".todo-item"),
  filterParameters = document.querySelector(".filter-todo"),
  // logIn const
  authorizeLogin = document.querySelector("#login"),
  authorizePass = document.querySelector("#pass"),
  authorizeWindow = document.querySelector(".login"),
  authorizeBtn = document.querySelector("#submitlog"),
  //MODAL WINDOW
  modalTodo = document.querySelector(".modal"),
  closeBtn = document.querySelector(".fas"),
  logError = document.querySelectorAll(".login__error");
// Event Listener

authorizeBtn.addEventListener("click", logIn);
authorizeBtn.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    addTodo();
  }
});
todoButton.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    addTodo();
  }
});
document.addEventListener("DOMContentLoaded", getTodo);

// Filter event
todoList.addEventListener("click", deleteTodo);
filterParameters.addEventListener("click", filterTodo);

// AUTHORIZATION

function logIn() {
  if (
    authorizeLogin.value === "testuser@todo.com" ||
    authorizePass.value === "12345678"
  ) {
    authorizeWindow.classList.add("none");
  } else {
    logError[0].classList.toggle("active");
    logError[1].classList.toggle("active");
  }
}

// FUNCTIONS
function addTodo() {
  if (todoInput.value.trim() === "") {
    modalTodo.classList.add("active");
    if (modalTodo.classList.contains("active") === true) {
      closeBtn.addEventListener("click", () => {
        modalTodo.classList.remove("active");
      });
    }
  } else {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");

    //
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo__text");
    todoDiv.appendChild(newTodo);
    const todoTime = document.createElement("div");
    todoTime.classList.add("todo-time");
    todoDiv.appendChild(todoTime);
    // add time for todo
    todoTime.innerText = new Date().toUTCString();

    //add todo to local storage
    storageTodo(todoInput.value);

    // buttons done

    const doneButton = document.createElement("button");
    doneButton.innerHTML = '<i class="fas fa-check"></i>';
    doneButton.classList.add("done__btn");
    todoDiv.appendChild(doneButton);

    // btn delete
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add("delete__btn");
    deleteButton.setAttribute("data-hystmodal", "#myModal");

    todoDiv.appendChild(deleteButton);
    // appent to list
    todoList.prepend(todoDiv);

    //clear input value
    todoInput.value = "";
  }
}

function deleteTodo(event) {
  const item = event.target;

  // delete to do
  if (item.classList[0] === "delete__btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    deleteLocalTodos(todo);
    todo.remove();
  }

  //compelte btn
  if (item.classList[0] === "done__btn") {
    const todo = item.parentElement;
    todo.classList.toggle("complete");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "complete":
        if (todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "notcomplete":
        if (!todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function storageTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodo() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    //
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo__text");
    todoDiv.appendChild(newTodo);
    // add time
    const todoTime = document.createElement("div");
    todoTime.classList.add("todo-time");
    todoDiv.appendChild(todoTime);
    todoTime.innerText = new Date().toUTCString();
    // buttons done
    const doneButton = document.createElement("button");
    doneButton.innerHTML = '<i class="fas fa-check"></i>';
    doneButton.classList.add("done__btn");
    todoDiv.appendChild(doneButton);

    // btn delete
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add("delete__btn");
    deleteButton.setAttribute("data-hystmodal", "#myModal");

    todoDiv.appendChild(deleteButton);
    // appent to list
    todoList.appendChild(todoDiv);
  });
}

function deleteLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
