export const getCityNameLatLon = async (lat, lng, api) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${api}&units=metric`,
  );
  console.log(response, ' getCityNameLatLon');
  return await response.json();
};
