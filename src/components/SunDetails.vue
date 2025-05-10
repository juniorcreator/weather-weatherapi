<script setup>
import { formatSunsetTime } from '@/utils/formatDate.js';

defineProps(['data', 'timezone', 'index']);
</script>

<template>
  <div class="text-sm border-1 border-[#000] rounded-md p-1 pl-1 inline-block">
    <p>Sunrise:🌅 {{ formatSunsetTime(data[index].astro.sunrise) }}</p>
    <p>Sunset:🌇 {{ formatSunsetTime(data[index].astro.sunset) }}</p>
  </div>
</template>

<style scoped></style>
