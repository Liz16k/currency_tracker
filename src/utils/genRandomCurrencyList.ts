import { currencies as currenciesList } from './constants';

const genRandomCurrencyList = (currencies = currenciesList) => {
  const randomCount = Math.floor(Math.random() * (currencies.length + 1));
  const shuffledCurrencies = currencies.sort(() => Math.random() - 0.5);
  return shuffledCurrencies.slice(0, randomCount);
};

export default genRandomCurrencyList;
