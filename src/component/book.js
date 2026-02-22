import { favoriteBooks } from "../storage.js";

export class Book {
  constructor(title, author, yearPublished, coverImageUrl) {
    this.title = title;
    this.author = author;
    this.yearPublished = yearPublished;
    this.coverImageUrl = coverImageUrl || this.usePlaceholderImage();
    this.favorite = false;
  }
  // get isFavorite() {
  //   return this.favorite;
  // }

  // event on favorite button
  toggleFavorite() {
    this.favorite = !this.favorite;
    favoriteBooks.set(this.id, this.favorite);
    favoriteBooks.save();
  }
  createCard() {
    // remake to be possible to use event listeners
    return `
    <div class="book-card">
      <div class="book-card-cover">
        <img src="${this.coverImageUrl}" alt="Book Cover" loading="lazy" />
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
        <p class="book-card-year">${this.yearPublished}</p>
      </div>
    </div>
    `;
  }
  usePlaceholderImage() {
    return "./assets/images/book-cover.svg";
  }
}

// createFavoriteCard(onRemove) {
//   const card = document.createElement("div");
//   card.classList.add("favorite-card");
//   card.dataset.bookId = this.id;

//   const img = document.createElement("img");
//   img.src = this.coverUrl || PLACEHOLDER_IMAGE;
//   img.alt = this.title;
//   img.classList.add("favorite-card-img");
//   img.onerror = () => {
//     img.src = PLACEHOLDER_IMAGE;
//   };

//   const info = document.createElement("div");
//   info.classList.add("favorite-card-info");
//   info.innerHTML = `
//     <p class="favorite-card-title" title="${this._escapeHtml(this.title)}">${this._escapeHtml(this.title)}</p>
//     <p class="favorite-card-author">${this._escapeHtml(this.author)}</p>
//     <p class="favorite-card-year">${this.year}</p>
//   `;

//   const removeBtn = document.createElement("button");
//   removeBtn.classList.add("favorite-card-remove-btn");
//   removeBtn.setAttribute("aria-label", "Удалить из избранного");
//   removeBtn.setAttribute("title", "Удалить из избранного");
//   removeBtn.innerHTML = `
//     <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//       <line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round"/>
//       <line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round"/>
//     </svg>
//   `;

//   removeBtn.addEventListener("click", () => {
//     removeFavoriteBook(this.id);
//     card.remove();

//     // Синхронизируем кнопку в гриде поиска, если карточка там есть
//     const gridCard = document.querySelector(
//       `.book-card[data-book-id="${this.id}"] .book-card-favorite-btn`
//     );
//     if (gridCard) {
//       gridCard.classList.remove("active");
//     }

//     if (typeof onRemove === "function") {
//       onRemove();
//     }
//   });

//   card.appendChild(img);
//   card.appendChild(info);
//   card.appendChild(removeBtn);

//   return card;
// }
