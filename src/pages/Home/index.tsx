import React, { useContext, useEffect, useState } from 'react';

import Quotes from '../../components/Quotes';
import { currencies as currenciesList } from '../../utils/constants';
import { LastUpdateContext } from '../../utils/Contexts';
import HomeWrapper from './styled';

async function fetchCurrencies(currencies: string[]) {
  const params = new URLSearchParams({
    app_id: '',
    symbols: currencies.join(','),
  }).toString();
  const response = await fetch(`https://openexchangerates.org/api/latest.json?${params}`);
  const data = await response.json();
  return data.rates;
}

const Home = () => {
  const [currencies, setCurrencies] = useState([]);
  const { setLastUpdate } = useContext(LastUpdateContext);

  useEffect(() => {
    const loadCurrencies = async () => {
      setCurrencies(await fetchCurrencies(currenciesList));
    };
    void loadCurrencies();
    const event = new Date();
    setLastUpdate(event.toLocaleTimeString('it-IT'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomeWrapper>
      <h3>1 USD:</h3>
      <Quotes quotes={currencies} />
    </HomeWrapper>
  );
};

export default Home;
