export const humanReadableWeather = async (lat, lon, key) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall/overview?lat=${lat}&lon=${lon}&appid=${key}&units=metric`,
  );
  return await response.json();
};
