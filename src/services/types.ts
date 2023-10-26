import { type DailyDataTuple, type ISelectedCurrencies } from '@pages/Timeline/types';
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
  formatted_address: string
  geometry: {
    location: ICoordinates
    viewport: {
      northeast: ICoordinates
      southwest: ICoordinates
    }
  }
  icon: string
  icon_background_color: string
  icon_mask_base_uri: string
  name: string
  place_id: string
  reference: string
  types: string[]
  available_currencies: string[]
}

interface ILoadChartDataProps {
  selectedCurrencies: ISelectedCurrencies
  setChartData: (data: DailyDataTuple[]) => void
  setLastUpdate: () => void
}

export type {
  IBankPoint, ICoordinates, IGeoData, ILoadChartDataProps,
  RawDailyData,
};
