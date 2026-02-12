export async function searchBook(query) {
  // Todo: add loading / error /
  const encodedQuery = encodeURIComponent(query);
  const url = `https://openlibrary.org/search.json?q=${encodedQuery}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
    .then((data) => data.docs);
  return result;
}

// export async function fetchCover(url) {}
