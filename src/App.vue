<script setup lang="ts">
import GoogleMap from '@/components/GoogleMap.vue'
</script>

<template>
  <div class="layout">
    <Suspense>
      <GoogleMap class="min-w-full min-h-full"></GoogleMap>

      <template #fallback>
        <div class="w-full h-full" v-loading="true"></div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  min-height: 100dvh;
  min-width: 100vw;
  min-width: 100dvw;
  height: 100vh;
  height: 100dvh;
  width: 100vw;
  width: 100dvw;
}
</style>
