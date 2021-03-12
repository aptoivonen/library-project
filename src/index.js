import "./scss/style.scss";

// const myLibrary = [];
const myLibrary = [
  new Book("The Lord of the Rings", "J.R.R. Tolkien", 1000, false),
  new Book("JS for Impatient Programmers", "Axel Rauschmayer", 200, true),
  new Book("Javascript Allongé Six", "Reg Braithwaite", 400, false),
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages}, ${
    this.read ? "read" : "not read yet"
  }`;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

function setReadStatus(index, read) {
  myLibrary[index].read = read;
}

// UI Stuff
const newBookButton = document.getElementById("new-book-button");
newBookButton.addEventListener("click", handleNewBookClick);
const formOverlay = document.getElementById("form-overlay");
const form = document.getElementById("book-form");
const createButton = document.getElementById("create-button");
createButton.addEventListener("click", handleCreateClick);
const cancelButton = document.getElementById("cancel-button");
cancelButton.addEventListener("click", handleCancelClick);
const bookTable = document.getElementById("book-table");
bookTable.addEventListener("click", handleDeleteClick);
bookTable.addEventListener("click", handleReadClick);

function handleNewBookClick() {
  formOverlay.classList.remove("hide");
}

function handleCreateClick(e) {
  e.preventDefault();
  formOverlay.classList.add("hide");
  makeBookFromFormData(new FormData(form));
  UpdateBookTable(bookTable);
}

function handleCancelClick() {
  form.reset();
  formOverlay.classList.add("hide");
}

function handleDeleteClick(e) {
  if (e.target.classList.contains("delete-button")) {
    const index = parseInt(e.target.dataset.id, 10);
    removeBookFromLibrary(index);
    UpdateBookTable(bookTable);
  }
}

function handleReadClick(e) {
  if (e.target.classList.contains("read-checkbox")) {
    const index = parseInt(e.target.dataset.id, 10);
    const read = !!e.target.checked;
    setReadStatus(index, read);
    UpdateBookTable(bookTable);
  }
}

function makeBookFromFormData(formData) {
  const title = formData.get("title");
  const author = formData.get("author");
  const pagesInt = Number.parseInt(formData.get("pages"), 10);
  const pages = !Number.isNaN(pagesInt) ? pagesInt : undefined;
  const read = !!formData.get("read");
  addBookToLibrary(new Book(title, author, pages, read));
}

function UpdateBookTable(bookTable) {
  const html = myLibrary
    .map(
      (book, index) =>
        `<tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${!(book.pages == null) ? book.pages : ""}</td>
      <td><input class="read-checkbox" type="checkbox" 
            data-id="${index}" 
            ${book.read ? "checked" : ""}>
      </td>
      <td><button class="btn delete-button" type="button" data-id="${index}">Delete</button></td>
    </tr>`
    )
    .join("");
  bookTable.tBodies[0].innerHTML = html;
}

function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function init() {
  if (storageAvailable("localStorage")) {
    if (!localStorage.getItem("myLibrary")) {
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    } else {
      myLibrary.length = 0;
      const storageLibrary = JSON.parse(localStorage.getItem("myLibrary"));
      storageLibrary.forEach((el) => myLibrary.push(el));
    }
  }
  UpdateBookTable(bookTable);
}

init();
