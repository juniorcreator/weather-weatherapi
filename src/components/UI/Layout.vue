<script setup>
import { useWhetherStore } from '@/stores/whether.js';
import { ref, watch } from 'vue';
const { state } = useWhetherStore();

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
  () => state.data,
  async () => {
    if (state.data) {
      const newBg = `/images/bg/bg-${state.data.list[0].weather[0].icon}.png`;
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
      class="absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-1000"
      :class="{ 'opacity-100': useA, 'opacity-0': !useA }"
      :style="{ backgroundImage: `url(${bgA})` }"
    ></div>
    <div
      class="absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-1000"
      :class="{ 'opacity-100': !useA, 'opacity-0': useA }"
      :style="{ backgroundImage: `url(${bgB})` }"
    ></div>
    <main class="relative z-10 flex flex-wrap items-start content-start">
      <slot></slot>
    </main>
  </div>
</template>
