/* eslint-disable consistent-return */

import { ERRORS_MSG, prefMap } from '@config/constants';
import {
  ALPHAVENTAGE_KEY, ALPHAVENTAGE_URL, OPENEXCHANGERATE_KEY, OPENEXCHANGERATE_URL,
} from '@config/environment';
import { type Interval } from '@pages/Timeline/types';
import memoizeOne from 'memoize-one';

import { type RawDailyData } from './types';

async function fetchCurrencies(currencies: string[]) {
  try {
    const params = new URLSearchParams({ symbols: currencies.join(',') });
    if (OPENEXCHANGERATE_KEY != null) params.set('app_id', OPENEXCHANGERATE_KEY);

    const response = await fetch(`${OPENEXCHANGERATE_URL}${params.toString()}`);
    const data = await response.json();
    return data?.rates;
  } catch (error) {
    throw new Error([ERRORS_MSG.currencies, (error as Error).message].join('\n'));
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

    const baseUrl = ALPHAVENTAGE_URL;
    const url = `${baseUrl}${params.toString()}`;

    const memoizedFetch = memoizeOne(async (url) => fetch(url));

    const data = await memoizedFetch(url);
    return await data.json();
  } catch (error) {
    throw new Error([ERRORS_MSG.currencyData, (error as Error).message].join('\n'));
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
      throw new Error(ERRORS_MSG.exchangeRateIsNull);
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
    throw new Error([ERRORS_MSG.exchangeRate, (error as Error).message].join('\n'));
  }
}

async function fetchTimeseries(
  interval: Interval,
  { from = 'USD', to = 'EUR' },
) {
  try {
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
    throw new Error([ERRORS_MSG.chartData, (error as Error).message].join('\n'));
  }
}

export {
  fetchCurrencies, fetchCurrencyData, fetchExchangeRate, fetchTimeseries,
};
