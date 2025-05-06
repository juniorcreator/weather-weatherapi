<script setup>
import WeatherIcon from '@/components/UI/WeatherIcon.vue';

const props = defineProps(['dayTimeData', 'dayText', 'dayIcon', 'dayPeriod', 'dayTextTime', 'mix']);

console.log(props.dayTimeData, ' dayTimeData');
</script>

<template>
  <div :class="`text-center mt-1 text-sm ${mix}`">
    <div class="font-bold">
      <span class="mr-1">{{ dayIcon }}</span> {{ dayText }}
    </div>
    <div class="text-xs">{{ dayTextTime }}</div>
    <div class="mb-1">{{ Math.round(dayTimeData.temp[dayPeriod]) }}°C</div>
    <div class="mb-1">{{ Math.round(dayTimeData.feels_like[dayPeriod]) }}°C</div>
  </div>
</template>

<style scoped></style>
