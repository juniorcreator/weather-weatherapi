<script setup>
const props = defineProps(['data', 'width', 'src']);
import { onUpdated } from 'vue';

onUpdated(() => {
  console.log(props.data.weather[0].icon);
});
</script>

<template>
  <img
    :class="`w-[${width}px]`"
    :src="
      src
        ? `https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`
        : `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${data?.weather[0].icon}.png`
    "
    alt="Weather icon"
    :title="data.weather[0].description"
  />
</template>

<style scoped></style>
