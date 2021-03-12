import Book from "./book";

const testLibrary = [
  new Book("The Lord of the Rings", "J.R.R. Tolkien", 1000, false),
  new Book("JS for Impatient Programmers", "Axel Rauschmayer", 200, true),
  new Book("Javascript Allongé Six", "Reg Braithwaite", 400, false),
];

class Library {
  constructor(library) {
    this.library = library || testLibrary;
  }

  addBook({ title, author, pages, read }) {
    this.library.push(new Book(title, author, pages, read));
  }

  removeBook(index) {
    this.library.splice(index, 1);
  }

  setBookReadStatus(index, read) {
    this.library[index].read = read;
  }

  getBooks() {
    return this.library;
  }
}

export default Library;
