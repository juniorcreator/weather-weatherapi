<script setup>
import Logo from '@/components/Logo.vue';
import Search from '@/components/Search.vue';
import Layout from '@/components/UI/Layout.vue';
import Spinner from '@/components/Spinner.vue';
import { useWhetherStore } from '@/stores/whether.js';
const { state } = useWhetherStore();
</script>

<template>
  <Layout>
    <Logo />
    <Search />
    <Spinner v-if="state.loading" />
    <RouterView />
  </Layout>
</template>

<style scoped></style>
