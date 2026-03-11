import { mockWeatherData } from "./mockData.js";

const USE_MOCK_DATA = false;

export async function getData(location) {
  if (!navigator.onLine) {
    throw new Error("OFFLINE");
  }

  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("--- Using Mock Data ---:", mockWeatherData);
    return mockWeatherData;
  }

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=R7PB32LAMPGJWY2J6BPK68JQN`;

  try {
    const response = await fetch(url);

    if (response.status === 429) throw new Error("RATE_LIMIT");
    if (response.status === 401) throw new Error("INVALID_KEY");
    if (!response.ok) throw new Error("NOT_FOUND");

    const result = await response.json();

    if (!result.currentConditions || !result.days) throw new Error("MALFORMED_DATA");

    return result;
  } catch (error) {
    throw error;
  }
}


