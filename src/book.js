import { addFavoriteBook, removeFavoriteBook, isFavoriteBook } from "./storage.js";
import { getCoverUrl } from "./api.js";

const PLACEHOLDER_IMAGE = "assets/images/book-cover.svg";

export class Book {
  /**
   * @param {object} apiDoc - объект из Open Library API (data.docs[i])
   */
  constructor(apiDoc) {
    // Уникальный идентификатор (ключ из Open Library, например "/works/OL82563W")
    this.id = apiDoc.key || `${apiDoc.title}-${apiDoc.first_publish_year}`;
    this.title = apiDoc.title || "Без названия";
    this.author = apiDoc.author_name ? apiDoc.author_name.join(", ") : "Автор неизвестен";
    this.year = apiDoc.first_publish_year || "—";
    this.coverId = apiDoc.cover_i || null;
    this.coverUrl = this.coverId ? getCoverUrl(this.coverId) : null;
  }

  /**
   * Создаёт DOM-элемент карточки книги для грида поиска
   * @returns {HTMLElement}
   */
  createSearchCard() {
    const isFav = isFavoriteBook(this.id);

    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.bookId = this.id;

    // --- Обложка ---
    const coverWrapper = document.createElement("div");
    coverWrapper.classList.add("book-card-cover");

    const img = document.createElement("img");
    img.alt = `Обложка книги "${this.title}"`;
    img.classList.add("book-card-img");

    if (this.coverUrl) {
      img.src = this.coverUrl;
      // Если картинка не загрузится — показываем заглушку
      img.onerror = () => {
        img.src = PLACEHOLDER_IMAGE;
        img.classList.add("placeholder");
      };
    } else {
      img.src = PLACEHOLDER_IMAGE;
      img.classList.add("placeholder");
    }

    // --- Кнопка избранного ---
    const favBtn = document.createElement("button");
    favBtn.classList.add("book-card-favorite-btn");
    favBtn.setAttribute("aria-label", "Добавить в избранное");
    favBtn.setAttribute("title", "Добавить в избранное");
    if (isFav) {
      favBtn.classList.add("active");
    }

    favBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421
             14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82671 2
             9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 5.00004 2C4.02758 2
             3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 1.33337 4.69421 1.33337
             5.66667C1.33337 7.2 2.33337 8.36667 3.33337 9.33333L8.00004 14L12.6667 9.33333Z"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `;

    // Обработчик кнопки избранного
    favBtn.addEventListener("click", () => {
      this._toggleFavorite(favBtn);
    });

    coverWrapper.appendChild(img);
    coverWrapper.appendChild(favBtn);

    // --- Информация ---
    const info = document.createElement("div");
    info.classList.add("book-card-info");
    info.innerHTML = `
      <p class="book-card-title" title="${this._escapeHtml(this.title)}">${this._escapeHtml(this.title)}</p>
      <p class="book-card-author">${this._escapeHtml(this.author)}</p>
      <p class="book-card-year">${this.year}</p>
    `;

    card.appendChild(coverWrapper);
    card.appendChild(info);

    return card;
  }

  /**
   * Создаёт DOM-элемент для панели избранного (сайдбар)
   * @param {Function} onRemove - колбэк после удаления
   * @returns {HTMLElement}
   */
  createFavoriteCard(onRemove) {
    const card = document.createElement("div");
    card.classList.add("favorite-card");
    card.dataset.bookId = this.id;

    const img = document.createElement("img");
    img.src = this.coverUrl || PLACEHOLDER_IMAGE;
    img.alt = this.title;
    img.classList.add("favorite-card-img");
    img.onerror = () => {
      img.src = PLACEHOLDER_IMAGE;
    };

    const info = document.createElement("div");
    info.classList.add("favorite-card-info");
    info.innerHTML = `
      <p class="favorite-card-title" title="${this._escapeHtml(this.title)}">${this._escapeHtml(this.title)}</p>
      <p class="favorite-card-author">${this._escapeHtml(this.author)}</p>
      <p class="favorite-card-year">${this.year}</p>
    `;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("favorite-card-remove-btn");
    removeBtn.setAttribute("aria-label", "Удалить из избранного");
    removeBtn.setAttribute("title", "Удалить из избранного");
    removeBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round"/>
        <line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;

    removeBtn.addEventListener("click", () => {
      removeFavoriteBook(this.id);
      card.remove();

      // Синхронизируем кнопку в гриде поиска, если карточка там есть
      const gridCard = document.querySelector(
        `.book-card[data-book-id="${this.id}"] .book-card-favorite-btn`
      );
      if (gridCard) {
        gridCard.classList.remove("active");
      }

      if (typeof onRemove === "function") {
        onRemove();
      }
    });

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(removeBtn);

    return card;
  }

  // --- Приватные методы ---

  _toggleFavorite(btn) {
    if (isFavoriteBook(this.id)) {
      // Убираем из избранного
      removeFavoriteBook(this.id);
      btn.classList.remove("active");

      // Удаляем карточку из сайдбара
      const sideCard = document.querySelector(`.favorite-card[data-book-id="${this.id}"]`);
      if (sideCard) sideCard.remove();
    } else {
      // Добавляем в избранное — сохраняем только нужные поля
      addFavoriteBook({
        id: this.id,
        title: this.title,
        author: this.author,
        year: this.year,
        coverId: this.coverId,
        coverUrl: this.coverUrl
      });
      btn.classList.add("active");

      // Добавляем карточку в сайдбар
      const favContainer = document.querySelector(".favorite-books-container");
      if (favContainer) {
        const favCard = this.createFavoriteCard(() => updateFavoritesCount());
        favContainer.appendChild(favCard);
      }
    }

    updateFavoritesCount();
  }

  _escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
}

/**
 * Обновляет счётчик книг в шапке сайдбара
 */
export function updateFavoritesCount() {
  const countEl = document.querySelector(".favorites-subtitle");
  if (!countEl) return;
  const count = document.querySelectorAll(".favorite-card").length;
  countEl.textContent = `${count} ${pluralBooks(count)} сохранено`;
}

function pluralBooks(n) {
  if (n % 10 === 1 && n % 100 !== 11) return "книга";
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return "книги";
  return "книг";
}
