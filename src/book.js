import { favoriteBooks } from "./storage.js";

export class Book {
  constructor(title, author, year_published, cover_image_url) {
    this.title = title;
    this.author = author;
    this.year_published = year_published;
    this.cover_image_url = cover_image_url || this.usePlaceholderImage();
    this.favorite = false;
  }
  toggleFavorite() {
    this.favorite = !this.favorite;
    favoriteBooks.set(this.id, this.favorite);
    favoriteBooks.save();
  }
  createCard() {
    // Translate to document create elements (I need to addEventListeners)
    return `
    <div class="book-card">
      <div class="book-card-cover">
        <img src="${this.cover_image_url}" alt="Book Cover" />
        <div class="book-card-favorite" tabindex="0">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            class="favorites-book-img"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82671 2 9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 5.00004 2C4.02758 2 3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 1.33337 4.69421 1.33337 5.66667C1.33337 7.2 2.33337 8.36667 3.33337 9.33333L8.00004 14L12.6667 9.33333Z"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div class="book-card-info">
        <p class="book-card-title">${this.title}</p>
        <p class="book-card-author">${this.author}</p>
        <p class="book-card-year">${this.year_published}</p>
      </div>
    </div>
    `;
  }
  usePlaceholderImage() {
    return "./assets/images/book-cover.svg";
  }
}
