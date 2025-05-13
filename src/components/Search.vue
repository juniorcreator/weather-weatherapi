<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useWeatherStore } from '@/stores/weather.js';
import Button from '@/components/UI/Button.vue';
import LanguageSelector from '@/components/LanguageSelector.vue';
import { useI18n } from 'vue-i18n';

const { state, fetchCityByName } = useWeatherStore();
const { locale } = useI18n();
const router = useRouter();

const query = ref('');
const activeCity = ref(null);
const suggestions = ref([]);
const searchHistory = ref(JSON.parse(localStorage.getItem('weatherSearchHistory')) || []);

const addToSearchHistory = (cityName) => {
  if (!searchHistory.value.includes(cityName)) {
    searchHistory.value.unshift(cityName);
    if (searchHistory.value.length > 10) searchHistory.value.pop(); // лимит
    localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory.value));
  }
};
const clearSearchHistory = () => {
  searchHistory.value = [];
  localStorage.removeItem('weatherSearchHistory');

  console.log(searchHistory, ' searchHistory');
};

const onInput = async () => {
  if (query.value.length < 2) return;
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query.value}&limit=6&appid=${import.meta.env.VITE_OPENWEATHERMAP_KEY}&lang=${locale.value}`,
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
  activeCity.value = cityName;
  query.value = cityName;
  suggestions.value = [];
  await router.push('/');
  await fetchCityByName(cityName, locale.value);
  addToSearchHistory(cityName);
};

watch(
  () => searchHistory,
  () => {
    console.log('searchHistory in watch');
  },
);

console.log(searchHistory, ' searchHistory in search');
</script>

<template>
  <div class="text-center w-[70%] max-md:w-full flex justify-center flex-wrap">
    <div class="max-w-[500px] w-full">
      <div class="max-md:flex max-md:flex-wrap max-md:items-center max-md:justify-center relative">
        <input
          v-model="query"
          @input="onInput"
          @keydown.enter="selectCity(query)"
          type="text"
          class="text-stone-50 w-[100%] max-w-[400px] border-2 border-stone-50 py-[5px] px-[10px] rounded-[10px] shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          :placeholder="$t('placeholder')"
        />
        <Button :text="$t('search')" class="ml-2 max-sm:mt-0" @click="selectCity(query)" />
        <LanguageSelector />
        <ul
          v-if="suggestions.length"
          class="absolute z-10 w-full bg-[#bbd4fd]/90 border border-gray-200 rounded-lg shadow mt-1 max-h-60 overflow-auto"
        >
          <li
            v-for="(city, index) in suggestions"
            :key="index"
            @click="selectCity(city.name)"
            class="px-4 py-2 cursor-pointer hover:bg-blue-50"
          >
            {{ city.name }}, {{ city.country }}
          </li>
        </ul>
        <div v-if="searchHistory.length" class="mt-4 max-sm:w-full">
          <h3 class="text-sm text-stone-50 mb-1">
            {{ $t('SearchHistory') }}
            <button
              @click="clearSearchHistory"
              class="ml-3 text-xs text-red-400 hover:text-red-600 cursor-pointer"
            >
              {{ $t('clear') }}
            </button>
          </h3>
          <ul v-if="searchHistory" class="flex flex-wrap gap-2">
            <li
              v-for="(city, index) in searchHistory"
              :key="index"
              @click="selectCity(city)"
              :class="[
                'cursor-pointer text-xs px-2 py-1 rounded-full transition',
                city === activeCity
                  ? 'bg-[cornflowerblue] text-white pointer-events-none'
                  : 'bg-gray-100 hover:bg-gray-200 text-black',
              ]"
            >
              {{ city }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="state.error" class="text-red-500 bg-stone-50 py-1 w-full">{{ state.error }}</div>
  </div>
</template>
