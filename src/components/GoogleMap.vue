<script setup lang="ts">
import type { Ref } from 'vue'
import type { Marker } from '@/apis/marker'
import { ref, onMounted, watch } from 'vue'
import { isNil } from 'lodash-es'
import { getMarkers } from '@/apis/marker'
import { getMapsApi, getMarkerApiApi } from '@/stores/useGoogleMapApi'

const mapEl: Ref<HTMLElement | null> = ref(null)

const mapApi = await getMapsApi()
const markerApi = await getMarkerApiApi()

const props = defineProps<{
  map: google.maps.Map | null
}>()

const emit = defineEmits<{(e: 'update:map', map: google.maps.Map): void}>()

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
    zoom: 11,
    mapTypeId: mapApi.MapTypeId.ROADMAP,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false
  }

  try {
    const map = new mapApi.Map(mapEl.value, mapOptions)
    emit('update:map', map)
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  await initMap()
})

const addMarker = (marker: Marker) => {
  if (isNil(props.map)) {
    console.error('map should not null')
    return
  }

  const mapMarker = new markerApi.Marker({
    position: { lat: marker.lat, lng: marker.lng }
  })
  mapMarker.setMap(props.map)
}

const fetchMarkers = async () => {
  const response = await getMarkers()
  const markers = response.data
  markers.forEach((marker) => {
    addMarker(marker)
  })
}

watch(() => props.map, async () => {
  if (isNil(props.map)) { return }
  await fetchMarkers()
})
</script>

<template>
  <div ref="mapEl"></div>
</template>
