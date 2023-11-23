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

export interface Trip {
  id: number;
  tripName: string;
  createdAt: string;
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
