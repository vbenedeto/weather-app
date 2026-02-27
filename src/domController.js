let currentWeatherData = null;
let isCelsius = true;

function renderWeather(weatherObj) {
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

function renderForecast(forecastData) {
  const forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = "";

  forecastData.forEach(day => {
    const card = document.createElement("div");
    card.classList.add("forecast-card");
    const forecastTempContainer = document.createElement("div");
    forecastTempContainer.classList.add("forecast-container__temp");


    const maxTemp = isCelsius ? day.tempMaxC : day.tempMaxF;
    const minTemp = isCelsius ? day.tempMinC : day.tempMinF;

    const forecastDay = document.createElement("p");
    forecastDay.textContent = formatForecastDate(day.date);
    forecastDay.classList.add("forecast-day");

    // const forecastIcon = document.createElement("img");

    const dayTempMax = document.createElement("span");
    dayTempMax.textContent = maxTemp;
    dayTempMax.classList.add("forecast-temp-max");

    const dayTempMin = document.createElement("span");
    dayTempMin.textContent = minTemp;
    dayTempMin.classList.add("forecast-temp-min");

    forecastTempContainer.append(dayTempMax, dayTempMin);
    card.append(forecastDay, forecastTempContainer);
    forecastContainer.appendChild(card);
  });

}

function formatForecastDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const dayIndex = date.getUTCDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return dayNames[dayIndex];;
}

export function renderApp(fullData) {
  currentWeatherData = fullData;

  renderWeather(fullData.current);
  renderForecast(fullData.forecast);
}

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

export function setUpUnitToggle() {
  const radios = document.querySelectorAll('input[name="unit"]');

  radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      isCelsius = (e.target.value === "C");

      if (currentWeatherData) {
        renderApp(currentWeatherData);
      }
    });
  });
}