<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useWeatherStore } from '@/stores/weather.js';
import Button from '@/components/UI/Button.vue';

const { state, fetchCityByName } = useWeatherStore();
const cityInput = ref('');
const router = useRouter();

const query = ref('');
const suggestions = ref([]);

const onInput = async () => {
  if (query.value.length < 2) return;
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query.value}&limit=5&appid=${import.meta.env.VITE_OPENWEATHERMAP_KEY}`,
  );
  const data = await res.json();
  suggestions.value = data.map((item) => ({
    name: item.name,
    country: item.country,
    lat: item.lat,
    lon: item.lon,
  }));
};

const selectCity = async (cityName) => {
  query.value = cityName;
  suggestions.value = [];
  await store.fetchCityByName(cityName);
  store.addToSearchHistory(cityName);
};

const handleSearch = () => {
  if (!cityInput.value) return;
  router.push('/');
  fetchCityByName(cityInput.value);
};
</script>

<template>
  <div class="text-center w-[70%] max-sm:w-full">
    <div class="max-sm:flex max-sm:items-center max-sm:justify-center">
      <input
        @keyup.enter="handleSearch"
        v-model="cityInput"
        class="search-input text-stone-50 border-2 border-stone-50 py-[5px] px-[10px] w-[100%] max-w-[400px] rounded-[10px]"
        type="text"
        placeholder="Enter city name"
      />
      <Button text="Search" class="ml-2 max-sm:mt-0" @click="handleSearch" />
    </div>
    <div v-if="state.error" class="text-red-500 bg-stone-50 py-1">{{ state.error }}</div>
  </div>
</template>
