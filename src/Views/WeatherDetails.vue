<script setup>
import { useRouter, useRoute, RouterLink } from 'vue-router';
import Whether from '@/components/Whether.vue';
import { useWhetherStore } from '@/stores/whether.js';
const { state } = useWhetherStore();

const router = useRouter();
const route = useRoute();

console.log(router, ' router in WeatherDetails.vue');
console.log(route, ' route in WeatherDetails.vue');
</script>

<template>
  <Whether />
</template>

<style scoped></style>
