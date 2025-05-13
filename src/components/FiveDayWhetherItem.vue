<script setup>
import { formatTextDate, formatTextDateDt } from '@/utils/formatDate.js';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';
defineProps(['item', 'index', 'dayOfWeek', 'firstElement']);
import { useWeatherStore } from '@/stores/weather.js';
const { state } = useWeatherStore();

const { locale } = useI18n();
const values = {
  en: 'en-US',
  uk: 'uk-UA',
  ru: 'ru-RU',
};
const resLang = ref(values[locale.value]);

watch(locale, (newLocale) => {
  resLang.value = values[newLocale];
});
</script>

<template>
  <RouterLink
    class="inline-block mr-1 mb-3 max-md:mb-0 rounded-2xl relative max-sm:min-w-[75px]"
    :to="`${index === 0 ? '/' : `/${dayOfWeek[index]}`}`"
  >
    <div
      class="whether-item bg-white/70 hover:bg-[#bbd4fd]/80 rounded-2xl shadow p-3 text-center max-sm:p-2"
    >
      <div>
        <p class="font-bold text-sm max-sm:text-xs">
          {{ formatTextDateDt(item.dt, item.timezone_offset, 'short', 'short', resLang) }}
        </p>
        <div class="flex justify-center">
          <img
            class="w-[50px]"
            :src="`https://openweathermap.org/img/wn/${index === 0 ? state.oneCallData.current.weather[0].icon : item.weather[0].icon}.png`"
            alt="Weather icon"
          />
        </div>

        <p class="text-xs max-sm:hidden w-[90px] h-[32px]">
          {{
            index === 0
              ? state.oneCallData.current.weather[0].description
              : item.weather[0].description
          }}
        </p>
        <div class="flex justify-between">
          <div class="text-xs mt-1">
            <span class="text-gray-500 max-sm:text-xs">{{ $t('min') }}</span>
            <div class="font-bold text-sm max-sm:text-xs">{{ Math.round(item.temp.min) }}°C</div>
          </div>
          <div class="text-xs mt-1">
            <span class="text-gray-500 max-sm:text-xs">{{ $t('max') }}</span>
            <div class="font-bold text-sm max-sm:text-xs">{{ Math.round(item.temp.max) }}°C</div>
          </div>
        </div>
      </div>
    </div></RouterLink
  >
</template>

<style scoped>
.router-link-exact-active .whether-item {
  background-color: rgba(187, 212, 253, 0.8);
}
.router-link-exact-active {
  top: -10px;
}
</style>
