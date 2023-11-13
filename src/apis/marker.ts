export interface Marker {
  id: number;
  lat: number;
  lng: number;
}

export const getMarkers = async (): Promise<{data: Marker[]}> => {
  return {
    data: [
      { id: 1, lat: 25.0425, lng: 121.5468 },
      { id: 2, lat: 25.1023, lng: 121.3321 },
      { id: 3, lat: 25.1123, lng: 121.3221 },
      { id: 4, lat: 25.0423, lng: 121.54271 },
      { id: 5, lat: 25.1423, lng: 121.522 },
      { id: 6, lat: 25.1623, lng: 121.4922 },
      { id: 7, lat: 25.0013, lng: 121.5122 },
      { id: 7, lat: 25.0001, lng: 121.5091 },
      { id: 8, lat: 25.1283, lng: 121.5471 }
    ]
  }
}
