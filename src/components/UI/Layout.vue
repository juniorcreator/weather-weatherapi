<script setup>
import { useWeatherStore } from '@/stores/weather.js';
import { onMounted, ref, watch } from 'vue';
const { state, fetchCityFromGeo } = useWeatherStore();
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();

onMounted(async () => {
  await fetchCityFromGeo(locale.value);
});

const bgA = ref('');
const bgB = ref('');
const useA = ref(true);

const preloadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.src = src;
  });
};

watch(
  () => state.cityData,
  async () => {
    if (state.cityData) {
      const newBg = `/images/bg/bg-${state.cityData.list[0].weather[0].icon}.webp`;
      await preloadImage(newBg);

      if (useA.value) {
        bgB.value = newBg;
      } else {
        bgA.value = newBg;
      }

      useA.value = !useA.value;
    }
  },
);
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-no-repeat bg-center transition-opacity duration-1000"
      :class="{ 'opacity-100': useA, 'opacity-0': !useA }"
      :style="{ backgroundImage: `url(${bgA})` }"
    ></div>
    <div
      class="absolute inset-0 bg-cover bg-no-repeat bg-center transition-opacity duration-1000"
      :class="{ 'opacity-100': !useA, 'opacity-0': useA }"
      :style="{ backgroundImage: `url(${bgB})` }"
    ></div>
    <main class="relative z-10 flex flex-wrap items-start content-start">
      <slot></slot>
    </main>
  </div>
</template>
