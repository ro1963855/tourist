<script setup lang="ts">
import type { Ref } from 'vue'
import type { TripDetail } from '@/apis/trip'
import type { Location } from '@/apis/location'
import { ref, computed, onMounted, nextTick } from 'vue'
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
import { bindLocationToTrip, unbindLocationFromTrip } from '@/apis/location'

const map: Ref<google.maps.Map | null> = ref(null)

const route = useRoute()
const router = useRouter()

const tripId = computed(() => {
  const id = Number(route.params.tripId)
  if (!isInteger(id) || id <= 0) {
    return null
  }

  return id
})

// #region tripDetail
const tripDetail: Ref<TripDetail | null> = ref(null)

const tripLocations = computed(() => {
  return tripDetail.value?.locations ?? []
})

onMounted(async () => {
  if (tripId.value === null) {
    router.push({ name: 'NotFound' })
    return
  }

  fetchTripDetail()
})

const fetchTripDetail = async () => {
  if (tripId.value === null) {
    console.error(new Error('tripId should not be null'))
    return
  }

  try {
    tripDetail.value = await getTripDetail(tripId.value)
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 404) {
      router.push({ name: 'NotFound' })
      return
    }

    console.error(err)
  }
}

const bindLocation = async (searchResult: SearchResult) => {
  if (tripId.value === null) {
    console.error(new Error('tripId should not be null'))
    return
  }

  try {
    const location: Location = {
      placeId: searchResult.placeId,
      locationName: searchResult.name,
      longitude: searchResult.lng,
      latitude: searchResult.lat,
      rating: searchResult.rating,
      coverImageUrl: searchResult.coverUrl,
      totalReviews: searchResult.userRatingsTotal,
    }
    await bindLocationToTrip(tripId.value, location)
    await fetchTripDetail()
  } catch (err) {
    console.error(err)
  }
}

const unbindLocation = async (searchResult: SearchResult) => {
  if (tripId.value === null) {
    console.error(new Error('tripId should not be null'))
    return
  }

  const locationId = tripLocations.value.find((location) => {
    return location.placeID === searchResult.placeId
  }) ?? null

  if (locationId === null) {
    console.error(new Error('locationId should not be null'))
    return
  }

  try {
    await unbindLocationFromTrip(tripId.value, locationId.locationID)
    await fetchTripDetail()
  } catch (err) {
    console.error(err)
  }
}
// #endregion tripDetail

// #region searchResult
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
// #endregion searchResult
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
            v-if="tripId"
            ref="searchListEl"
            :searchResults="searchResults"
            :searchResultSelected="searchResultSelected"
            :trip-locations="tripLocations"
            @search-result-mouse-up="selectedSearchResult"
            @bind-location="bindLocation"
            @unbind-location="unbindLocation"
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
