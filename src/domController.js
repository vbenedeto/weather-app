
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

export function renderWeather(weatherObj) {
  const weatherContainer = document.getElementById("weather-container");

  document.getElementById("city-name").textContent = weatherObj.location;
  document.getElementById("timezone").textContent = weatherObj.timezone;
  document.getElementById("temp").textContent = `${weatherObj.tempC} °C`;
  document.getElementById("feels-like").textContent = `Feels Like: ${weatherObj.feelsLikeC} °C`;
  document.getElementById("weather-description").textContent = weatherObj.description;

  weatherContainer.classList.remove("hidden");
}