"use strict";

// CONST
const todoInput = document.querySelector(".todo__input"),
  todoButton = document.querySelector(".todo__button"),
  todoList = document.querySelector(".todo-list");
const todoItem = document.querySelectorAll(".todo-item"),
  filterParameters = document.querySelector(".filter-todo");

// Event Listener

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterParameters.addEventListener("click", filterTodo);

// FUNCTIONS
function addTodo(event) {
  if (todoInput.value === "") {
    return;
  } else {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    //
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo__text");
    todoDiv.appendChild(newTodo);
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
    //clear input value
    todoInput.value = "";
  }
}

function deleteTodo(event) {
  const item = event.target;

  // delete to do
  if (item.classList[0] === "delete__btn") {
    const todo = item.parentElement;
    todo.remove();
  }
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
