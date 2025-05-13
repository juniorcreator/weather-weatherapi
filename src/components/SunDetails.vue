<script setup>
import { formatSunsetTime, formatSunsetTimeDt } from '@/utils/formatDate.js';

defineProps(['data', 'timezone', 'index']);
</script>

<template>
  <div class="flex text-sm p-1 pl-4">
    <p class="font-medium">
      {{ $t('sunrise') }}🌅
      {{ formatSunsetTimeDt(data.daily[index].sunrise, data.timezone_offset) }}-
    </p>
    <p class="font-medium">
      {{ $t('sunset') }}🌇 {{ formatSunsetTimeDt(data.daily[index].sunset, data.timezone_offset) }}
    </p>
  </div>
</template>

<style scoped></style>
