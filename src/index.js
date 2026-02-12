import { favoriteBooks } from "./storage.js";
import { searchBook } from "./api.js";

import { Book } from "./book.js";

window.addEventListener("load", async () => {
  console.log("Favorite Books:", favoriteBooks);
  // console.log(await searchBook("Harry Potter"));
  const booksContainer = document.getElementById("books-container");

  for (let i = 0; i < 10; i++) {
    const book = new Book("Harry Potter", "J.K. Rowling", 1997, "");
    booksContainer.innerHTML += book.createCard();
  }
});
