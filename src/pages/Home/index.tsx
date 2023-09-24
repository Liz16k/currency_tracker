import React, { useEffect, useState } from 'react';

import Quotes from '../../components/Quotes';
import HomeWrapper from './styled';

async function fetchCurrencies(currenciesList: string[]) {
  const params = new URLSearchParams({
    app_id: 'cf87a4edd0e246cbbdef0540756237ef',
    symbols: currenciesList.join(','),
  }).toString();
  const response = await fetch(`https://openexchangerates.org/api/latest.json?${params}`);
  const data = await response.json();
  return data.rates;
}

const Home = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const currenciesList = ['EUR', 'RUB', 'BYN', 'AUD', 'CAD', 'UAH', 'PLN', 'CNY', 'GBP'];
    const loadCurrencies = async () => {
      setCurrencies(await fetchCurrencies(currenciesList));
    };
    void loadCurrencies();
  }, []);
  return (
    <HomeWrapper>
      <h3>1 USD:</h3>
      <Quotes quotes={currencies} />
    </HomeWrapper>
  );
};

export default Home;
