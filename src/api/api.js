import { showToast } from "../toast.js";

export async function searchBook(query) {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://openlibrary.org/search.json?q=${encodedQuery}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      showToast(`HTTP ${response.status}`);
    }
    const data = await response.json();
    const result = data.docs ?? [];
    result.splice(10);
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    showToast(error);
    return [];
  }
}

export function fetchCover(coverId) {
  return `https://covers.openlibrary.org/b/id/${coverId}.jpg`;
}
