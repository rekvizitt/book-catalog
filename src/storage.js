export let favoriteBooks = loadFavoriteBooks();

function saveFavoriteBooks(favoriteBooks) {
  localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
}

function loadFavoriteBooks() {
  return JSON.parse(localStorage.getItem("favoriteBooks")) || [];
}

// window.addEventListener("load", () => {
//   favoriteBooks = ;
// });

window.addEventListener("unload", () => {
  saveFavoriteBooks(favoriteBooks);
});
