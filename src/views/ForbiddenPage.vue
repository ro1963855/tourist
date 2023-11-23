<template>
  <div class="forbidden-page">
    <h1>403 - Forbidden</h1>
    <p>Sorry, you don't have permission to access this page.</p>
  </div>
</template>

<style lang="scss" scoped>
  .forbidden-page {
    @apply h-full w-full;
    @apply flex items-center justify-center flex-col;

    h1 {
      @apply text-7xl text-danger-dark mb-8;
    }

    p {
      @apply text-xl;
    }
  }
</style>
