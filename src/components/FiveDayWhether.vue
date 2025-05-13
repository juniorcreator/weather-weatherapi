<script setup>
import { useRouter } from 'vue-router';
import { useWeatherStore } from '@/stores/weather.js';
import Whether from '@/components/Whether.vue';
import FiveDayWhetherItem from '@/components/FiveDayWhetherItem.vue';
import { ref, computed } from 'vue';

const { state } = useWeatherStore();
const router = useRouter();
const showDays = ref(JSON.parse(localStorage.getItem('showDays')) || 7);

const visibleForecast = computed(() => {
  return state.oneCallData?.daily.slice(0, showDays.value);
});

const handleClick = (value) => {
  router.push('/');
  showDays.value = value;
  localStorage.setItem('showDays', showDays.value);
};

console.log('rendered Five DayWhether');
</script>

<template>
  <div class="flex justify-center w-full mt-[20px] max-md:flex-wrap">
    <div class="mb-2 hidden max-md:block w-full">
      <span
        @click="handleClick(3)"
        :class="{ active: showDays === 3 }"
        class="text-stone-50 mr-1 py-[5px] px-[15px] rounded-xl cursor-pointer hover:bg-[cornflowerblue]"
        >{{ $t('week') }}</span
      >
      <span
        @click="handleClick(8)"
        :class="{ active: showDays === 8 }"
        class="text-stone-50 p-y-1 py-[5px] px-[15px] px-2 rounded-xl cursor-pointer hover:bg-[cornflowerblue]"
        >{{ $t('10days') }}</span
      >
    </div>
    <div class="1 max-md:flex max-md:overflow-x-scroll max-md:pt-[10px] max-md:w-full">
      <div class="mb-4 hidden md:block md:w-full">
        <span
          @click="handleClick(3)"
          :class="{ active: showDays === 3 }"
          class="text-stone-50 mr-1 py-[5px] px-[15px] rounded-xl cursor-pointer hover:bg-[cornflowerblue]"
          >{{ $t('week') }}</span
        >
        <span
          @click="handleClick(8)"
          :class="{ active: showDays === 8 }"
          class="text-stone-50 p-y-1 py-[5px] px-[15px] px-2 rounded-xl cursor-pointer hover:bg-[cornflowerblue]"
          >{{ $t('10days') }}</span
        >
      </div>
      <FiveDayWhetherItem
        v-for="(item, index) in visibleForecast"
        :key="item.date"
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

.active {
  background-color: cornflowerblue;
  color: white;
  pointer-events: none;
}
</style>
