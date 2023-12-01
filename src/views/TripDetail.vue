<script setup lang="ts">
import type { Ref } from 'vue'
import type { TripDetail } from '@/apis/trip'
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isAxiosError } from 'axios'
import { isInteger } from 'lodash-es'
import GoogleMap from '@/components/GoogleMap.vue'
import GoogleMapSearch from '@/components/GoogleMapSearch.vue'
import BottomControlDrawer from '@/components/BottomControlDrawer.vue'
import SearchList from '@/components/SearchList.vue'
import ControlTabs from '@/components/ControlTabs.vue'
import { SearchResult } from '@/models/SearchResult'
import { getMockSearchResultsData } from '@/models/searchMockData'
import { getTripDetail } from '@/apis/trip'

const map: Ref<google.maps.Map | null> = ref(null)

const route = useRoute()
const router = useRouter()
const tripDetail: Ref<TripDetail | null> = ref(null)

onMounted(async () => {
  const tripId = Number(route.params.tripId)
  if (!isInteger(tripId) || tripId <= 0) {
    router.push({ name: 'NotFound' })
    return
  }

  try {
    tripDetail.value = await getTripDetail(tripId)
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 404) {
      router.push({ name: 'NotFound' })
      return
    }

    console.error(err)
  }
})

const controlTabEl: Ref<InstanceType<typeof ControlTabs> | null> = ref(null)
const searchResults: Ref<SearchResult[]> = ref([])
const searchResultSelected: Ref<SearchResult | null> = ref(null)

// Mock
searchResults.value = getMockSearchResultsData()

const search = (results: SearchResult[]) => {
  searchResultSelected.value = null
  searchResults.value = results

  if (!controlTabEl.value) {
    console.error('controlTabEl should not be null')
    return
  }

  controlTabEl.value.changeTab('SEARCH')
}

const searchListEl: Ref<InstanceType<typeof SearchList> | null> = ref(null)
const scrollSearchListToSearchResultCard = (searchResult: SearchResult) => {
  if (!controlTabEl.value) {
    console.error('controlTabEl should not be null')
    return
  }

  controlTabEl.value.changeTab('SEARCH')
  searchResultSelected.value = searchResult
  // FIXME: 要兩層 nextTick 才能當 tab 還是 List 狀態下，切過去才可以正確地滾動到指定位置
  nextTick(() => {
    nextTick(() => {
      if (!searchListEl.value) {
        console.error('searchListEl should not be null')
        return
      }
      searchListEl.value.focusSearchResultCard(searchResult)
    })
  })
}

const selectedSearchResult = (searchResult: SearchResult) => {
  searchResultSelected.value = searchResult
}
</script>

<template>
  <div class="trip-detail">
    <Suspense>
      <GoogleMap
        class="min-w-full min-h-full"
        v-model:map="map"
        :searchResults="searchResults"
        :search-result-selected="searchResultSelected"
        @marker-clicked="scrollSearchListToSearchResultCard"
      ></GoogleMap>
    </Suspense>

    <div class="map-header">
      <Suspense>
        <GoogleMapSearch
          v-if="map"
          class="map-search"
          :map="map"
          :searchResults="searchResults"
          @search="search"
        ></GoogleMapSearch>
      </Suspense>
    </div>

    <BottomControlDrawer>
      <ControlTabs ref="controlTabEl">
        <template #LIST></template>
        <template #SEARCH>
          <SearchList
            ref="searchListEl"
            :searchResults="searchResults"
            :searchResultSelected="searchResultSelected"
            @search-result-mouse-up="selectedSearchResult"
          ></SearchList>
        </template>
      </ControlTabs>
    </BottomControlDrawer>
  </div>
</template>

<style lang="scss" scoped>
.trip-detail {
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
