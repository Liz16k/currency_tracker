/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/ban-types */
import CandlestickChart from '@components/Chart';
import ErrorBoundary from '@components/ErrorBoundary';
import Select from '@components/Select';
import { fetchTimeseries } from '@services/currencies';
import { currencies, intervals } from '@utils/constants';
import { LastUpdateContext, type LastUpdateContextType } from '@utils/Contexts';
import React, { type ChangeEvent, Component, type FormEvent } from 'react';

import S from './styled';
import SuccessMessage from './SuccessMsg';
import { type DailyData, type DailyDataTuple, type ISelectedCurrencies } from './types';

interface TimelineState {
  chartData: DailyDataTuple[]
  userData: {
    datetime: string
    open: string
    close: string
    low: string
    high: string
  }
  selectedCurrencies: ISelectedCurrencies
}

class Timeline extends Component<{}, TimelineState> {
  userCandleCount = 0;

  onChartSubs: Array<() => void> = [];

  constructor(props: {}) {
    super(props);
    this.state = {
      chartData: [],
      userData: {
        datetime: '', open: '', close: '', low: '', high: '',
      },
      selectedCurrencies: {
        from: currencies[0],
        to: currencies[1],
        interval: intervals[0],
      },
    };
  }

  componentDidMount() {
    void this.loadData();
  }

  componentDidUpdate(prevProps: {}, prevState: TimelineState) {
    const { selectedCurrencies: { from, to, interval } } = this.state;
    const { from: prevFrom, to: prevTo, interval: prevInterval } = prevState.selectedCurrencies;

    if (prevFrom !== from || prevTo !== to || prevInterval !== interval) {
      void this.loadData();
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      userData: { ...prevState.userData, [name]: value },
    }));
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.setState((prevState) => {
      const {
        datetime, low, open, close, high,
      } = prevState.userData;

      const newDataPoint: DailyDataTuple = [
        datetime,
        +low,
        +open,
        +close,
        +high,
      ];

      const newChartData: DailyDataTuple[] = [...prevState.chartData.slice(1), newDataPoint];
      this.userCandleCount += 1;

      if (this.userCandleCount === 2) {
        this.notifyChartBuilt();
        this.userCandleCount = 0;
      }

      return {
        chartData: newChartData,
        userData: {
          datetime: '',
          open: '',
          close: '',
          low: '',
          high: '',
        },
      };
    });
  };

  setLastUpdate = (): void => {
    const { setLastUpdate } = this.context as LastUpdateContextType;
    setLastUpdate((new Date()).toLocaleTimeString('it-IT'));
  };

  subscribeOnChartBuilt = (callback: () => void) => {
    this.onChartSubs.push(callback);
  };

  unsubscribeFromChartBuilt = (callback: () => void) => {
    this.onChartSubs = this.onChartSubs.filter((subscriber) => subscriber !== callback);
  };

  notifyChartBuilt = () => {
    this.onChartSubs.forEach((subscriber: () => void) => { subscriber(); });
  };

  async loadData() {
    const { selectedCurrencies } = this.state;
    try {
      const data: DailyData[] | undefined = await fetchTimeseries(
        selectedCurrencies.interval,
        {
          from: selectedCurrencies.from,
          to: selectedCurrencies.to,
        },
      );

      if (data != null) {
        const shortData: DailyDataTuple[] = data.map((record) => {
          const {
            datetime, low, open, close, high,
          } = record;
          return [datetime, low, open, close, high];
        });

        this.setState({ chartData: shortData });
        this.setLastUpdate();
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { selectedCurrencies, chartData, userData } = this.state;
    return (
      <S.TimelineWrapper>
        <S.SelectBar>
          <div>
            from:
            <Select
              onChange={(value) => {
                this.setState((prevState) => ({
                  selectedCurrencies: {
                    ...prevState.selectedCurrencies,
                    from: value,
                  },
                }));
              }}
              currentValue={selectedCurrencies.from}
              values={currencies}
            />
          </div>
          <div>
            to:
            <Select
              onChange={(value) => {
                this.setState((prevState) => ({
                  selectedCurrencies: {
                    ...prevState.selectedCurrencies,
                    to: value,
                  },
                }));
              }}
              currentValue={selectedCurrencies.to}
              values={currencies}
            />
          </div>
          <div>
            Interval
            <Select
              onChange={(value) => {
                this.setState((prevState) => ({
                  selectedCurrencies: {
                    ...prevState.selectedCurrencies,
                    interval: value as 'DAILY' | 'WEEKLY' | 'MONTHLY',
                  },
                }));
              }}
              currentValue={selectedCurrencies.interval}
              values={intervals}
            />
          </div>
        </S.SelectBar>
        <ErrorBoundary fallbackUI={<h1>Chart cannot be drawn</h1>}>
          <CandlestickChart data={chartData} />
        </ErrorBoundary>
        <SuccessMessage
          subscribe={this.subscribeOnChartBuilt}
          unsubscribe={this.unsubscribeFromChartBuilt}
        />
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="datetime">Datetime:</label>
            <S.Input
              id="datetime"
              name="datetime"
              value={userData.datetime}
              onChange={this.handleInputChange}
              placeholder="01-01"
              title="Введите дату в формате xx-xx (где x - число от 0 до 9)"
              pattern="^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$"
              maxLength={5}
            />
          </div>
          <div>
            <label htmlFor="open">Open:</label>
            <S.Input
              id="open"
              name="open"
              value={userData.open}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="close">Close:</label>
            <S.Input
              id="close"
              name="close"
              value={userData.close}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="low">Low:</label>
            <S.Input
              id="low"
              name="low"
              value={userData.low}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="high">High:</label>
            <S.Input
              id="high"
              name="high"
              value={userData.high}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </S.TimelineWrapper>
    );
  }
}

Timeline.contextType = LastUpdateContext;

export default Timeline;
