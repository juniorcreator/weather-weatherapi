<template>
  <Teleport to="body">
    <div class="container bg-stone-400/40">
      <div class="loader"></div>
    </div>
  </Teleport>
</template>

<style scoped>
.container {
  position: absolute;
  z-index: 99;
  left: 0;
  top: 0;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  width: 60px;
  height: 60px;
  border: 8px solid #eee;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<script setup lang="ts"></script>
