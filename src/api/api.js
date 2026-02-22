export async function searchBook(query) {
  // Todo: add loading / error /
  const encodedQuery = encodeURIComponent(query);
  const url = `https://openlibrary.org/search.json?q=${encodedQuery}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((data) => data.docs)
    .catch((error) => console.error(error));
  return result;
}

export function fetchCover(coverId) {
  // for while without caching
  return `https://covers.openlibrary.org/b/id/${coverId}.jpg`;
}
