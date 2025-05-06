<script setup>
import { formatDate } from '@/utils/formatDate.js';
import WeatherIcon from '@/components/UI/WeatherIcon.vue';
import { RouterLink } from 'vue-router';
defineProps(['item', 'index', 'dayOfWeek']);
</script>

<template>
  <RouterLink
    class="inline-block mr-1 mb-3 rounded-2xl relative"
    :to="`${index === 0 ? '/' : `/${dayOfWeek[index].split('-')[0]}`}`"
  >
    <div class="whether-item bg-white/70 hover:bg-[#bbd4fd]/80 rounded-2xl shadow p-3 text-center">
      <div>
        <p class="font-bold text-sm">
          {{ formatDate(item.dt) }}
        </p>
        <WeatherIcon :data="item" :src="true" class="mx-auto w-[40px] h-[40px]" />
        <div class="flex justify-between">
          <div class="text-xs mt-3">
            <span class="text-gray-500">Min</span>
            <div class="font-bold text-sm">{{ Math.round(item.temp.min) }}°C</div>
          </div>
          <div class="text-xs mt-3">
            <span class="text-gray-500">Max</span>
            <div class="font-bold text-sm">{{ Math.round(item.temp.max) }}°C</div>
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
