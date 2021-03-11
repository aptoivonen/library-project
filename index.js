// const myLibrary = [];
const myLibrary = [
  new Book("The Lord of the Rings", "J.R.R. Tolkien", 1000, false),
  new Book("JS for Impatient Programmers", "Axel Rauschmayer", 200, true),
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

myLibrary.forEach((book) => console.log(book.info()));

function addBookToLibrary(book) {
  myLibrary.push(book);
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

function handleNewBookClick(e) {
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
      (book) =>
        `<tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${!(book.pages == null) ? book.pages : ""}</td>
      <td>${book.read ? "&#10003;" : ""}</td>
    </tr>`
    )
    .join("");
  bookTable.tBodies[0].innerHTML = html;
}

UpdateBookTable(bookTable);
