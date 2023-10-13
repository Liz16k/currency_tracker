import { type intervals } from '../../utils/constants';

interface DailyData {
  datetime: string
  low: number
  open: number
  close: number
  high: number
}

interface ISelectedCurrencies {
  from: string
  to: string
  interval: Interval
}

type DailyDataTuple = [string, number, number, number, number];

type Interval = typeof intervals[number];

export type {
  DailyData, DailyDataTuple, Interval, ISelectedCurrencies,
};
