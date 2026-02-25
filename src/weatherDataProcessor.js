
export function createWeatherModel(rawData) {
  const fahrenheitTemp = rawData.currentConditions.temp;
  const fahrenheitFeelslikeTemp = rawData.currentConditions.feelslike;

  return {
    location: rawData.resolvedAddress,
    timezone: rawData.timezone,
    feelsLikeF: Math.round(fahrenheitFeelslikeTemp),
    feelsLikeC: fahrenheitToCelsius(fahrenheitFeelslikeTemp),
    tempF: Math.round(fahrenheitTemp),
    tempC: fahrenheitToCelsius(fahrenheitTemp),
    description: rawData.description,
    alerts: rawData.alerts ? rawData.alerts.map(item => item.event) : []
  }
}

function fahrenheitToCelsius(f) {
  if (f === undefined || f === null) return null;

  const celsius = (f - 32) * 5 / 9;
  return Math.round(celsius) + 0;
}
