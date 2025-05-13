<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useWeatherStore } from '@/stores/weather.js';

const { state, fetchCityByName } = useWeatherStore();
const router = useRouter();
const { locale } = useI18n();
const selectedLang = ref(locale.value);

const changeLang = async () => {
  locale.value = selectedLang.value;
  localStorage.setItem('locale', selectedLang.value);
  await router.push('/');
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && key.startsWith('weather-')) {
      sessionStorage.removeItem(key);
      i--;
    }
  }
  await fetchCityByName(state.cityData.city.name, locale.value);
};
</script>

<template>
  <teleport to="body">
    <div
      class="bg-[dimgray] rounded-[3px] py-[1px] px-[3px] absolute right-[30px] top-[40px] z-10 max-sm:top-[30px]"
    >
      <label for="lang"><span>⚙️</span></label>
      <select id="lang" class="text-white" v-model="selectedLang" @change="changeLang">
        <option value="en">En</option>
        <option value="ru">{{ $t('ru') }}</option>
      </select>
    </div>
  </teleport>
</template>
