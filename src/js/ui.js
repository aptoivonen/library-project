class UI {
  constructor(library) {
    this.library = library;

    this.newBookButton = document.getElementById("new-book-button");
    this.newBookButton.addEventListener(
      "click",
      this.handleNewBookClick.bind(this)
    );
    this.formOverlay = document.getElementById("form-overlay");
    this.form = document.getElementById("book-form");
    this.createButton = document.getElementById("create-button");
    this.createButton.addEventListener(
      "click",
      this.handleCreateClick.bind(this)
    );
    this.cancelButton = document.getElementById("cancel-button");
    this.cancelButton.addEventListener(
      "click",
      this.handleCancelClick.bind(this)
    );
    this.bookTable = document.getElementById("book-table");
    this.bookTable.addEventListener("click", this.handleDeleteClick.bind(this));
    this.bookTable.addEventListener("click", this.handleReadClick.bind(this));

    this.init();
  }

  handleNewBookClick() {
    this.formOverlay.classList.remove("hide");
  }

  handleCreateClick(e) {
    e.preventDefault();
    this.formOverlay.classList.add("hide");
    const newBookData = getBookData(new FormData(form));
    this.library.addBook(newBookData);
    this.updateBookTable();

    function getBookData(formData) {
      const title = formData.get("title");
      const author = formData.get("author");
      const pagesInt = Number.parseInt(formData.get("pages"), 10);
      const pages = !Number.isNaN(pagesInt) ? pagesInt : undefined;
      const read = !!formData.get("read");
      return { title, author, pages, read };
    }
  }

  handleCancelClick() {
    this.form.reset();
    this.formOverlay.classList.add("hide");
  }

  handleDeleteClick(e) {
    if (e.target.classList.contains("delete-button")) {
      const index = parseInt(e.target.dataset.id, 10);
      this.library.removeBook(index);
      this.updateBookTable();
    }
  }

  handleReadClick(e) {
    if (e.target.classList.contains("read-checkbox")) {
      const index = parseInt(e.target.dataset.id, 10);
      const read = !!e.target.checked;
      this.library.setBookReadStatus(index, read);
      this.updateBookTable();
    }
  }

  updateBookTable() {
    const html = this.library
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
    this.bookTable.tBodies[0].innerHTML = html;
  }

  init() {
    this.updateBookTable();
  }
}

export default UI;
