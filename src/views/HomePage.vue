<script setup lang="ts">
import GoogleMap from '@/components/GoogleMap.vue'
</script>

<template>
  <div class="home-page">
    <Suspense>
      <GoogleMap class="min-w-full min-h-full"></GoogleMap>

      <template #fallback>
        <div class="w-full h-full" v-loading="true"></div>
      </template>
    </Suspense>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  @apply w-full h-full;
}
</style>
