<script setup>
import { useWhetherStore } from '@/stores/whether.js';
const { state } = useWhetherStore();
</script>

<template>
  <h3
    class="mt-[10px] bg-white rounded-[10px] p-[5px] text-center text-base font-bold"
    v-if="state.data"
  >
    {{ state.data.city.name }} <span>&#128339;</span> {{ state.time }}
  </h3>
</template>

<style scoped></style>
