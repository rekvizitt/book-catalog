import { searchBooks } from "./api.js";
import { Card } from "./card.js";

function init() {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  searchButton.addEventListener("click", async () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      const booksData = await searchBooks(searchTerm);
      console.log(booksData);
      const container = document.getElementById("books-container");
      container.innerHTML = "";
      booksData.forEach((book) => {
        console.log(book);
        const book_title = book.title || "Unknown";
        const book_author = book.author_name[0] || "Unknown";
        const book_year = book.first_publish_year || "Unknown";
        const book_cover = book.cover_i || "placeholder";
        const card = new Card(book_title, book_author, book_year, book_cover);
        container.appendChild(card.element);
      });
    }
  });
}

init();
