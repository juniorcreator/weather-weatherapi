<script setup>
import { useRouter, useRoute, RouterLink } from 'vue-router';
import Whether from '@/components/Whether.vue';
import { useWeatherStore } from '@/stores/weather.js';
const { state } = useWeatherStore();

// const router = useRouter();
// const route = useRoute();
//
// console.log(router, ' router in WeatherDetails.vue');
// console.log(route, ' route in WeatherDetails.vue');
</script>

<template>
  <Whether v-if="state.forecast" />
</template>

<style scoped></style>
