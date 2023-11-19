<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import GoogleMap from '@/components/GoogleMap.vue'
import GoogleMapSearch from '@/components/GoogleMapSearch.vue'
import { SearchResult } from '@/models/SearchResult'
const map: Ref<google.maps.Map | null> = ref(null)
const searchResults: Ref<SearchResult[]> = ref([])
</script>

<template>
  <div class="home-page">
    <Suspense>
      <GoogleMap class="min-w-full min-h-full" v-model:map="map"></GoogleMap>
    </Suspense>

    <div class="map-header">
      <Suspense>
        <GoogleMapSearch
          v-if="map"
          class="map-search"
          :map="map"
          v-model:searchResults="searchResults"
        ></GoogleMapSearch>
      </Suspense>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  @apply w-full h-full relative;

  .map-header {
    @apply absolute top-0 left-0;
    @apply px-4 py-4;
    @apply w-full;
  }

  @media (width <= 1024px) {
    .map-search {
      max-width: none;
    }
  }

  @media (1536px < width) {
    .map-search {
      max-width: 400px;
    }
  }
}
</style>
