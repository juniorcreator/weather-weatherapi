<script setup>
import CityTime from '@/components/CityTime.vue';
</script>

<template>
  <header class="max-md:w-full max-md:flex max-md:flex-col max-md:items-center max-sm:mb-4">
    <img
      class="w-[150px] rounded-[15px] overflow-hidden max-sm:inline-block"
      width="150"
      height="79"
      src="/images/my-weather-logo.webp"
      alt="Logo"
    />
    <CityTime />
  </header>
</template>

<style scoped></style>
