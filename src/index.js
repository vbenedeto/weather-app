import './styles.css';
import { getData } from './api.js';
import { createWeatherModel } from './weatherDataProcessor.js';
import { renderWeather, setUpEventListeners } from './domController.js';

// Retrieves raw Weather Data and transforms it into a clean Obj 
async function handleWeatherSearch(locationInput) {
  try {
    const rawData = await getData(locationInput);

    if (!rawData) {
      console.error("No data received from API");
      return;
    }

    const cleanDataObj = createWeatherModel(rawData);
    renderWeather(cleanDataObj);
    console.log("Success! Clean data obj:", cleanDataObj);

  } catch (error) {
    console.error(error);
  }
}

// Listens to the Search input
setUpEventListeners(handleWeatherSearch);

// Ask user its Geolocation and handles the default Weather Data
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

