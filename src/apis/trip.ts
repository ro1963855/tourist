import type { AxiosResponse } from 'axios'
import { defaultAxios } from '@/plugins/axios'

interface GetTripsResponse {
  ID: number;
  TripName: string;
  CreatedAt: string;
}

interface CreateTripResponse {
  TripID: number;
}

interface GetTripDetailResponse {
  ID: number;
  TripName: string;
  Locations: {
    LocationID: number;
    LocationName: string;
    Longitude: number;
    Latitude: number;
    Rating: number;
    CoverImageURL: string;
    TotalReviews: number;
    Tags: {
      TagID: number;
      TagName: string;
      Color: string;
    }[];
  }[];
}

export interface Trip {
  id: number;
  tripName: string;
  createdAt: string;
}

export interface TripDetail {
  id: number;
  tripName: string;
  locations: {
    locationID: number;
    locationName: string;
    longitude: number;
    latitude: number;
    rating: number;
    coverImageURL: string;
    totalReviews: number;
    tags: {
      tagID: number;
      tagName: string;
      color: string;
    }[];
  }[];
}

export const getTrips = async () => {
  const response: AxiosResponse<GetTripsResponse[]> = await defaultAxios.get('/api/v1/trips')
  return response.data.map((trip) => ({
    id: trip.ID,
    tripName: trip.TripName,
    createdAt: trip.CreatedAt,
  })) as Trip[]
}

export const createTrip = async (tripName: string) => {
  const response: AxiosResponse<CreateTripResponse> = await defaultAxios.post('/api/v1/trips', { tripName })
  return { tripID: response.data.TripID }
}

export const getTripDetail = async (tripId: number) => {
  const response: AxiosResponse<GetTripDetailResponse> = await defaultAxios.get(`/api/v1/trips/${tripId}`)

  return {
    id: response.data.ID,
    tripName: response.data.TripName,
    locations: response.data.Locations.map((location) => ({
      locationID: location.LocationID,
      locationName: location.LocationName,
      longitude: location.Longitude,
      latitude: location.Latitude,
      rating: location.Rating,
      coverImageURL: location.CoverImageURL,
      totalReviews: location.TotalReviews,
      tags: location.Tags.map((tag) => ({
        tagID: tag.TagID,
        tagName: tag.TagName,
        color: tag.Color,
      })),
    })),
  } as TripDetail
}
