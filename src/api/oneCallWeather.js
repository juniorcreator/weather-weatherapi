export const oneCallWeather = async (lat, lon, api_key) => {
  try {
    // const response = await fetch(
    //   `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`,
    // );
    // const data = await response.json();
    // console.log(data, ' oneCallWeather');
    // return data;
    const response =
      await fetch(`http://api.weatherapi.com/v1/forecast.json?key=de938ea35a2f432e9e0182346250605&q=cherkasy&days=1&aqi=no&alerts=no
`);
    const data = await response.json();
    console.log(data, ' oneCallWeather');
    return data;
  } catch (e) {
    e.logger.error(e);
  }
};
