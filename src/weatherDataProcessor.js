
function fahrenheitToCelsius(f) {
  if (f === undefined || f === null) return null;

  const celsius = (f - 32) * 5 / 9;
  return Math.round(celsius) + 0;
}

function getDisplayLocation(resolvedAddress) {
  const isCoords = /^-?\d+\.?\d*,-?\d+\.?\d*$/.test(resolvedAddress);

  if (isCoords) {
    return "Current Location";
  }

  return resolvedAddress;
}

export function createWeatherModel(rawData) {
  const fahrenheitTemp = rawData.currentConditions.temp;
  const fahrenheitFeelslikeTemp = rawData.currentConditions.feelslike;

  return {
    current: {
      location: getDisplayLocation(rawData.resolvedAddress),
      timezone: rawData.timezone,
      icon: rawData.currentConditions.icon,
      conditions: rawData.currentConditions.conditions,
      feelsLikeF: Math.round(fahrenheitFeelslikeTemp),
      feelsLikeC: fahrenheitToCelsius(fahrenheitFeelslikeTemp),
      tempF: Math.round(fahrenheitTemp),
      tempC: fahrenheitToCelsius(fahrenheitTemp),
      description: rawData.description,
      alerts: rawData.alerts ? rawData.alerts.map(item => item.event) : []
    },
    forecast: rawData.days.slice(1, 8).map(day => {
      return {
        date: day.datetime,
        tempMaxF: Math.round(day.tempmax),
        tempMaxC: fahrenheitToCelsius(day.tempmax),
        tempMinF: Math.round(day.tempmin),
        tempMinC: fahrenheitToCelsius(day.tempmin),
        icon: day.icon,
        condition: day.conditions,
      };
    })
  }
}


