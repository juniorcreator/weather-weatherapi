<script setup>
import Logo from '@/components/Logo.vue';
import Search from '@/components/Search.vue';
import Layout from '@/components/UI/Layout.vue';
import Spinner from '@/components/Spinner.vue';
import { useWeatherStore } from '@/stores/weather.js';
import { formatDate } from '@/utils/formatDate.js';
const { state } = useWeatherStore();
</script>

<template>
  <Layout>
    <!--    <div class="text-white">-->
    <!--      <button @click="formatDate(1747141200, ' one')">One</button>-->
    <!--      <br />-->
    <!--      <button @click="formatDate(1747087200, ' two')">two</button>-->
    <!--    </div>-->
    <Logo />
    <Search />
    <Spinner v-if="state.loading" />
    <RouterView v-if="state.oneCallData" />
  </Layout>
</template>

<style scoped></style>
