const form = document.getElementById("form");
const searchInput = document.getElementById("search");

export function setUpEventListeners(onSearch) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = searchInput.value.trim();

    if (location) {
      onSearch(location);
    }
  })
}