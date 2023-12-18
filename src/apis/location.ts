import type { AxiosResponse } from 'axios'
import { defaultAxios } from '@/plugins/axios'

export interface Location {
  placeId: string;
  locationName: string;
  longitude: number;
  latitude: number;
  rating: number;
  coverImageUrl: string;
  totalReviews: number;
}

export interface BindLocationToTripResponse {
  Success: boolean;
}

export const bindLocationToTrip = async (tripId: number, location: Location) => {
  const response: AxiosResponse<BindLocationToTripResponse> = await defaultAxios.post(
    `/api/v1/trips/${tripId}/locations`,
    location,
  )

  return response.data.Success
}

export const unbindLocationFromTrip = async (tripId: number, locationId: number) => {
  const response: AxiosResponse<BindLocationToTripResponse> = await defaultAxios.delete(
    `/api/v1/trips/${tripId}/locations/${locationId}`,
  )

  return response.data.Success
}
