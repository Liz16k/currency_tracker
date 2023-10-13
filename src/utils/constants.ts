const currencies = ['EUR', 'AUD', 'CAD', 'UAH', 'PLN', 'CNY', 'GBP'];

const symbols: Record<string, string> = {
  RUB: '₽',
  BYN: 'Br',
  PLN: 'zł',
  AUD: '$',
  CAD: '$',
  EUR: '€',
  UAH: '₴',
  CNY: '¥',
  GBP: '£',
};

const intervals = ['DAILY', 'WEEKLY', 'MONTHLY'];

export { currencies, intervals, symbols };
