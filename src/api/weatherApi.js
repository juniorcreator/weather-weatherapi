export const weatherapi = async (city, key) => {
  try {
    return await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=10&aqi=no&alerts=no
`);
  } catch (e) {
    e.logger.error(e);
  }
};
