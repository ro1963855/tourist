<template>
  <div class="not-found-page">
    <h1>404 - Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
  </div>
</template>

<style lang="scss" scoped>
  .not-found-page {
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
