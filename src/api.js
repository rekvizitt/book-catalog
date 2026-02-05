async function searchBooks(query) {
  // TODO: loading...
  if (!query) {
    throw new Error("Query cannot be empty");
  }
  const url = `https://openlibrary.org/search.json?q=${query}`;
  const response = await fetch(url);
  // TODO: nothing found / network error
  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data.docs.map((book) => ({
    title: book.title || "Unknown",
    author_name: book.author_name[0] || "Unknown",
    first_publish_year: book.first_publish_year || "Unknown",
    cover_i: book.cover_i || "placeholder",
  }));
}

async function fetchCover(coverId) {
  const url = `https://covers.openlibrary.org/b/id/${coverId}.jpg`;
  const response = await fetch(url);
  // if (!response.ok) {
  //   throw new Error(`Failed to fetch cover: ${response.status}`);
  // }
  const blob = await response.blob();
  return URL.createObjectURL(blob);
  // or return placeholder
}

export { searchBooks, fetchCover };
