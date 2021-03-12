import Book from "./book";

const NAME = "library";

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

function getLibrary() {
  const item = localStorage.getItem(NAME);
  if (!item) return [];
  return JSON.parse(item, reviver);
}

function setLibrary(libraryArray) {
  localStorage.setItem(NAME, JSON.stringify(libraryArray, replacer));
}

function reviver(key, value) {
  if (value && value.__type__ === "Book") {
    return new Book(value.title, value.author, value.pages, value.read);
  }
  return value;
}

function replacer(key, value) {
  if (value instanceof Book) {
    return {
      __type__: "Book",
      ...value,
    };
  }
  return value;
}

export { storageAvailable, getLibrary, setLibrary };
