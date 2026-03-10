import './styles.css';
import { getData } from './api.js';
import { createWeatherModel } from './weatherDataProcessor.js';
import { renderApp, setUpSearchEventListener, setUpUnitToggle, showError, toggleLoading } from './domController.js';

// Retrieves raw Weather Data and transforms it into a clean Obj 
async function handleWeatherSearch(locationInput) {
  try {
    toggleLoading(true);
    const rawWeatherData = await getData(locationInput);
    
    const weatherObj = createWeatherModel(rawWeatherData);

    renderApp(weatherObj);
  } catch (error) {
    console.error("Search Error:", error.message);

    if (error.message === "OFFLINE") {
      showError("No internet connection. Please check your network.");
    } else if (error.message === "NOT_FOUND") {
      showError(`We couldn't find "${locationInput}". Check the spelling and try again.`);
    } else if (error.message === "RATE_LIMIT") {
      showError("Daily search limit reached. Please try again tomorrow!");
    } else {
      showError("An unexpected error occurred. Please try again later.");
    }

  } finally {
    toggleLoading(false);
  }
}

// Listens to the Search input
setUpSearchEventListener(handleWeatherSearch);

// Asks user its Geolocation and handles the default Weather Data
function initApp() {
  toggleLoading(true);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const query = `${pos.coords.latitude},${pos.coords.longitude}`;
        handleWeatherSearch(query);
      },
      () => {
        handleWeatherSearch("Sao Paulo");
      }
    );
  } else {
    handleWeatherSearch("Sao Paulo");
  }
}

initApp();
setUpUnitToggle();
