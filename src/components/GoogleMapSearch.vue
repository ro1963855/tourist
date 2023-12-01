<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { ElInput, ElButton } from 'element-plus'
import { getPlacesApiApi } from '@/stores/useGoogleMapApi'
import { SearchResult } from '@/models/SearchResult'

const props = defineProps<{
  map: google.maps.Map
  searchResults: SearchResult[]
}>()

const emit = defineEmits<{(e: 'search', searchResults: SearchResult[]): void}>()

const placesApi = await getPlacesApiApi()
const placesService = new placesApi.PlacesService(props.map)

const searchQuery = ref('')
const search = () => {
  if (searchQuery.value === '') { return }

  const request = {
    query: searchQuery.value,
  }

  placesService.textSearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      const searchResults = results.map((marker) => {
        return new SearchResult(
          marker.place_id ?? '',
          marker.name ?? '',
          marker.formatted_address ?? '',
          marker.photos?.[0].getUrl() ?? '',
          marker.geometry?.location?.lat() ?? 0,
          marker.geometry?.location?.lng() ?? 0,
          marker.rating ?? 0,
          marker.user_ratings_total ?? 0,
        )
      })

      emit('search', searchResults)
    }
  })
}

const isHaveSearchResults = computed(() => props.searchResults.length > 0)
const clearSearchResults = () => {
  emit('search', [])
}
</script>

<template>
  <div class="google-map-search">
    <ElInput
      class="search"
      v-model="searchQuery"
      size="large"
      :placeholder="$t('GoogleMapSearch.input.placeholder')"
    >
      <template #suffix v-if="isHaveSearchResults">
        <ElButton
          class="clear"
          type="info"
          size="small"
          text
          bg
          @click="clearSearchResults"
        >
          <span class="mr-1">{{ "清除結果" }}</span>
          <Icon icon="material-symbols:close-rounded" />
        </ElButton>
      </template>
      <template #append>
        <ElButton class="search-button" @click="search">
          <Icon icon="material-symbols:search" />
        </ElButton>
      </template>
    </ElInput>
  </div>
</template>

<style lang="scss" scoped>
.google-map-search {
  @apply w-full;

  .search-button {
    @apply text-primary-black hover:text-gray-700 active:text-gray-900;
  }

  :deep(.el-input__wrapper) {
    @apply relative;
  }

  .clear {
    @apply absolute right-4 top-1/2 -translate-y-1/2 transform;
  }
}
</style>
