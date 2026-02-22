import { favoriteBooks } from "./storage.js";
import { searchBook, fetchCover } from "./api/api.js";
import { Book } from "./component/book.js";
import { showBooksGridLoader } from "./loader.js";

// DOMContentLoaded = html parsed
// load = entire page loaded
window.addEventListener("DOMContentLoaded", async () => {
  const booksGrid = document.getElementById("books-grid");
  const favoritesAside = document.getElementById("favorites-aside");

  // console.log("DEBUG: favoritesBooks = ", favoriteBooks);
  if (!favoriteBooks || favoriteBooks.length === 0) {
    favoritesAside.style.display = "none";
  }

  const inputSearch = document.getElementById("search-input");
  // console.log("DEBUG: ", inputSearch);

  const searchButton = document.getElementById("searchBtn");
  searchButton.addEventListener("click", async () => {
    const query = inputSearch.value;
    if (query) {
      // TODO: add loading / error /
      // LOADING:
      booksGrid.innerHTML = "";
      showBooksGridLoader();
      // console.log("DEBUG: Searching data: ", query);
      //
      const searchResult = await searchBook(query);
      // console.log("DEBUG: ", searchResult);
      if (searchResult) {
        booksGrid.innerHTML = "";
        searchResult.forEach((bookObject) => {
          const bookTitle = bookObject["title"];
          // console.log("DEBUG: render book:", bookTitle);
          const authorName = bookObject["author_name"];
          const yearPublished = bookObject["first_publish_year"];
          const coverId = bookObject["cover_i"] ?? null;
          let coverImage = null;
          if (coverId) {
            coverImage = fetchCover(coverId);
          }
          const bookElement = new Book(bookTitle, authorName, yearPublished, coverImage);
          console.log("DEBUG: ", bookElement);

          booksGrid.innerHTML += bookElement.createCard();
        });
      } else {
        alert("nothing was found :(");
        // showError()
      }
    } else {
      alert("DEBUG: Search input must be not empty!");
    }
  });

  // console.log("Favorite Books:", favoriteBooks);
  // // console.log(await searchBook("Harry Potter"));
  // const booksContainer = document.getElementById("books-grid");

  // for (let i = 0; i < 10; i++) {
  //   const book = new Book("Harry Potter", "J.K. Rowling", 1997, "");
  //   booksContainer.innerHTML += book.createCard();
  // }
});
