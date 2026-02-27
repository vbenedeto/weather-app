import './styles.css';
import { getData } from './api.js';
import { createWeatherModel } from './weatherDataProcessor.js';
import { renderApp, setUpSearchEventListener, setUpUnitToggle } from './domController.js';

// Retrieves raw Weather Data and transforms it into a clean Obj 
async function handleWeatherSearch(locationInput) {
  try {
    const rawWeatherData = await getData(locationInput);

    if (!rawWeatherData) {
      console.error("No data received from API");
      return;
    }

    const weatherObj = createWeatherModel(rawWeatherData);
    renderApp(weatherObj);
    console.log("Success! Clean data obj:", weatherObj);

  } catch (error) {
    console.error(error);
  }
}

// Listens to the Search input
setUpSearchEventListener(handleWeatherSearch);

// Asks user its Geolocation and handles the default Weather Data
function initApp() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const query = `${pos.coords.latitude},${pos.coords.longitude}`;
        handleWeatherSearch(query);
      },
      () => {
        handleWeatherSearch("São Paulo");
      }
    );
  } else {
    handleWeatherSearch("São Paulo");
  }
}

initApp();
setUpUnitToggle();
