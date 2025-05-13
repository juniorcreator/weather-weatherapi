<template>
  <Line :data="chartData" :options="options" />
</template>

<script setup>
import { Line } from 'vue-chartjs';
import { computed } from 'vue';

const props = defineProps({
  chartData: Object,
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      ticks: {
        callback: (val) => `${val}°`,
      },
    },
  },
};
</script>

<style scoped>
canvas {
  max-height: 150px;
  max-width: 300px;
}
</style>
