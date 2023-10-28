/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/ban-types */
import CandlestickChart from '@components/Chart';
import Select from '@components/Select';
import { CHART_FORM_DATA, currencies, intervals } from '@config/constants';
import { LastUpdateContext, type LastUpdateContextType } from '@contexts/index';
import { loadChartData } from '@services/currencies';
import React, { type ChangeEvent, Component, type FormEvent } from 'react';

import {
  Input, SelectBar, TimelineWrapper,
} from './styled';
import SuccessMessage from './SuccessMsg';
import { type DailyDataTuple, type ISelectedCurrencies } from './types';

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

  handleSelectChange = (value: string, param: 'from' | 'to' | 'interval') => {
    this.setState((prevState) => ({
      selectedCurrencies: {
        ...prevState.selectedCurrencies,
        [param]: value,
      },
    }));
  };

  handleSelectChangeFrom = (value: string) => { this.handleSelectChange(value, 'from'); };

  handleSelectChangeTo = (value: string) => { this.handleSelectChange(value, 'to'); };

  handleSelectChangeInterval = (value: string) => { this.handleSelectChange(value, 'interval'); };

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
    const { setLastUpdate } = this;
    const setChartData = (data: DailyDataTuple[]) => {
      this.setState((prevState) => ({ ...prevState, chartData: data }));
    };

    await loadChartData({ selectedCurrencies, setChartData, setLastUpdate });
  }

  render() {
    const { DATETIME: { PLACEHOLDER, TITLE, PATTERN } } = CHART_FORM_DATA;
    const { selectedCurrencies, chartData, userData } = this.state;
    return (
      <TimelineWrapper>
        <SelectBar>
          <Select
            onChange={this.handleSelectChangeFrom}
            currentValue={selectedCurrencies.from}
            values={currencies}
            label="from:"
          />
          <Select
            onChange={this.handleSelectChangeTo}
            currentValue={selectedCurrencies.to}
            values={currencies}
            label="to"
          />
          <Select
            onChange={this.handleSelectChangeInterval}
            currentValue={selectedCurrencies.interval}
            values={intervals}
            label="interval"
          />
        </SelectBar>
        <CandlestickChart data={chartData} />
        <SuccessMessage
          subscribe={this.subscribeOnChartBuilt}
          unsubscribe={this.unsubscribeFromChartBuilt}
        />
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="datetime">Datetime:</label>
            <Input
              id="datetime"
              name="datetime"
              value={userData.datetime}
              onChange={this.handleInputChange}
              placeholder={PLACEHOLDER}
              title={TITLE}
              pattern={PATTERN}
              maxLength={5}
            />
          </div>
          <div>
            <label htmlFor="open">Open:</label>
            <Input
              id="open"
              name="open"
              value={userData.open}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="close">Close:</label>
            <Input
              id="close"
              name="close"
              value={userData.close}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="low">Low:</label>
            <Input
              id="low"
              name="low"
              value={userData.low}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="high">High:</label>
            <Input
              id="high"
              name="high"
              value={userData.high}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </TimelineWrapper>
    );
  }
}

Timeline.contextType = LastUpdateContext;

export default Timeline;
