<script setup lang="ts">
import type { Ref } from 'vue'
import type { Marker } from '@/apis/marker'
import { ref, onMounted } from 'vue'
import { isNil } from 'lodash-es'
import { Loader } from '@googlemaps/js-api-loader'
import { getMarkers } from '@/apis/marker'

const mapEl: Ref<HTMLElement | null> = ref(null)

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  version: 'weekly',
  libraries: ['places'],
  language: 'zh-TW'
})

const mapApi = await loader.importLibrary('maps')
const markerApi = await loader.importLibrary('marker')
let map: google.maps.Map | null = null

const addMarker = (marker: Marker) => {
  if (isNil(map)) {
    console.error('map should not null')
    return
  }

  const mapMarker = new markerApi.Marker({
    position: { lat: marker.lat, lng: marker.lng }
  })
  mapMarker.setMap(map)
}

const initMap = async () => {
  if (isNil(mapEl.value)) {
    console.error('mapEl.value should not null')
    return
  }

  const mapOptions = {
    center: {
      lat: 25.0425,
      lng: 121.5468
    },
    zoom: 11
  }

  try {
    map = new mapApi.Map(mapEl.value, mapOptions)
  } catch (e) {
    console.error(e)
  }
}

const fetchMarkers = async () => {
  const response = await getMarkers()
  const markers = response.data
  markers.forEach((marker) => {
    addMarker(marker)
  })
}

onMounted(async () => {
  await initMap()
  await fetchMarkers()
})
</script>

<template>
  <div ref="mapEl"></div>
</template>
