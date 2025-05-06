<script setup>
const props = defineProps(['class', 'text']);
</script>

<template>
  <button
    class="border-2 border-white rounded-[10px] text-stone-50 cursor-pointer py-[5px] px-[10px] mt-[5px] bg-transparent transition duration-200 ease-in-out hover:scale-105"
    :class="props.class"
  >
    {{ props.text }}
  </button>
</template>
<style scoped></style>
