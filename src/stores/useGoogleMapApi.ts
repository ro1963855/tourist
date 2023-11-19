import { isNil } from 'lodash-es'
import { Loader } from '@googlemaps/js-api-loader'

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  version: 'weekly',
  libraries: ['places'],
  language: 'zh-TW'
})

let mapsApi: google.maps.MapsLibrary | null = null
export const getMapsApi = async () => {
  if (isNil(mapsApi)) {
    mapsApi = await loader.importLibrary('maps')
  }

  return mapsApi
}

let markerApi: google.maps.MarkerLibrary | null = null
export const getMarkerApiApi = async () => {
  if (isNil(markerApi)) {
    markerApi = await loader.importLibrary('marker')
  }

  return markerApi
}

let placeApi: google.maps.PlacesLibrary | null = null
export const getPlacesApiApi = async () => {
  if (isNil(placeApi)) {
    placeApi = await loader.importLibrary('places')
  }

  return placeApi
}
