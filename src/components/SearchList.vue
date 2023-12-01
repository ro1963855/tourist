<script setup lang="ts">
import { computed } from 'vue'
import SearchResultCard from '@/components/SearchResultCard.vue'
import { SearchResult } from '@/models/SearchResult'

const props = defineProps<{
  searchResults: SearchResult[]
  searchResultSelected: SearchResult | null
}>()

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'searchResultMouseUp', searchResult: SearchResult): void;
}>()

const isSearchEmpty = computed(() => props.searchResults.length === 0)

const focusSearchResultCard = (searchResult: SearchResult) => {
  const cardEl = document.querySelector(`#card-${searchResult.placeId}`)
  if (!cardEl) { return }
  cardEl?.scrollIntoView({ behavior: 'smooth' })
}

const handleMouseUpSearchResult = (searchResult: SearchResult) => {
  if (props.searchResultSelected?.placeId === searchResult.placeId) { return }
  emit('searchResultMouseUp', searchResult)
}

defineExpose({
  focusSearchResultCard,
})
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
          :id="`card-${result.placeId}`"
          :search-result="result"
          :is-save="false"
          :is-active="searchResultSelected?.placeId === result.placeId"
          @mouseover="handleMouseUpSearchResult(result)"
        ></SearchResultCard>
      </li>
    </ul>
  </template>
</template>

<style lang="scss" scoped>
.empty {
  @apply flex items-center justify-center;
  @apply w-full h-full;

  flex: 1 1 100%;

  .empty-words {
    @apply text-4xl text-primary-black;
  }
}

.search-list {
  @apply bg-gray-200 space-y-4;
  @apply overflow-auto h-full;
}
</style>
