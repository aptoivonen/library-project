import "./scss/style.scss";
import Library from "./js/library";

const library = new Library();

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
  const newBookData = getBookData(new FormData(form));
  library.addBook(newBookData);
  UpdateBookTable(bookTable);
}

function handleCancelClick() {
  form.reset();
  formOverlay.classList.add("hide");
}

function handleDeleteClick(e) {
  if (e.target.classList.contains("delete-button")) {
    const index = parseInt(e.target.dataset.id, 10);
    library.removeBook(index);
    UpdateBookTable(bookTable);
  }
}

function handleReadClick(e) {
  if (e.target.classList.contains("read-checkbox")) {
    const index = parseInt(e.target.dataset.id, 10);
    const read = !!e.target.checked;
    library.setBookReadStatus(index, read);
    UpdateBookTable(bookTable);
  }
}

function getBookData(formData) {
  const title = formData.get("title");
  const author = formData.get("author");
  const pagesInt = Number.parseInt(formData.get("pages"), 10);
  const pages = !Number.isNaN(pagesInt) ? pagesInt : undefined;
  const read = !!formData.get("read");
  return { title, author, pages, read };
}

function UpdateBookTable(bookTable) {
  const html = library
    .getBooks()
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

function init() {
  UpdateBookTable(bookTable);
}

init();
