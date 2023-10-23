import { currencies as currenciesList } from './constants';

const generateRandomCurrencyList = (currencies = currenciesList) => {
  const randomCount = Math.floor(Math.random() * (currencies.length + 1));
  const shuffledCurrencies = currencies.sort(() => Math.random() - 0.5);
  return shuffledCurrencies.slice(0, randomCount);
};

const generateSuccessReceiptMessage = (name: string, email: string) => `We get your message, ${name}, thank you!\nYou are getting our response on email: ${email}`;

export { generateRandomCurrencyList, generateSuccessReceiptMessage };
