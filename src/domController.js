import sunIcon from './assets/icons/sun.png';
import moonIcon from './assets/icons/moon.png';
import cloudIcon from './assets/icons/cloudy.png';
import cloudyDayIcon from './assets/icons/cloudy-day.png';
import cloudNigthIcon from './assets/icons/cloudy-night.png';
import rainIcon from './assets/icons/rain.png';
import thunderIcon from './assets/icons/thunderstorm.png';
import snowIcon from './assets/icons/snow.png';
import snowNightIcon from './assets/icons/snow-night.png';
import windIcon from './assets/icons/wind.png';
import fogIcon from './assets/icons/fog.png';
import defaultIcon from './assets/icons/default.png';

let currentWeatherData = null;
let isCelsius = true;

const ICON_MAP = {
  "clear-day": sunIcon,
  "clear-night": moonIcon,

  "cloudy": cloudIcon,
  "partly-cloudy-day": cloudyDayIcon,
  "partly-cloudy-night": cloudNigthIcon,

  "rain": rainIcon,
  "showers-day": rainIcon, 
  "showers-night": rainIcon,
  "thunder-rain": thunderIcon,

  "snow": snowIcon,
  "snow-showers-day": snowIcon,
  "snow-showers-night": snowNightIcon,

  "wind": windIcon,
  "fog": fogIcon,

  "default": defaultIcon,
};

const BG_MAP = {
  "clear-night": "night-bg",
  "partly-cloudy-night": "night-bg",
  "cloudy-night": "night-bg",

  "rain": "rain-bg",
  "showers-day": "rain-bg",
  "showers-night": "rain-bg",
  "thunder-rain": "thunder-bg",
  "thunder-showers-day": "thunder-bg",
  "thunder-showers-night": "thunder-bg",

  "clear-day": "day-bg",
  "partly-cloudy-day": "day-bg",
  "cloudy": "day-bg",
  "snow": "snow-bg",
};

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


    const maxTemp = isCelsius ? `↑ ${day.tempMaxC} °C` : `↑ ${day.tempMaxF} °F`;
    const minTemp = isCelsius ? `↓ ${day.tempMinC} °C` : `↓ ${day.tempMinF} °F`;

    const forecastDay = document.createElement("p");
    forecastDay.textContent = formatForecastDate(day.date);
    forecastDay.classList.add("forecast-day");

    const iconName = day.icon;
    const iconFile = ICON_MAP[iconName] || ICON_MAP["default"];
    const forecastIconImg = document.createElement("img");
    forecastIconImg.src = iconFile;
    forecastIconImg.alt = day.condition;
    forecastIconImg.classList.add("forecast-icon");

    const dayTempMax = document.createElement("span");
    dayTempMax.textContent = maxTemp;
    dayTempMax.classList.add("forecast-temp-max");

    const dayTempMin = document.createElement("span");
    dayTempMin.textContent = minTemp;
    dayTempMin.classList.add("forecast-temp-min");

    forecastTempContainer.append(dayTempMax, dayTempMin);
    card.append(forecastDay, forecastIconImg, forecastTempContainer);
    forecastContainer.appendChild(card);
  });

}

function updateBgImg(iconId) {
  const mainElement = document.getElementById("main");
  const newBgClass = BG_MAP[iconId] || "day-bg";

  if (mainElement.classList.contains(newBgClass)) return;

  mainElement.classList.remove("day-bg", "night-bg", "rain-bg", "thunder-bg", "snow-bg");

  mainElement.classList.add(newBgClass);
}

function formatForecastDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const dayIndex = date.getUTCDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return dayNames[dayIndex];
}

export function renderApp(fullData) {
  currentWeatherData = fullData;

  updateBgImg(fullData.current.icon);
  
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

export function toggleLoading(isLoading) {
  const loadingContainer = document.getElementById("loading-container");
  const weatherContainer = document.getElementById("weather-container");
  const forecastContainer = document.getElementById("forecast-container");

  if (isLoading) {
    loadingContainer.classList.remove("hidden");
    weatherContainer.classList.add("hidden");
    forecastContainer.classList.add("hidden");
  } else {
    loadingContainer.classList.add("hidden");
    forecastContainer.classList.remove("hidden");
  }
}