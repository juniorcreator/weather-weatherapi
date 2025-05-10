<script setup>
import { formatTextDate } from '@/utils/formatDate.js';
import { RouterLink } from 'vue-router';
defineProps(['item', 'index', 'dayOfWeek']);
</script>

<template>
  <RouterLink
    class="inline-block mr-1 mb-3 rounded-2xl relative"
    :to="`${index === 0 ? '/' : `/${dayOfWeek[index]}`}`"
  >
    <div class="whether-item bg-white/70 hover:bg-[#bbd4fd]/80 rounded-2xl shadow p-3 text-center">
      <div>
        <p class="font-bold text-sm">
          {{ formatTextDate(item.date) }}
        </p>
        <div class="flex justify-center">
          <img :class="`w-[50px]`" :src="item.day.condition.icon" alt="Weather icon" />
        </div>

        <p class="text-xs">{{ item.day.condition.text }}</p>
        <div class="flex justify-between">
          <div class="text-xs mt-1">
            <span class="text-gray-500">Min</span>
            <div class="font-bold text-sm">{{ Math.round(item.day.mintemp_c) }}°C</div>
          </div>
          <div class="text-xs mt-1">
            <span class="text-gray-500">Max</span>
            <div class="font-bold text-sm">{{ Math.round(item.day.maxtemp_c) }}°C</div>
          </div>
        </div>
      </div>
    </div></RouterLink
  >
</template>

<style scoped>
.router-link-exact-active .whether-item {
  background-color: rgba(187, 212, 253, 0.8);
}
.router-link-exact-active {
  top: -10px;
}
</style>
