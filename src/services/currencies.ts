/* eslint-disable consistent-return */

import { type Interval } from '@pages/Timeline/types';
import { ALPHAVENTAGE_KEY, OPENEXCHANGERATE_KEY } from '@utils/envrionment';
import memoizeOne from 'memoize-one';

import { type RawDailyData } from './types';

async function fetchCurrencies(currencies: string[]) {
  try {
    const params = new URLSearchParams({ symbols: currencies.join(',') });
    if (OPENEXCHANGERATE_KEY != null) params.set('app_id', OPENEXCHANGERATE_KEY);

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await fetch(`https://openexchangerates.org/api/latest.json?${params}`);
    const data = await response.json();
    return data?.rates;
  } catch (error) {
    throw new Error(`Failed to fetch currencies: ${(error as Error).message}`);
  }
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
    const params = new URLSearchParams({ function: dataType, ...extraParams });
    if (ALPHAVENTAGE_KEY != null) params.set('apikey', ALPHAVENTAGE_KEY);

    const baseUrl = 'https://www.alphavantage.co/query?';
    const queryString = params.toString();
    const url = `${baseUrl}${queryString}`;
    const memoizedFetch = memoizeOne(async (url) => fetch(url));
    const data = await memoizedFetch(url);
    return await data.json();
  } catch (error) {
    throw new Error(`Failed to fetch currency data: ${(error as Error).message}`);
  }
}

async function fetchExchangeRate({ from, to }: Record<string, string>) {
  try {
    const response = await fetchCurrencyData('CURRENCY_EXCHANGE_RATE', {
      from_currency: from,
      to_currency: to,
    });
    const rawData = await response?.['Realtime Currency Exchange Rate'];
    if (rawData == null) {
      throw new Error('Exchange rate data is empty');
    }
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
    throw new Error(`Error fetching exchange rate: ${(error as Error).message}`);
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

    const rawData: Record<string, RawDailyData> = await response?.[
      `Time Series FX (${toSentenseCase(interval)})`
    ];
    if (rawData == null) return [];
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
    throw new Error(`Failed to fetch data for chart: ${(error as Error).message}`);
  }
}

export {
  fetchCurrencies, fetchCurrencyData, fetchExchangeRate, fetchTimeseries,
};
