export function encodeBookData(bookTitle, authorName, yearPublished, coverId) {
  const inputData = `${bookTitle};${authorName};${yearPublished};${coverId}`;
  try {
    return btoa(inputData);
  } catch (error) {
    return;
  }
}

export function decodeBookData(encodedString) {
  try {
    const decodedString = atob(encodedString);
    const splittedString = decodedString.split(";");
    // console.log("DEBUG: splitted decoded string: ", splittedString);
    const bookTitle = splittedString[0];
    const authorName = splittedString[1];
    const yearPublished = splittedString[2];
    const coverId = splittedString[3];
    return [bookTitle, authorName, yearPublished, coverId];
  } catch (error) {
    return;
  }
}
