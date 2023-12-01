<script setup lang="ts">
import type { Ref } from 'vue'
// import type { Marker } from '@/apis/marker'
import { ref, onMounted, watch } from 'vue'
import { isNil } from 'lodash-es'
import ICON_PIN_SEARCH from '@/assets/icon-pin-search.png'
// import { getMarkers } from '@/apis/marker'
import { getMapsApi, getMarkerApiApi } from '@/stores/useGoogleMapApi'
import { SearchResult } from '@/models/SearchResult'

const mapEl: Ref<HTMLElement | null> = ref(null)

const mapApi = await getMapsApi()
const markerApi = await getMarkerApiApi()

const props = defineProps<{
  map: google.maps.Map | null
  searchResults: SearchResult[]
  searchResultSelected: SearchResult | null
}>()

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'update:map', map: google.maps.Map): void
  (e: 'markerClicked', searchResult: SearchResult): void;
}>()

const DEFAULT_SEARCH_ICON = {
  url: ICON_PIN_SEARCH,
  scaledSize: new google.maps.Size(36, 36),
} as const

const HIGHLIGHT_SEARCH_ICON = {
  url: ICON_PIN_SEARCH,
  scaledSize: new google.maps.Size(48, 48),
} as const

const initMap = async () => {
  if (isNil(mapEl.value)) {
    console.error('mapEl.value should not null')
    return
  }

  const mapOptions = {
    center: {
      lat: 25.0425,
      lng: 121.5468,
    },
    zoom: 11,
    mapTypeId: mapApi.MapTypeId.ROADMAP,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  }

  try {
    const map = new mapApi.Map(mapEl.value, mapOptions)
    emit('update:map', map)
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  await initMap()
  initSearchResultMakers(props.searchResults)
})

// const allMarkers: google.maps.Marker[] = []
// const addMarker = (marker: Marker) => {
//   if (isNil(props.map)) {
//     console.error('map should not null')
//     return
//   }

//   const mapMarker = new markerApi.Marker({
//     position: { lat: marker.lat, lng: marker.lng },
//     icon: {
//       url: ICON_PIN_SEARCH,
//       scaledSize: new google.maps.Size(36, 36),
//     },
//   })
//   allMarkers.push(mapMarker)
//   mapMarker.setMap(props.map)
// }

// const fetchMarkers = async () => {
//   const response = await getMarkers()
//   const markers = response.data
//   markers.forEach((marker) => {
//     addMarker(marker)
//   })
// }

// watch(() => props.map, async () => {
//   if (isNil(props.map)) { return }
//   await fetchMarkers()
// })

let searchResultMarkers: Record<string, google.maps.Marker> = {}
const addSearchResultMarker = (searchResult: SearchResult) => {
  if (isNil(props.map)) {
    console.error('map should not null')
    return
  }

  const marker = new markerApi.Marker({
    position: {
      lat: searchResult.lat,
      lng: searchResult.lng,
    },
    icon: DEFAULT_SEARCH_ICON,
  })
  searchResultMarkers[searchResult.placeId] = marker

  marker.addListener('click', () => {
    Object.values(searchResultMarkers).forEach((marker) => disHightLightSearchResult(marker))
    hightLightSearchResult(marker)
    emit('markerClicked', searchResult)
  })
  return marker
}

const disHightLightSearchResult = (marker: google.maps.Marker) => {
  marker.setZIndex(null)
  marker.setIcon(DEFAULT_SEARCH_ICON)
}

const hightLightSearchResult = (marker: google.maps.Marker) => {
  marker.setZIndex(1)
  marker.setIcon(HIGHLIGHT_SEARCH_ICON)
}

const hiddenSearchResultMarker = (marker: google.maps.Marker) => {
  marker.setMap(null)
}

const showSearchResultMarker = (marker: google.maps.Marker) => {
  if (isNil(props.map)) {
    console.error('map should not null')
    return
  }
  marker.setMap(props.map)
}

const initSearchResultMakers = (searchResults: SearchResult[]) => {
  Object.values(searchResultMarkers).forEach(marker => {
    hiddenSearchResultMarker(marker)
  })
  searchResultMarkers = {}

  searchResults.forEach((searchResult) => {
    const marker = addSearchResultMarker(searchResult)
    if (marker) {
      showSearchResultMarker(marker)
    }
  })

  moveMapCenterToFitSearchResults()

  const selectedPlaceId = props.searchResultSelected?.placeId ?? null
  const selectedMarker = selectedPlaceId ? searchResultMarkers[selectedPlaceId] : null
  if (!isNil(selectedMarker)) {
    hightLightSearchResult(selectedMarker)
  }
}

const moveMapCenterToFitSearchResults = () => {
  if (isNil(props.map)) {
    console.error('map should not null')
    return
  }

  const bounds = new google.maps.LatLngBounds()

  if (Object.values(searchResultMarkers).length === 0) { return }

  Object.values(searchResultMarkers).forEach((marker) => {
    const position = marker.getPosition()
    if (position) {
      bounds.extend(position)
    }
  })

  // NOTE: 因爲 map 會有 drawer 擋住，讓原本最南邊的地標可以出現，所以將南邊界延伸兩倍
  const extendVertical = new google.maps.LatLng({
    lat: 2 * bounds.getSouthWest().lat() - bounds.getNorthEast().lat(),
    lng: bounds.getCenter().lng(),
  })
  bounds.extend(extendVertical)

  props.map.fitBounds(bounds)
}

watch(() => props.searchResults, () => {
  if (!props.map) { return }
  initSearchResultMakers(props.searchResults)
}, { immediate: true })

watch(() => props.searchResultSelected, () => {
  if (!props.map) { return }
  const selectedPlaceId = props.searchResultSelected?.placeId ?? null
  const selectedMarker = selectedPlaceId ? searchResultMarkers[selectedPlaceId] : null
  if (!isNil(selectedMarker)) {
    Object.values(searchResultMarkers).forEach((marker) => {
      disHightLightSearchResult(marker)
    })
    hightLightSearchResult(selectedMarker)
  }
}, { immediate: true })
</script>

<template>
  <div ref="mapEl"></div>
</template>
