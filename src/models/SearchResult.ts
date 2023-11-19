export class SearchResult {
  placeId: string
  name: string
  formattedAddress: string
  coverUrl: string
  lat: number
  lng: number
  rating: number
  userRatingsTotal: number

  constructor (
    placeId: string,
    name: string,
    formattedAddress: string,
    coverUrl: string,
    lat: number,
    lng: number,
    rating: number,
    userRatingsTotal: number,
  ) {
    this.placeId = placeId
    this.name = name
    this.formattedAddress = formattedAddress
    this.coverUrl = coverUrl
    this.lat = lat
    this.lng = lng
    this.rating = rating
    this.userRatingsTotal = userRatingsTotal
  }
}
