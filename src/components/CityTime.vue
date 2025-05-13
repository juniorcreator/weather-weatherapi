<script setup>
import { useWeatherStore } from '@/stores/weather.js';
import { getLocalTimeNow } from '@/utils/formatDate.js';
const { state } = useWeatherStore();
</script>

<template>
  <h3
    class="mt-[10px] max-w-[150px] bg-white rounded-[10px] border-3 border-[#bbd4fd]/90 p-[5px] text-center text-base font-bold"
    v-if="state.cityData"
  >
    {{ state.cityData?.city.name }} <span>&#128339;</span>
    {{ getLocalTimeNow() }}
  </h3>
</template>

<style scoped></style>
