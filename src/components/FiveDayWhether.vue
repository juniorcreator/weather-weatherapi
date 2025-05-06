<script setup>
import { useWhetherStore } from '@/stores/whether.js';
import Whether from '@/components/Whether.vue';
import FiveDayWhetherItem from '@/components/FiveDayWhetherItem.vue';

const { state } = useWhetherStore();

console.log('rendered Five DayWhether');
</script>

<template>
  <div v-if="state.data" class="flex justify-center w-full">
    <div class="flex flex-wrap justify-center">
      <FiveDayWhetherItem
        v-for="(item, index) in state.oneCallData.daily"
        :key="item.dt"
        :item="item"
        :dayOfWeek="state.dayOfWeek"
        :index="index"
      />
    </div>
  </div>
  <Whether v-if="state.oneCallData" />
</template>

<style scoped>
.router-link-exact-active .whether-item {
  background-color: rgba(187, 212, 253, 0.8);
}
.router-link-exact-active {
  top: -10px;
}
</style>
