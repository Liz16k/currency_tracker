const NAVIGATION_LINKS = {
  HOME: 'Home',
  TIMELINE: 'Timeline',
  BANK_CARD: 'Bank Card',
  CONTACTS: 'Contacts',
};

const HEADER = {
  TITLE: 'Tracker',
  SUBTITLE: 'Modsen Currency',
  QUOTE: 'Quotes for the dollar and other international currencies.',
};

const FOOTER = {
  TITLE: 'Modsen Currency Tracker',
  DESCRIPTION: 'Since then, the company has grown organically to. '
  + 'Starsup is the world\'s largest trading platform, with $12 billion worth of currency '
  + 'trading and 500,000 tickets sold daily to tens of thousands of traders worldwide.',
  COPYRIGHT: 'Startsup © 2023-2024, All Rights Reserved',
  GROUPS: {
    GENERAL: {
      TITLE: 'General',
      LINK1: 'Market',
      LINK2: 'Services',
    },
    PRODUCT: {
      TITLE: 'Product',
      LINK1: 'Sparks',
      LINK2: 'Snaps',
    },
    COMMUNITY: {
      TITLE: 'Community',
      LINK1: 'Ideas',
      LINK2: 'Streams',
    },
  },
};

const CONTACTS = {
  TITLE: 'Contact us',
  ADDRESS_PREFIX: 'Based in',
  EMAIL_PREFIX: 'Contact',
  FORM_DATA: {
    PLACEHOLDERS: {
      NAME: 'Full Name',
      EMAIL: 'E-mail',
      MSG: 'Your message',
    },
    BUTTON: 'Contact us',
  },
};

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

const prefMap: any = {
  DAILY: 'FX_DAILY',
  WEEKLY: 'FX_WEEKLY',
  MONTHLY: 'FX_MONTHLY',
};

const ERRORS_MSG = {
  boundary: 'Uncaught error:',
  geolocation: 'Error fetching place ID:',
  placeId: 'Error fetching place ID:',
  banks: 'Error fetching banks:',
  chartData: 'Failed to fetch data for chart:',
  exchangeRate: 'Error fetching exchange rate:',
  exchangeRateIsNull: 'Exchange rate data is empty',
  currencyData: 'Failed to fetch currency data:',
  currencies: 'Failed to fetch currencies:',
};

const PAGE_NOT_FOUND = 'Page not Found';
const LAST_UPDATED = 'Last updated at';
const SUCCESS_MSG = 'График успешно построен!';
const LOADING = 'Loading...';

const CHART_FORM_DATA = {
  DATETIME: {
    TITLE: 'Введите дату в формате xx-xx (где x - число от 0 до 9)',
    PATTERN: '^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$',
    PLACEHOLDER: '01-01',
  },
};

export {
  CHART_FORM_DATA, CONTACTS,
  currencies, ERRORS_MSG, FOOTER,
  HEADER, intervals, LAST_UPDATED,
  LOADING, NAVIGATION_LINKS,
  PAGE_NOT_FOUND, prefMap,
  SUCCESS_MSG, symbols,
};
