import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getTimezoneTime } from '@/utils/getTimezoneTime.js';
import { getGeolocation } from '@/utils/getGeolocation.js';
import { getDailyForecasts } from '@/utils/getDailyForecast.js';
import { getWeekday } from '@/utils/weekdayFromDate.js';
import { getList } from '@/utils/getList.js';
import { oneCallWeather } from '@/api/oneCallWeather.js';
import testData from './test.json';
import { getTimeDifference } from '@/utils/getTimeDifference.js';
import { formatForecast } from '@/utils/test.js';

console.log(testData, ' test json data');

const API_KEY = 'b831c7bcbdb48dfabb634161f052769d';

export const useWhetherStore = defineStore('whether', () => {
  const state = ref({
    error: null,
    loading: false,
    data: null,
    dataDaily: [],
    dataDayPeriod: null,
    dayOfWeek: [],
    city: '',
    time: null,
    lat: null,
    lon: null,
    oneCallData: null,
    newApi: null,
    newApiDaily: null,
  });

  const setLoading = (val) => {
    state.value.loading = val;
  };

  console.log(getTimeDifference(1746529200, 1746698400), ' getTimeDifference()');

  const resetState = () => {
    state.value.error = null;
    state.value.data = null;
  };

  const getWhether = async () => {
    resetState();
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${state.value.lat}&lon=${state.value.lon}&appid=${API_KEY}&units=metric`,
      );
      const res = await response.json();
      const res2 = await oneCallWeather();

      if (res.cod === '200') {
        console.log(res, ' res 999999');
        state.value.data = res;
        state.value.time = getTimezoneTime(res.city.timezone);
        state.value.dataDaily = getDailyForecasts(res.list);
        state.value.dataDayPeriod = getList(res.list);
        state.value.oneCallData = testData;
        state.value.newApi = res2;
        state.value.dayOfWeek = getWeekday(state.value.oneCallData.daily);
        state.value.newApiDaily = formatForecast(state.value.newApi.forecast.forecastday);
      } else {
        throw new Error(res.message || 'Error fetching weather data');
      }
    } catch (e) {
      state.value.error = e?.message || String(e);
    } finally {
      setLoading(false);
    }
  };

  const getLatLon = async () => {
    resetState();
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${state.value.city}&limit=1&appid=${API_KEY}`,
      );
      const res = await response.json();

      if (res.length) {
        const { lat, lon } = res[0];
        state.value.lat = lat;
        state.value.lon = lon;
        console.log(res, ' lat lon data');
        await getWhether();
      } else {
        throw new Error('City not found. Try another name.');
      }
    } catch (e) {
      state.value.error = e?.message || String(e);
    } finally {
      setLoading(false);
    }
  };

  const setCityName = (name) => {
    state.value.city = name;
  };
  const setDayOfWeek = (data) => {
    state.value.test = data;
  };

  (async () => {
    setLoading(true);
    try {
      const { lat, lon } = await getGeolocation();
      state.value.lat = lat;
      state.value.lon = lon;
      await getWhether();
    } catch (err) {
      state.value.error = err?.message || String(err);
    } finally {
      setLoading(false);
    }
  })();

  return {
    state,
    getWhether,
    getLatLon,
    setCityName,
    setDayOfWeek,
  };
});
