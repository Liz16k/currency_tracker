import { type LngLatLike } from 'mapbox-gl';

type RawDailyData = Record<string, Record<string, string>>;

interface IGeoData {
  city: string
  country: string
  location: LngLatLike
}

interface ICoordinates {
  lat: number
  lng: number
}
interface IBankPoint {
  geometry: {
    coordinates: LngLatLike
  }
  properties: {
    name: string
    formatted: string
  }
  available_currencies: string[]
}

export type {
  IBankPoint, ICoordinates, IGeoData, RawDailyData,
};
