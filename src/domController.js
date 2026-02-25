let currentWeatherData = null;
let isCelsius = true;


export function setUpSearchEventListener(onSearch) {
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
  currentWeatherData = weatherObj;

  const weatherContainer = document.getElementById("weather-container");
  const tempElement = document.getElementById("temp");
  const feelsLikeElement = document.getElementById("feels-like");

  if (isCelsius) {
    tempElement.textContent = `${weatherObj.tempC} °C`
    feelsLikeElement.textContent = `Feels like: ${weatherObj.feelsLikeC} °C`;
  } else {
    tempElement.textContent = `${weatherObj.tempF} °F`;
    feelsLikeElement.textContent = `Feels Like: ${weatherObj.feelsLikeF} °F`;
  }

  document.getElementById("city-name").textContent = weatherObj.location;
  document.getElementById("timezone").textContent = weatherObj.timezone;
  document.getElementById("weather-description").textContent = weatherObj.description;

  weatherContainer.classList.remove("hidden");
}

export function setUpUnitToggle() { 
  const radios = document.querySelectorAll('input[name="unit"]');

  radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      isCelsius = (e.target.value === "C");

      if (currentWeatherData) {
        renderWeather(currentWeatherData);
      }
    });
  });
}