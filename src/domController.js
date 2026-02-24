
export function setUpEventListeners(onSearch) {
  const form = document.getElementById("form");
  const searchInput = document.getElementById("search");

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = searchInput.value.trim();

    if (location) {
      onSearch(location);
      searchInput.blur();
    }
  })
}