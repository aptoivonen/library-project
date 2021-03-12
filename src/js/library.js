import Book from "./book";
import { storageAvailable, getLibrary, setLibrary } from "./storage";

const testLibrary = [
  new Book("The Lord of the Rings", "J.R.R. Tolkien", 1000, false),
  new Book("JS for Impatient Programmers", "Axel Rauschmayer", 200, true),
  new Book("Javascript Allongé Six", "Reg Braithwaite", 400, false),
];

class Library {
  constructor(library) {
    this.library = library || testLibrary;
    this.storage = storageAvailable("localStorage");
  }

  addBook({ title, author, pages, read }) {
    if (this.storage) {
      const fetchedLibrary = getLibrary();
      fetchedLibrary.push(new Book(title, author, pages, read));
      setLibrary(fetchedLibrary);
      return;
    }
    this.library.push(new Book(title, author, pages, read));
  }

  removeBook(index) {
    if (this.storage) {
      const fetchedLibrary = getLibrary();
      fetchedLibrary.splice(index, 1);
      setLibrary(fetchedLibrary);
      return;
    }
    this.library.splice(index, 1);
  }

  setBookReadStatus(index, read) {
    if (this.storage) {
      const fetchedLibrary = getLibrary();
      fetchedLibrary[index].read = read;
      setLibrary(fetchedLibrary);
      return;
    }
    this.library[index].read = read;
  }

  getBooks() {
    if (this.storage) {
      return getLibrary();
    }
    return this.library;
  }
}

export default Library;
