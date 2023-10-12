/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useContext, useEffect, useState } from 'react';

import { fetchTimeseries } from '../../api/currencies';
import CandlestickChart from '../../components/Chart';
import Select from '../../components/Select/index';
import currenciest from '../../constants';
import { LastUpdateContext } from '../../Contexts';
import S from './styled';

interface DailyData {
  datetime: string
  low: number
  open: number
  close: number
  high: number
}

type DailyDataTuple = [string, number, number, number, number];
const intervals = ['DAILY', 'WEEKLY', 'MONTHLY'];

const Timeline = () => {
  const [chartData, setChartData] = useState<DailyDataTuple[]>([]);
  const [userData, setUserData] = useState<Record<string, string>>({
    datetime: '', open: '', close: '', low: '', high: '',
  });
  const [{ from, to, interval }, setSelectedCurrencies] = useState<{
    from: string
    to: string
    interval: 'DAILY' | 'WEEKLY' | 'MONTHLY'
  }>({
    from: currenciest[0],
    to: currenciest[1],
    interval: intervals[0] as 'DAILY' | 'WEEKLY' | 'MONTHLY',
  });

  const { setLastUpdate } = useContext(LastUpdateContext);

  useEffect(() => {
    const loadData = async () => {
      const data: DailyData[] | undefined = await fetchTimeseries(interval, {
        from,
        to,
      });

      if (data != null) {
        const shortData: DailyDataTuple[] = data.map((record) => {
          const {
            datetime, low, open, close, high,
          } = record;
          return [datetime, low, open, close, high];
        });

        setChartData(shortData);
      }
    };
    void loadData();

    const event = new Date();
    setLastUpdate(event.toLocaleTimeString('it-IT'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, interval]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newDataPoint: DailyDataTuple = [
      userData.datetime,
      +userData.low,
      +userData.open,
      +userData.close,
      +userData.high,
    ];

    const newChartData: DailyDataTuple[] = [...chartData.slice(1), newDataPoint];

    setChartData(newChartData);
    setUserData({
      datetime: '', open: '', close: '', low: '', high: '',
    });
  };

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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Datetime:</label>
          <S.Input
            name="datetime"
            value={userData.datetime}
            onChange={handleInputChange}
            placeholder="01-01"
            title="Введите дату в формате xx-xx (где x - число от 0 до 9)"
            pattern="^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$"
            maxLength={5}
          />
        </div>
        <div>
          <label>Open:</label>
          <S.Input
            name="open"
            value={userData.open}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Close:</label>
          <S.Input
            name="close"
            value={userData.close}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Low:</label>
          <S.Input
            name="low"
            value={userData.low}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>High:</label>
          <S.Input
            name="high"
            value={userData.high}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </S.TimelineWrapper>
  );
};

export default Timeline;
