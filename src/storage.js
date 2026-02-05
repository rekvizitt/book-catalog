const favouriteBooks = JSON.parse(localStorage.getItem("favouriteBooks")) || [];

function addFavouriteBook(bookId) {
  if (!favouriteBooks.includes(bookId)) {
    favouriteBooks.push(bookId);
    localStorage.setItem("favouriteBooks", JSON.stringify(favouriteBooks));
  }
}

function removeFavouriteBook(bookId) {
  const index = favouriteBooks.indexOf(bookId);
  if (index !== -1) {
    favouriteBooks.splice(index, 1);
    localStorage.setItem("favouriteBooks", JSON.stringify(favouriteBooks));
  }
}
