<script setup>
import CityTime from '@/components/CityTime.vue';
</script>

<template>
  <header class="max-sm:w-full max-sm:flex max-sm:flex-col max-sm:items-center max-sm:mb-4">
    <img
      class="w-[230px] rounded-[15px] overflow-hidden max-sm:inline-block"
      width="230"
      height="79"
      src="/images/my-synoptic.webp"
      alt="Logo"
    />
    <CityTime />
  </header>
</template>

<style scoped></style>
