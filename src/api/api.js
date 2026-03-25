export async function searchBook(query) {
  // Todo: add loading / error /
  const encodedQuery = encodeURIComponent(query);
  const url = `https://openlibrary.org/search.json?q=${encodedQuery}`;
  let result = await fetch(url)
    .then((response) => response.json())
    .then((data) => data.docs)
    .catch((error) => console.error(error));
  result.splice(10);
  return result;
}

export function fetchCover(coverId) {
  return `https://covers.openlibrary.org/b/id/${coverId}.jpg`;
}
