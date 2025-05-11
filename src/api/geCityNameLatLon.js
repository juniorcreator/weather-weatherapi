export const getCityNameLatLon = async (lat, lng, api, lang = 'en') => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${api}&units=metric&lang=${lang}`,
  );
  return await response.json();
};
