<script setup>
import { useRouter } from 'vue-router';
import { useWeatherStore } from '@/stores/weather.js';
import Whether from '@/components/Whether.vue';
import FiveDayWhetherItem from '@/components/FiveDayWhetherItem.vue';
import { ref, computed } from 'vue';

const { state } = useWeatherStore();
const router = useRouter();
const showDays = ref(7);

const visibleForecast = computed(() => {
  return state.forecast?.forecast.forecastday.slice(0, showDays.value);
});

const handleClick = (value) => {
  router.push('/');
  showDays.value = value;
};

console.log('rendered Five DayWhether');
</script>

<template>
  <div class="flex justify-center w-full mt-[20px]">
    <div class="1">
      <div class="mb-4">
        <span
          @click="handleClick(7)"
          :class="{ active: showDays === 7 }"
          class="text-stone-50 mr-1 py-[5px] px-[15px] rounded-xl cursor-pointer hover:bg-[cornflowerblue]"
          >Week</span
        >
        <span
          @click="handleClick(10)"
          :class="{ active: showDays === 10 }"
          class="text-stone-50 p-y-1 py-[5px] px-[15px] px-2 rounded-xl cursor-pointer hover:bg-[cornflowerblue]"
          >10 days</span
        >
      </div>
      <div class="flex flex-wrap justify-center"></div>
      <FiveDayWhetherItem
        v-for="(item, index) in visibleForecast"
        :key="item.date"
        :item="item"
        :dayOfWeek="state.dayOfWeek"
        :index="index"
      />
    </div>
  </div>
  <Whether v-if="state.forecast" />
</template>

<style scoped>
.router-link-exact-active .whether-item {
  background-color: rgba(187, 212, 253, 0.8);
}
.router-link-exact-active {
  top: -10px;
}

.active {
  background-color: cornflowerblue;
  color: white;
  pointer-events: none;
}
</style>
