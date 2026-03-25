import { favoriteBooks } from "../storage.js";
import { renderFavorites } from "../index.js";
export class Book {
  constructor(id, title, author, yearPublished, coverImageUrl) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.yearPublished = yearPublished;
    this.coverImageUrl = coverImageUrl || this.usePlaceholderImage();
    this.favorite = favoriteBooks.includes(this.id);
  }

  get isFavorite() {
    return this.favorite;
  }

  // event on favorite button
  toggleFavorite() {
    this.favorite = !this.favorite;
    if (this.favorite) {
      favoriteBooks.push(this.id);
    } else {
      const bookToRemove = this.id;
      const index = favoriteBooks.indexOf(bookToRemove);
      if (index > -1) {
        favoriteBooks.splice(index, 1);
      }
    }
    renderFavorites();
  }

  createCard() {
    // function initCover() {

    // }
    // function initTitle() {

    // }
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookCardCover = document.createElement("div");
    bookCardCover.classList.add("book-card-cover");

    const bookCoverLoader = document.createElement("div");
    bookCoverLoader.classList.add("image-loader");
    bookCardCover.appendChild(bookCoverLoader);

    const bookCoverImg = document.createElement("img");
    bookCoverImg.src = this.coverImageUrl;
    bookCoverImg.alt = "Cover book " + this.title;
    bookCoverImg.classList.add("hidden");

    bookCoverImg.onload = () => {
      bookCoverLoader.remove();
      bookCoverImg.classList.remove("hidden");
    };

    const bookFavorite = document.createElement("div");
    bookFavorite.classList.add("book-card-favorite");
    bookFavorite.tabIndex = 0;
    bookFavorite.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" class="favorites-book-img" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82671 2 9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 5.00004 2C4.02758 2 3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 1.33337 4.69421 1.33337 5.66667C1.33337 7.2 2.33337 8.36667 3.33337 9.33333L8.00004 14L12.6667 9.33333Z"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>`;

    if (this.isFavorite) {
      bookFavorite.classList.add("favorited");
    }

    bookFavorite.addEventListener("click", () => {
      bookFavorite.classList.toggle("favorited");
      this.toggleFavorite();
    });

    bookCardCover.appendChild(bookCoverImg);
    bookCardCover.appendChild(bookFavorite);

    const bookCardInfo = document.createElement("div");
    bookCardInfo.classList = "book-card-info";

    const bookCardTitle = document.createElement("p");
    bookCardTitle.classList = "book-card-title";
    bookCardTitle.textContent = this.title;

    const bookCardAuthor = document.createElement("p");
    bookCardAuthor.classList = "book-card-author";
    bookCardAuthor.textContent = this.author;

    const bookCardYear = document.createElement("p");
    bookCardYear.classList = "book-card-year";
    bookCardYear.textContent = this.yearPublished;

    bookCardInfo.appendChild(bookCardTitle);
    bookCardInfo.appendChild(bookCardAuthor);
    bookCardInfo.appendChild(bookCardYear);

    bookCard.append(bookCardCover);
    bookCard.append(bookCardInfo);

    return bookCard;
  }
  usePlaceholderImage() {
    return "./assets/images/book-cover.svg";
  }
  createFavoriteCard() {
    const favoriteCard = document.createElement("div");
    favoriteCard.classList.add("favorite-card");

    const favoriteCoverImg = document.createElement("img");
    favoriteCoverImg.src = this.coverImageUrl || "./assets/images/book-cover-favorite.svg";
    favoriteCoverImg.alt = "Cover book " + this.title;
    favoriteCoverImg.classList.add("favorite-card-cover");

    const favoriteCardInfo = document.createElement("div");
    favoriteCardInfo.classList = "favorite-card-info";

    const favoriteCardTitle = document.createElement("p");
    favoriteCardTitle.classList = "favorite-card-title";
    favoriteCardTitle.textContent = this.title;

    const favoriteCardAuthor = document.createElement("p");
    favoriteCardAuthor.classList = "favorite-card-author";
    favoriteCardAuthor.textContent = this.author;

    const favoriteCardYear = document.createElement("p");
    favoriteCardYear.classList = "favorite-card-year";
    favoriteCardYear.textContent = this.yearPublished;

    favoriteCardInfo.appendChild(favoriteCardTitle);
    favoriteCardInfo.appendChild(favoriteCardAuthor);
    favoriteCardInfo.appendChild(favoriteCardYear);

    const bookFavorite = document.createElement("div");
    bookFavorite.classList.add("favorite-book-img-container");
    bookFavorite.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" class="favorite-book-img" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82671 2 9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 5.00004 2C4.02758 2 3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 1.33337 4.69421 1.33337 5.66667C1.33337 7.2 2.33337 8.36667 3.33337 9.33333L8.00004 14L12.6667 9.33333Z"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>`;

    bookFavorite.addEventListener("click", () => {
      bookFavorite.classList.toggle("favorited");
      this.toggleFavorite();
    });

    favoriteCard.appendChild(favoriteCoverImg);
    favoriteCard.appendChild(favoriteCardInfo);
    favoriteCard.appendChild(bookFavorite);

    return favoriteCard;
  }
}
