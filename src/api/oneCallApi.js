export const oneCallApi = async (lat, lon, apiKey, lang = 'en', exclude = 'minutely') => {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}&units=metric&lang=${lang}`;
  console.log('oneCallApi call');
  console.log(lat, ' lat');
  console.log(lon, ' lon');
  console.log(apiKey, ' apiKey');
  console.log(lang, ' lang');
  console.log(exclude, ' exclude');

  try {
    const response = await fetch(url);
    console.log(response, ' response');
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка при получении погоды:', error);
    return null;
  }
  // return oneCallData;
};
