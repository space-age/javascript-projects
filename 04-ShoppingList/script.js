"use strict";

// Items selected
const form = document.querySelector(".list-form");
const alert = document.querySelector(".alert");
const listItem = document.getElementById("item");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".list-container");
const list = document.querySelector(".list-list");
const clearBtn = document.querySelector(".clear-btn");

// Variables used when edit mode
let editElement;
let editFlag = false;
let editID = "";

let checked = false; // tracks whether a checkbox is checked
let editInput;

// sumbmit form
form.addEventListener("submit", addItem);

// Clear items in the list
clearBtn.addEventListener("click", clearItems);

// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

/****************************************************
  Functions
****************************************************/
/*
  Add items
*/
function addItem(e) {
  e.preventDefault();

  const value = item.value; //value entered by user in input
  const id = new Date().getTime().toString(); // set a unique id with time

  if (value !== "" && !editFlag) {
    createListItem(id, value);
    displayAlert("Item added to the list", "success");
    container.classList.add("show-list-container"); // show container
    addToLocalStorage(id, value); // set local storage
    setBackToDefault(); // Reset default values
  }
  // if in edit mode
  else if (value !== "" && editFlag) {
    const valueToCapital = value.charAt(0).toUpperCase() + value.slice(1);
    editElement.innerHTML = valueToCapital;

    editElement.setAttribute("data-content", `${valueToCapital}`);
    editInput.setAttribute("value", `${valueToCapital}`);

    // editElement.innerHTML = value;
    displayAlert("Value has been changed", "success");
    // edit local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("Please enter Value", "danger");
  }
}

/*
  Delete items
*/
function deleteItem(e) {
  //gets the <article> that being selected
  const element = e.currentTarget.parentElement.parentElement;

  // gets the id that was set when <article> was created
  const id = element.dataset.id;

  //Removes the element from the web
  list.removeChild(element);

  //if list has reached zero, then hide the container
  if (list.children.length === 0) {
    container.classList.remove("show-list-container");
  }

  displayAlert("Item removed from list", "danger");

  // remove from local storage
  removeFromLocalStorage(id);
  setBackToDefault();
}

/*
  Edit items
*/
function editItem(e) {
  //gets the <article> that being selected
  const element = e.currentTarget.parentElement.parentElement;

  // Selects the label tag
  editElement = document.getElementById(`label-${element.dataset.id}`);
  // Selects the input tag
  editInput = document.getElementById(`${element.dataset.id}`);

  // Sets the value to what inner HTML is present
  listItem.value = editElement.innerHTML.trim();
  editFlag = true;
  editID = element.dataset.id;

  // Changes Submit button to text: edit
  submitBtn.textContent = "edit";

  window.scroll(0, 0);
}

/*
  Display Alert
*/
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert after certain amount of time
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

/*
  Set back to defaults
*/
function setBackToDefault() {
  item.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

/*
  Clear items in the list
*/
function clearItems() {
  const items = document.querySelectorAll(".list-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-list-container");
  displayAlert("All items removed", "danger");
  setBackToDefault();

  // Deletes entire local storage
  localStorage.removeItem("list");
}

/*
  Checks if checkbox is checked, and edits local storage
*/
function checkBox(e) {
  if (e.target.checked) checked = true;
  else checked = false;

  editLocalStorage(e.target.id, this.value, checked);
}

/****************************************************
  Local storage
****************************************************/
/*
  Gets the local storage
*/
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

/*
  Adds item from list into local storage
*/
function addToLocalStorage(id, value, check = false) {
  const list = { id, value, check };
  let items = getLocalStorage();
  items.push(list);
  localStorage.setItem("list", JSON.stringify(items));
}

/*
  Edits local storage
*/
function editLocalStorage(id, value, check) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
      if (typeof check !== "undefined") item.check = check;
    }
    return item;
  });

  localStorage.setItem("list", JSON.stringify(items));
}

/*
  Removes from local storage 
*/
function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) return item;
  });

  localStorage.setItem("list", JSON.stringify(items));
}
/****************************************************
  Set up items when APP is loaded
****************************************************/
function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value, item.check);
    });
    container.classList.add("show-list-container");
  }
}

function createListItem(id, value, check) {
  /*
    The following 5 lines will do this:
    <article data-id="{id}" class="list-item"></article>
  */
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("list-item");

  const valueToCapital = (
    value.charAt(0).toUpperCase() + value.slice(1)
  ).trim();

  element.innerHTML = `
      <div class="list-checkbox">
        <input type="checkbox" id="${id}" value="${value}"name="todo" ${
    check ? "checked" : ""
  }/>
        <label for="${id}" data-content="${valueToCapital}" id="label-${id}">
        ${valueToCapital}</label>
      </div>
      <div class="btn-container">
        <button type="button" class="edit-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="edit-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button type="button" class="delete-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="delete-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>`;

  // append child
  list.appendChild(element);

  // event listeners for edit/delete buttons
  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");
  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);

  // event listener for checkbox
  const checkboxBtn = document.getElementById(`${id}`);
  checkboxBtn.addEventListener("change", checkBox);
}
