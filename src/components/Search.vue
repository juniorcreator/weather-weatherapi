<script setup>
import { useWhetherStore } from '@/stores/whether.js';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from '@/components/UI/Button.vue';

const { state, setCityName, getLatLon } = useWhetherStore();
const cityName = ref('');

watch(cityName, (newCityName) => {
  setCityName(newCityName);
});
</script>

<template>
  <div class="text-center w-[70%]">
    <div>
      <input
        v-model="cityName"
        class="search-input text-stone-50 border-2 border-stone-50 py-[5px] px-[10px] w-[100%] max-w-[400px] rounded-[10px]"
        type="text"
        placeholder="Enter city name"
      />
      <Button text="Search" class="ml-2" @click="getLatLon" />
    </div>

    <div v-if="state.error" class="text-red-500">{{ state.error }}</div>
  </div>
</template>

<style scoped></style>
