import './styles.css';
import { getData } from './api.js';
import { createWeatherModel } from './weatherDataProcessor.js';
import { renderApp, setUpSearchEventListener, setUpUnitToggle, showError, toggleLoading } from './domController.js';

// Retrieves raw Weather Data and transforms it into a clean Obj 
async function handleWeatherSearch(locationInput) {
  try {
    toggleLoading(true);

    const rawWeatherData = await getData(locationInput);

    if (!rawWeatherData) {
      showError(`We couldn't find "${locationInput}". Check the spelling and try again.`)
      return;
    }

    const weatherObj = createWeatherModel(rawWeatherData);
    renderApp(weatherObj);
    console.log("Success! Clean data obj:", weatherObj);
  } catch (error) {
    console.error(error);
    showError("Something went wrong with the network. Try again later.");
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
