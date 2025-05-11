import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getGeolocation } from '@/utils/getGeolocation.js';
import { getWeekTextDay } from '@/utils/weekdayFromDate.js';
import { weatherapi } from '@/api/weatherApi.js';
import { getCityNameLatLon } from '@/api/geCityNameLatLon.js';
import { formatForecast } from '@/utils/formatForecast.js';

const WEATHERAPI_KEY = import.meta.env.VITE_WEATHERAPI_KEY;
const OPENWEATHERMAP_KEY = import.meta.env.VITE_OPENWEATHERMAP_KEY;

export const useWeatherStore = defineStore('weather', () => {
  const state = ref({
    lat: null,
    lon: null,
    cityData: null,
    forecast: null,
    forecastDaily: null,
    dayOfWeek: [],
    error: null,
    loading: true,
  });

  const resetDate = () => {
    state.value.cityData = null;
    state.value.forecast = null;
    state.value.forecastDaily = null;
    state.value.dayOfWeek = [];
  };

  const setLoading = (bool) => {
    state.value.loading = bool;
  };

  const resetError = () => {
    state.value.error = null;
  };

  const fetchWeatherData = async (cityName, lang) => {
    resetError();

    const cacheKey = `weather-${cityName.toLowerCase()}`;
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      try {
        const weatherData = JSON.parse(cachedData);
        console.log('📦 Loaded weather from cache:', weatherData);

        state.value.forecast = weatherData;
        state.value.dayOfWeek = getWeekTextDay(weatherData.forecast.forecastday);
        state.value.forecastDaily = formatForecast(
          weatherData.forecast.forecastday,
          weatherData.location.localtime,
        );

        return weatherData;
      } catch (err) {
        console.warn('❌ Failed to parse cached weather, fallback to API');
      }
    }

    const weatherRes = await weatherapi(cityName, WEATHERAPI_KEY, lang);
    if (!weatherRes.ok) {
      throw new Error('bad api, just reload or change city name. :(');
    }

    const weatherData = await weatherRes.json();

    state.value.forecast = weatherData;
    state.value.dayOfWeek = getWeekTextDay(weatherData.forecast.forecastday);
    state.value.forecastDaily = formatForecast(
      weatherData.forecast.forecastday,
      weatherData.location.localtime,
    );

    // cash
    sessionStorage.setItem(cacheKey, JSON.stringify(weatherData));

    return weatherData;
  };

  const fetchCityFromGeo = async (lang = 'en') => {
    resetDate();
    resetError();
    setLoading(true);

    try {
      const { lat, lon } = await getGeolocation();
      state.value.lat = lat;
      state.value.lon = lon;

      const cityData = await getCityNameLatLon(lat, lon, OPENWEATHERMAP_KEY, lang);
      state.value.cityData = cityData;

      await fetchWeatherData(cityData.city.name, lang);
    } catch (err) {
      setLoading(false);
      state.value.error = err.message;
      console.error('Error when try get geolocation', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchCityByName = async (cityName, lang = 'en') => {
    resetDate();
    resetError();
    setLoading(true);

    try {
      const weatherData = await fetchWeatherData(cityName, lang);

      const { lat, lon } = weatherData.location;
      state.value.cityData = await getCityNameLatLon(lat, lon, OPENWEATHERMAP_KEY, lang);
      state.value.lat = lat;
      state.value.lon = lon;
    } catch (err) {
      setLoading(false);
      state.value.error = err.message;
      console.error('Wrong city name...', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    state,
    fetchCityFromGeo,
    fetchCityByName,
  };
});
