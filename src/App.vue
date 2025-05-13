<script setup>
import Logo from '@/components/Logo.vue';
import Search from '@/components/Search.vue';
import Layout from '@/components/UI/Layout.vue';
import Spinner from '@/components/Spinner.vue';
import { useWeatherStore } from '@/stores/weather.js';
const { state } = useWeatherStore();
</script>

<template>
  <Layout>
    <Logo />
    <Search />
    <Spinner v-if="state.loading" />
    <RouterView v-if="state.oneCallData" />
  </Layout>
</template>

<style scoped></style>
