/* eslint-disable consistent-return */

import { type Interval } from '../pages/Timeline/types';
import { type RawDailyData } from './types';

async function fetchCurrencies(currencies: string[]) {
  const params = new URLSearchParams({
    app_id: '',
    symbols: currencies.join(','),
  }).toString();
  const response = await fetch(`https://openexchangerates.org/api/latest.json?${params}`);
  const data = await response.json();
  return data.rates;
}

async function fetchCurrencyData(
  dataType: 'FX_DAILY' | 'FX_WEEKLY' | 'FX_MONTHLY' | 'CURRENCY_EXCHANGE_RATE',
  extraParams: {
    from_currency?: string
    to_currency?: string
    from_symbol?: string
    to_symbol?: string
    outputsize?: string
  },
) {
  try {
    const params = new URLSearchParams({
      apikey: '',
      function: dataType,
      ...extraParams,
    });
    const baseUrl = 'https://www.alphavantage.co/query?';
    const queryString = params.toString();
    const url = `${baseUrl}${queryString}`;
    const data = await fetch(url);
    return await data.json();
  } catch (error) {
    console.error(error);
  }
}

async function fetchExchangeRate({ from, to }: Record<string, string>) {
  try {
    const response = await fetchCurrencyData('CURRENCY_EXCHANGE_RATE', {
      from_currency: from,
      to_currency: to,
    });
    const rawData = await response['Realtime Currency Exchange Rate'];
    const {
      '1. From_Currency Code': fromCode,
      '3. To_Currency Code': toCode,
      '5. Exchange Rate': rate,
      '6. Last Refreshed': lastUpdate,
    } = rawData;
    const data: { fromCode: string, toCode: string, rate: number, lastUpdate: string } = {
      fromCode,
      toCode,
      rate,
      lastUpdate,
    };
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchTimeseries(
  interval: Interval,
  { from = 'USD', to = 'EUR' },
) {
  try {
    const prefMap: any = {
      DAILY: 'FX_DAILY',
      WEEKLY: 'FX_WEEKLY',
      MONTHLY: 'FX_MONTHLY',
    };
    const response = await fetchCurrencyData(prefMap[interval], {
      from_symbol: from,
      to_symbol: to,
    });
    const toSentenseCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

    const rawData: Record<string, RawDailyData> = await response[
      `Time Series FX (${toSentenseCase(interval)})`
    ];

    return Object.entries(rawData)
      .slice(0, 30)
      .map(([datetime, data]) => {
        const date = datetime.slice(5);
        const {
          '1. open': open, '2. high': high, '3. low': low, '4. close': close,
        } = data;
        return {
          datetime: date,
          low: +low,
          open: +open,
          close: +close,
          high: +high,
        };
      }).reverse();
  } catch (error) {
    console.error(error);
  }
}

export {
  fetchCurrencies, fetchCurrencyData, fetchExchangeRate, fetchTimeseries,
};
