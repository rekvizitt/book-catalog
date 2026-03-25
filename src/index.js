import { favoriteBooks } from "./storage.js";
import { searchBook, fetchCover } from "./api/api.js";
import { Book } from "./component/book.js";
import { encodeBookData, decodeBookData } from "./utils.js";
import { showToast } from "./toast.js";

// DOMContentLoaded = html parsed
// load = entire page loaded
window.addEventListener("DOMContentLoaded", async () => {
  function init() {
    const booksGrid = document.getElementById("books-grid");
    renderFavorites();
    const inputSearch = document.getElementById("search-input");
    inputSearch.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        await sendQuery(inputSearch, booksGrid);
      }
    });
    // console.log("DEBUG: ", inputSearch);

    const searchButton = document.getElementById("searchBtn");
    searchButton.addEventListener("click", async () => {
      await sendQuery(inputSearch, booksGrid);
    });
  }
  init();

  async function sendQuery(inputSearch, booksGrid) {
    const query = inputSearch.value;
    if (query) {
      booksGrid.innerHTML = "";
      const gridLoader = document.createElement("div");
      gridLoader.classList.add("grid-loader");
      booksGrid.append(gridLoader);
      const searchResult = await searchBook(query);
      // console.log("DEBUG: ", searchResult);
      gridLoader.remove();
      if (searchResult.length !== 0) {
        searchResult.forEach((bookObject) => {
          const bookTitle = bookObject["title"];
          // console.log("DEBUG: render book:", bookTitle);
          const authorName = bookObject["author_name"];
          const yearPublished = bookObject["first_publish_year"];
          if (!bookTitle || !authorName || !yearPublished) {
            return;
          }
          const coverId = bookObject["cover_i"] ?? null;

          const bookId = encodeBookData(bookTitle, authorName, yearPublished, coverId);

          // console.log("DEBUG: book id - ", bookId);
          let coverImage = null;
          if (coverId) {
            coverImage = fetchCover(coverId);
          }
          const bookElement = new Book(bookId, bookTitle, authorName, yearPublished, coverImage);

          const bookCard = bookElement.createCard();
          booksGrid.appendChild(bookCard);
        });
      } else {
        showToast("nothing was found 😔");
      }
    } else {
      showToast("Search input must be not empty!");
    }
  }
});

export function renderFavorites() {
  const favoritesAside = document.getElementById("favorites-aside");
  if (!favoriteBooks || favoriteBooks.length === 0) {
    favoritesAside.classList.add("hidden");
  } else {
    favoritesAside.classList.remove("hidden");
    const favoriteBooksContainer = document.getElementById("favorite-books-container");
    favoriteBooksContainer.innerHTML = "";
    favoriteBooks.forEach((bookId) => {
      const data = decodeBookData(bookId);
      const bookTitle = data[0];
      const authorName = data[1];
      const yearPublished = data[2];
      const coverId = parseInt(data[3]) ?? null;
      let coverImage = null;
      if (coverId) {
        coverImage = fetchCover(coverId);
      }
      const bookElement = new Book(bookId, bookTitle, authorName, yearPublished, coverImage);
      const bookFavoriteCard = bookElement.createFavoriteCard();

      favoriteBooksContainer.appendChild(bookFavoriteCard);
    });
    const favoriteSubtitleElement = favoritesAside.getElementsByClassName("favorites-subtitle")[0];
    favoriteSubtitleElement.textContent = favoriteBooks.length + " books saved";
  }
}
