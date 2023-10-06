/* eslint-disable consistent-return */
type RawDailyData = Record<string, Record<string, string>>;

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
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const url = `https://www.alphavantage.co/query?${params}`;
    const data: any = await fetch(url);
    return data.json();
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
  interval: 'DAILY' | 'WEEKLY' | 'MONTHLY',
  { from = 'USD', to = 'EUR' },
) {
  try {
    const response = await fetchCurrencyData(`FX_${interval}`, {
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
      });
  } catch (error) {
    console.error(error);
  }
}

export { fetchCurrencyData, fetchExchangeRate, fetchTimeseries };
