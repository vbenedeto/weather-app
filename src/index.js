import './styles.css';
import { getData } from './api.js';
import { createWeatherModel } from './weatherDataProcessor.js';

async function getWeatherDataObj() {
  try {
    const rawData = await getData();
    const cleanData = createWeatherModel(rawData);

    console.log(cleanData);
  } catch (error) {
    console.error(error);
  }
}

getWeatherDataObj();