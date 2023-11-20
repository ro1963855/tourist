<script setup lang="ts">
import { computed } from 'vue'
import SearchResultCard from '@/components/SearchResultCard.vue'
import { SearchResult } from '@/models/SearchResult'

const props = defineProps<{
  searchResults: SearchResult[]
}>()

const isSearchEmpty = computed(() => props.searchResults.length === 0)
</script>

<template>
  <template v-if="isSearchEmpty">
    <div class="empty">
      <span class="empty-words">{{ $t('SearchList.empty') }}</span>
    </div>
  </template>
  <template v-else>
    <ul class="search-list">
      <li v-for="result in searchResults" :key="result.placeId">
        <SearchResultCard
          :search-result="result"
          :is-save="false"
        ></SearchResultCard>
      </li>
    </ul>
  </template>
</template>

<style lang="scss" scoped>
.empty {
  @apply flex items-center justify-center;
  @apply w-full h-full;

  .empty-words {
    @apply text-4xl text-primary-black;
  }
}

.search-list {
  @apply bg-gray-100 space-y-4;
}
</style>
