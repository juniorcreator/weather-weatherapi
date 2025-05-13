<script setup>
import { computed } from 'vue';
import { useWeatherStore } from '@/stores/weather.js';

const weatherStore = useWeatherStore();

const props = defineProps({
  hourly: Array,
  timezone: Number,
  index: Number,
});

const getLocalDate = (dt, offset) => {
  const local = new Date(dt * 1000 + offset * 1000);
  return local.toISOString().split('T')[0];
};

const getDateFromIndex = (index) => {
  const dailyForecast = weatherStore.state.oneCallData?.daily?.[index];
  return dailyForecast ? getLocalDate(dailyForecast.dt, props.timezone) : null;
};

const activeDate = computed(() => getDateFromIndex(props.index));

const upcomingHours = computed(() =>
  props.hourly.filter((h) => getLocalDate(h.dt, props.timezone) === activeDate.value),
);

const formatHour = (dt) => {
  const date = new Date((dt + props.timezone) * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};

const getIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

const getTimePeriod = (dt) => {
  const hour = new Date((dt + props.timezone) * 1000).getHours();
  if (hour >= 0 && hour < 6) return 'night';
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'day';
  return 'evening';
};
</script>

<template>
  <p class="w-full text-sm font-bold pl-3">{{ $t('hf') }}</p>
  <div class="flex max-w-full">
    <div class="p-2 mt-[86px] min-w-[130px]">
      <p class="border-b-1 text-sm mb-[4px]">{{ $t('temp') }}</p>
      <p class="border-b-1 text-sm mb-[4px]">{{ $t('feels') }}</p>
      <p class="border-b-1 text-sm mb-[4px]">{{ $t('wind') }}</p>
      <p class="border-b-1 text-sm">{{ $t('humidity') }}</p>
    </div>

    <div class="flex overflow-x-auto gap-2 pb-4 pl-3 pt-[10px] scroll-smooth">
      <div
        v-for="(hour, index) in upcomingHours"
        :key="hour.dt"
        :class="[
          'min-w-[90px] text-center text-sm p-2 rounded-lg text-white transition-transform border-2 border-transparent',
          getTimePeriod(hour.dt) === 'night'
            ? 'bg-slate-800/60'
            : getTimePeriod(hour.dt) === 'morning'
              ? 'bg-amber-500/60'
              : getTimePeriod(hour.dt) === 'day'
                ? 'bg-blue-500/60'
                : 'bg-[#e17055]/60',
          index === 0 ? 'border-white' : '',
        ]"
      >
        <p>{{ formatHour(hour.dt) }}</p>
        <div class="flex justify-center">
          <img
            :src="getIconUrl(hour.weather[0].icon)"
            :alt="hour.weather[0].description"
            width="50"
          />
        </div>
        <p class="border-b-1 text-base">{{ Math.round(hour.temp) }}°C</p>
        <p class="border-b-1 text-base">{{ Math.round(hour.feels_like) }}°C</p>
        <p class="border-b-1 text-base">{{ Math.round(hour.wind_speed) }}m/s</p>
        <p class="border-b-1 text-base">{{ Math.round(hour.humidity) }}%</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
