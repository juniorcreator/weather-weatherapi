<script setup>
import { formatLocalTime } from '@/utils/getLocalTime.js';
defineProps(['data', 'timezone', 'index']);
</script>

<template>
  <div class="text-sm border-1 border-[#000] rounded-md p-1 pl-3 mb-[31px]">
    <p>
      Sunrise:🌅
      {{ formatLocalTime(data[index].sunrise, timezone) }}
    </p>
    <p>
      Sunset:🌇
      {{ formatLocalTime(data[index].sunset, timezone) }}
    </p>
  </div>
</template>

<style scoped></style>
