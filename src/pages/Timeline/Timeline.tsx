/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';

import { fetchTimeseries } from '../../api/currencies';
import CandlestickChart from '../../components/Chart';
import Select from '../../components/Select/index';
import currenciest from '../../constants';
import S from './styled';

interface DailyData {
  datetime: string
  open: number
  high: number
  low: number
  close: number
}

type DailyDataTuple = [string, number, number, number, number];
const intervals = ['DAILY', 'WEEKLY', 'MONTHLY'];

const Timeline = () => {
  const [chartData, setChartData] = useState<DailyDataTuple[]>([]);
  const [{ from, to, interval }, setSelectedCurrencies] = useState<{
    from: string
    to: string
    interval: 'DAILY' | 'WEEKLY' | 'MONTHLY'
  }>({
    from: currenciest[0],
    to: currenciest[1],
    interval: intervals[0] as 'DAILY' | 'WEEKLY' | 'MONTHLY',
  });

  useEffect(() => {
    const loadData = async () => {
      const data: DailyData[] | undefined = await fetchTimeseries(interval, {
        from,
        to,
      });

      if (data != null) {
        const shortData: DailyDataTuple[] = data.map((record) => {
          const {
            datetime, open, high, low, close,
          } = record;
          return [datetime, low, open, close, high];
        });

        setChartData(shortData);
      }
    };
    void loadData();
  }, [from, to, interval]);

  return (
    <S.TimelineWrapper>
      <S.SelectBar>
        <div>
          from:
          <Select
            onChange={(value) => {
              setSelectedCurrencies(({ to, interval }) => ({ to, interval, from: value }));
            }}
            currentValue={from}
            values={currenciest}
          />
        </div>
        <div>
          to:
          <Select
            onChange={(value) => {
              setSelectedCurrencies(({ from, interval }) => ({ from, interval, to: value }));
            }}
            currentValue={to}
            values={currenciest}
          />
        </div>
        <div>
          Interval
          <Select
            onChange={(value) => {
              setSelectedCurrencies(({ from, to }) => ({
                from,
                to,
                interval: value as 'DAILY' | 'WEEKLY' | 'MONTHLY',
              }));
            }}
            currentValue={interval}
            values={intervals}
          />
        </div>
      </S.SelectBar>

      <CandlestickChart data={chartData} />
    </S.TimelineWrapper>
  );
};

export default Timeline;
