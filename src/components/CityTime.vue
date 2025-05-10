<script setup>
import { useWeatherStore } from '@/stores/weather.js';
const { state } = useWeatherStore();
</script>

<template>
  <h3
    class="mt-[10px] bg-white rounded-[10px] border-3 border-[#bbd4fd]/90 p-[5px] text-center text-base font-bold"
    v-if="state.forecast"
  >
    {{ state.forecast.location.name }} <span>&#128339;</span>
    {{ state.forecast.location.localtime.split(' ')[1] }}
  </h3>
</template>

<style scoped></style>
