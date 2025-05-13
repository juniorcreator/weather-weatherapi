import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { getWeekTextDayDt } from '@/utils/weekdayFromDate.js';
import { getCityGeoByName, getCityNameLatLon, getGeolocation, oneCallApi } from '@/api/weather.js';

export const useWeatherStore = defineStore('weather', () => {
  const state = reactive({
    lat: null,
    lon: null,
    cityData: null,
    dayOfWeek: [],
    error: null,
    loading: false,
    oneCallData: null,
    geoByCityName: null,
  });

  const resetDate = () => {
    state.oneCallData = null;
    state.cityData = null;
    state.dayOfWeek = [];
  };

  const resetError = () => (state.error = null);

  const fetchWeatherData = async (cityName, lang) => {
    resetError();
    const cacheKey = `weather-${cityName.toLowerCase()}`;
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        state.oneCallData = parsed;
        state.dayOfWeek = getWeekTextDayDt(parsed.daily);
        console.log('📦 Loaded weather from cache');
        return parsed;
      } catch (e) {
        console.warn('❌ Failed to parse cached weather, fallback to API');
      }
    }

    const res = await oneCallApi(state.lat, state.lon, lang);
    if (res) {
      state.oneCallData = res;
      state.dayOfWeek = getWeekTextDayDt(res.daily);
      sessionStorage.setItem(cacheKey, JSON.stringify(res));
    }
    return res;
  };

  const fetchCityFromGeo = async (lang = 'en') => {
    resetDate();
    resetError();
    state.loading = true;

    try {
      const { lat, lon } = await getGeolocation();
      state.lat = lat;
      state.lon = lon;

      const cityData = await getCityNameLatLon(lat, lon, lang);
      state.cityData = cityData;

      await fetchWeatherData(cityData.city.name, lang);
    } catch (err) {
      state.error = err.message;
      throw err;
    } finally {
      state.loading = false;
    }
  };

  const fetchCityByName = async (cityName, lang = 'en') => {
    resetDate();
    resetError();
    state.loading = true;

    try {
      const geo = await getCityGeoByName(cityName);
      const { lat, lon } = geo[0] || {};

      if (!lat || !lon) throw new Error('City not found');

      state.lat = lat;
      state.lon = lon;
      state.geoByCityName = geo;

      state.cityData = await getCityNameLatLon(lat, lon, lang);

      await fetchWeatherData(cityName, lang);
    } catch (err) {
      state.error = err.message;
      throw err;
    } finally {
      state.loading = false;
    }
  };

  return {
    state,
    fetchCityFromGeo,
    fetchCityByName,
  };
});
