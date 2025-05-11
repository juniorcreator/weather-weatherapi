<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWeatherStore } from '@/stores/weather.js';
import { formatTextDate } from '@/utils/formatDate.js';
import { partMap } from '@/utils/weatherParts.js';
import WeatherPerDay from '@/components/WeatherPerDay.vue';
import SunDetails from '@/components/SunDetails.vue';
import { useI18n } from 'vue-i18n';

const { state } = useWeatherStore();
const route = useRoute();
const { locale } = useI18n();

const index = computed(() => {
  const param = route.params.index;
  const idx = state.dayOfWeek.indexOf(param);
  return idx !== -1 ? idx : 0;
});
const isToday = computed(() => index.value === 0);
const selectedDetail = computed(() =>
  state.forecastDaily?.length ? state.forecastDaily[index.value] : null,
);
const partsOfDay = computed(() => selectedDetail.value || {});

const forecastDay = computed(() => state.forecast.forecast.forecastday?.[index.value] || {});
const location = computed(() => state.forecast.location || {});
const cityData = computed(() => state.cityData.city || {});
const current = computed(() => state.forecast.current || {});
</script>

<template>
  <div class="flex justify-center mt-2 w-full text-[18px]">
    <div class="bg-white/70 rounded-2xl overflow-hidden relative w-full max-w-[825px]">
      <div class="flex items-center py-[10px] bg-[#bbd4fd]/60 shadow p-4">
        <div>
          <div class="font-bold text-3xl max-sm:text-xl">
            {{ cityData.name }}, {{ cityData.country }} -
            <span>{{ forecastDay.day?.condition.text }}</span>
          </div>
        </div>
      </div>

      <div v-if="forecastDay.day" class="flex items-top w-full py-2 px-2 max-md:overflow-x-scroll">
        <div
          v-if="isToday"
          class="text-left text-6xl font-bold mr-10 w-[152px] max-md:min-w-[152px] max-md:overflow-x-scroll"
        >
          <div class="flex justify-center">
            <img :src="current.condition.icon" class="w-[115px]" alt="" />
          </div>
          <div class="pl-4 text-gray-700">{{ Math.round(current.temp_c) }}°C</div>
        </div>
        <div
          v-else
          class="w-[152px] flex items-center text-2xl font-bold mr-10 max-md:min-w-[152px] max-md:overflow-x-scroll"
        >
          <p class="font-bold text-center text-gray-700">
            {{ formatTextDate(forecastDay.date, 'long') }}
          </p>
        </div>

        <div class="w-[135px] mt-[7px] max-md:min-w-[135px] max-md:overflow-x-scroll">
          <div class="text-[12px] space-y-1 mt-[4px]">
            <div class="text-xs mb-1">
              <span>{{ $t('max') }} {{ Math.round(forecastDay.day.maxtemp_c) }}°C</span>
              -
              <span>{{ $t('min') }} {{ Math.round(forecastDay.day.mintemp_c) }}°C</span>
            </div>
            <SunDetails :data="state.forecast.forecast.forecastday" :index="index" />
            <div class="flex justify-between text-sm mb-1">
              <span>{{ $t('temp') }} °C</span>
            </div>
            <div class="flex justify-between text-sm mb-1">
              <span>{{ $t('feels') }}</span>
            </div>
            <div class="flex justify-between text-sm mb-1">
              <span>{{ $t('wind') }}</span>
            </div>
            <div class="flex justify-between text-sm mb-1">
              <span>{{ $t('humidity') }}</span>
            </div>
            <div class="flex justify-between text-sm mb-1">
              <span>{{ $t('pressure') }}</span>
            </div>
          </div>
        </div>

        <div
          class="w-[445px] flex justify-start text-xs ml-5 max-md:min-w-[445px] max-md:overflow-x-scroll"
        >
          <template v-for="(part, partKey) in partMap" :key="partKey">
            <WeatherPerDay
              v-if="partsOfDay[partKey]"
              :day-time-data="partsOfDay[partKey]"
              :day-time="part.time"
              :day-text="partKey"
              :day-icon="part.icon"
              :mix="part.mix"
            />
          </template>
        </div>
      </div>
      <div class="bg-[#bbd4fd]/60 py-1 text-center">
        <span v-if="isToday"
          >📅 {{ formatTextDate(location.localtime, 'long', 'long', locale) }} &nbsp;</span
        >
        <span>🕒 {{ location.localtime.split(' ')[1] }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
