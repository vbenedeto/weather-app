import { mockWeatherData } from "./mockData.js";

const USE_MOCK_DATA = true;

export async function getData(location) {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("--- Using Mock Data ---:", mockWeatherData);
    return mockWeatherData;
  }

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=R7PB32LAMPGJWY2J6BPK68JQN`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}


