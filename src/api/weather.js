const OPENWEATHERMAP_KEY = import.meta.env.VITE_OPENWEATHERMAP_KEY;

export const oneCallApi = async (lat, lon, lang = 'en', exclude = 'minutely') => {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${OPENWEATHERMAP_KEY}&units=metric&lang=${lang}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Ошибка при получении погоды:', error);
    return null;
  }
};

export const getGeolocation = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('Geolocation not supported.'));
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ lat: coords.latitude, lon: coords.longitude }),
      () => reject(new Error('Unable to retrieve location.')),
    );
  });

export const getCityNameLatLon = async (lat, lon, lang = 'en') => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_KEY}&units=metric&lang=${lang}`,
  );
  return await res.json();
};

export const getCityGeoByName = async (city) => {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHERMAP_KEY}`,
  );
  return await res.json();
};
