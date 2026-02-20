import './styles.css';
import { getData } from './api.js';
import { createWeatherModel } from './weatherDataProcessor.js';
import { setUpEventListeners } from './domController.js';

async function handleWeatherSearch(locationInput) {
  try {
    const rawData = await getData(locationInput);

    if (!rawData) {
      console.error("No data received from API");
      return;
    }

    const cleanDataObj = createWeatherModel(rawData);
    console.log("Success! Clean data obj:", cleanDataObj);
  } catch (error) {
    console.error(error);
  }
}

setUpEventListeners(handleWeatherSearch);
