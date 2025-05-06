<template>
  <div class="container">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
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
