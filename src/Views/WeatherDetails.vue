<script setup>
import Whether from '@/components/Whether.vue';
import { useWeatherStore } from '@/stores/weather.js';
const { state } = useWeatherStore();
</script>
<template>
  <Whether v-if="state.oneCallData" />
</template>

<style scoped></style>
