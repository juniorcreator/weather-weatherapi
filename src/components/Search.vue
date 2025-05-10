<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useWeatherStore } from '@/stores/weather.js';
import Button from '@/components/UI/Button.vue';

const { state, fetchCityByName } = useWeatherStore();
const cityInput = ref('');
const router = useRouter();

const handleSearch = () => {
  if (!cityInput.value) return;
  router.push('/');
  fetchCityByName(cityInput.value);
};
</script>

<template>
  <div class="text-center w-[70%]">
    <div>
      <input
        @keyup.enter="handleSearch"
        v-model="cityInput"
        class="search-input text-stone-50 border-2 border-stone-50 py-[5px] px-[10px] w-[100%] max-w-[400px] rounded-[10px]"
        type="text"
        placeholder="Enter city name"
      />
      <Button text="Search" class="ml-2" @click="handleSearch" />
    </div>
    <div v-if="state.error" class="text-red-500 bg-stone-50 py-1">{{ state.error }}</div>
  </div>
</template>
