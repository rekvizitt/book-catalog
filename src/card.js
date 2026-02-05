class Card {
  constructor(title, author_name, first_publish_year, cover_i) {
    this.title = title;
    this.author_name = author_name;
    this.first_publish_year = first_publish_year;
    this.cover_i = cover_i || "placeholder";
    this.element = this.createCardElement();
  }
  createCardElement() {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const titleElement = document.createElement("h2");
    titleElement.textContent = this.title;
    cardElement.appendChild(titleElement);

    const authorElement = document.createElement("p");
    authorElement.textContent = this.author_name;
    cardElement.appendChild(authorElement);

    const yearElement = document.createElement("p");
    yearElement.textContent = this.first_publish_year;
    cardElement.appendChild(yearElement);

    const coverElement = document.createElement("img");
    // cache images
    coverElement.src = `https://covers.openlibrary.org/b/id/${this.cover_i}.jpg`;
    cardElement.appendChild(coverElement);

    return cardElement;
  }
}

export { Card };
