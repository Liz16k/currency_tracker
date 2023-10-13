import { type IBankPoint } from '@services/types';

interface FilterSelectProps {
  onChange: (value: string) => void
  values: string[]
}

interface MapComponentProps {
  points: IBankPoint[]
}

interface MapState {
  currency: string
  data: IBankPoint[] | []
}

export type { FilterSelectProps, MapComponentProps, MapState };
