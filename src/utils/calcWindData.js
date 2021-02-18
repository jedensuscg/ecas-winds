calcPrevailingWinds = (rawTafData) => {
  let windMap = new Map();
  let windDirections = [];
  let windSpeeds = [];
  let windTimes = [];
  // Put each element into individual arrays
  rawTafData.tafForecasts.forEach((forecast) => {
    windDirections.push(forecast.windDirection);
    windSpeeds.push(forecast.windSpeed);
    windTimes.push(forecast.durationOfForecast);
  });

  //Map elements with wind direction as key, adding up the time duration of each unique wind direction.

  for (let index = 0; index < windSpeeds.length; index++) {
    if (windMap.has(windDirections[index])) {
      const newTime = windMap.get(windDirections[index])[1] + windTimes[index];
      windMap.set(windDirections[index], [windSpeeds, newTime]);
    } else {
      windMap.set(windDirections[index], [windSpeeds, windTimes[index]]);
    }
  }

  const prevailingWindDirectionMap = [...windMap.entries()].reduce((a, b) => (b[1][1] > a[1][1] ? b : a));
  const prevailingWindMaxSpeedMap = Math.max(...prevailingWindDirectionMap[1][0]);
  const prevailingWindDirection = prevailingWindDirectionMap[0];
  const prevailingWindTime = prevailingWindDirectionMap[1][1];
  return {
    direction: prevailingWindDirection,
    speed: prevailingWindMaxSpeedMap,
    time: prevailingWindTime,
  };
};

calcHighestWinds = (rawTafData) => {
  let windSpeedMap = new Map();

  //Create map with only the FIRST instance of each wind speed element.
  rawTafData.tafForecasts.forEach((forecast) => {
    if (!windSpeedMap.has(Object.values(forecast)[3])) {
      windSpeedMap.set(Object.values(forecast)[3], [Object.values(forecast)[2], Object.values(forecast)[0]]);
    }
  });

  //Get the highest wind speed, and create a map with direction at time.
  const highestWindSet = [...windSpeedMap.entries()].reduce((total, next) => (next[0] > total[0] ? next : total));

  return {
    speed: highestWindSet[0],
    direction: highestWindSet[1][0],
    time: highestWindSet[1][1],
  };
};

getCalcTafData = (rawTafData) => {
  prevailingWinds = calcPrevailingWinds(rawTafData);
  highestWinds = calcHighestWinds(rawTafData);

  return {
    prevailingWinds,
    highestWinds,
  };
};

module.exports = {
  getCalcTafData,
};
