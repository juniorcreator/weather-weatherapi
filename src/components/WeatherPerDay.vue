<script setup>
import { pressureMbToMm } from '@/utils/pressureMbToMm.js';

defineProps({
  dayTimeData: Object,
  dayTime: Array,
  dayText: String,
  dayIcon: String,
  mix: String,
});
</script>

<template>
  <div :class="`text-center mt-1 text-sm ${mix}`">
    <div class="text-gray-700">
      <span class="mr-1">{{ dayIcon }}</span> {{ dayText }}
    </div>
    <div class="flex justify-between">
      <div class="111" :class="{ active: dayTimeData[0].active }">
        <div class="text-xs time">{{ dayTime[0] }}</div>
        <img alt="" class="w-[46px]" :src="dayTimeData[0].condition.icon" />
        <div class="mb-1">🌡️ {{ Math.round(dayTimeData[0].temp_c) }}°</div>
        <div class="mb-1">🌡️ {{ Math.round(dayTimeData[0].feelslike_c) }}°</div>
        <div class="mb-1">💨 {{ Math.round(dayTimeData[0].wind_mph) }}</div>
        <div class="mb-1">💧 {{ Math.round(dayTimeData[0].humidity) }}</div>
        <div class="mb-1">🧭 {{ pressureMbToMm(dayTimeData[0].pressure_mb) }}</div>
      </div>
      <div class="222" :class="{ active: dayTimeData[1].active }">
        <div class="text-xs time">{{ dayTime[1] }}</div>
        <img alt="" class="w-[46px]" :src="dayTimeData[1].condition.icon" />
        <div class="mb-1">🌡 {{ Math.round(dayTimeData[1].temp_c) }}°</div>
        <div class="mb-1">🌡️ {{ Math.round(dayTimeData[1].feelslike_c) }}°</div>
        <div class="mb-1">💨 {{ Math.round(dayTimeData[1].wind_mph) }}</div>
        <div class="mb-1">💧 {{ Math.round(dayTimeData[1].humidity) }}</div>
        <div class="mb-1">🧭 {{ pressureMbToMm(dayTimeData[1].pressure_mb) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  background-color: rgba(187, 212, 253, 0.9);
  border-radius: 4px;
}

.active .time {
  background-color: lightskyblue;
}
</style>
