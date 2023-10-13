import { type IBankPoint } from '../../services/types';

interface FilterSelectProps {
  onChange: (value: string) => void
  values: string[]
}

interface MapComponentProps {
  points: IBankPoint[]
}

export type { FilterSelectProps, MapComponentProps };
