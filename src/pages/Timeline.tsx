import React, { useEffect, useState } from 'react';

import { fetchTimeseries } from '../api/currencies';
import CandlestickChart from '../components/Chart';

interface DailyData {
  datetime: string
  open: number
  high: number
  low: number
  close: number
}

type DailyDataTuple = [string, number, number, number, number];

const Timeline = () => {
  const [currencyData, setCurrencyData] = useState<DailyDataTuple[]>([]);

  const loadData = async () => {
    const data: DailyData[] | undefined = await fetchTimeseries('DAILY', {
      from: 'USD',
      to: 'EUR',
    });

    if (data != null) {
      const shortData: DailyDataTuple[] = data.map((record) => {
        const {
          datetime, open, high, low, close,
        } = record;
        return [datetime, low, open, close, high];
      });

      setCurrencyData(shortData);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  return <CandlestickChart data={currencyData} />;
};

export default Timeline;
