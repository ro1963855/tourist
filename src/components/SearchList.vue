<script setup lang="ts">
import type { TripDetailLocation } from '@/apis/trip'
import { computed } from 'vue'
import SearchResultCard from '@/components/SearchResultCard.vue'
import { SearchResult } from '@/models/SearchResult'

const props = defineProps<{
  searchResults: SearchResult[]
  searchResultSelected: SearchResult | null
  tripLocations: TripDetailLocation[]
}>()

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'searchResultMouseUp', searchResult: SearchResult): void;
  (e: 'bindLocation', searchResult: SearchResult): void;
  (e: 'unbindLocation', searchResult: SearchResult): void;
}>()

const isSearchEmpty = computed(() => props.searchResults.length === 0)

const tripLocationPlaceIDs = computed(() => {
  return props.tripLocations.map((location) => location.placeID)
})

const normalizedSearchResults = computed(() => {
  return props.searchResults.map((result) => {
    return {
      result,
      isSave: tripLocationPlaceIDs.value.includes(result.placeId),
    }
  })
})

const focusSearchResultCard = (searchResult: SearchResult) => {
  const cardEl = document.querySelector(`#card-${searchResult.placeId}`)
  if (!cardEl) { return }
  cardEl?.scrollIntoView({ behavior: 'smooth' })
}

const handleMouseUpSearchResult = (searchResult: SearchResult) => {
  if (props.searchResultSelected?.placeId === searchResult.placeId) { return }
  emit('searchResultMouseUp', searchResult)
}

const bindLocation = async (searchResult: SearchResult) => {
  emit('bindLocation', searchResult)
}

const unbindLocation = async (searchResult: SearchResult) => {
  emit('unbindLocation', searchResult)
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
      <li v-for="normalizedResult in normalizedSearchResults" :key="normalizedResult.result.placeId">
        <SearchResultCard
          :id="`card-${normalizedResult.result.placeId}`"
          :search-result="normalizedResult.result"
          :is-save="normalizedResult.isSave"
          :is-active="searchResultSelected?.placeId === normalizedResult.result.placeId"
          @mouseover="handleMouseUpSearchResult(normalizedResult.result)"
          @bind-location="bindLocation"
          @unbind-location="unbindLocation"
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
