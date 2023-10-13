import React, { useContext, useEffect, useState } from 'react';

import Quotes from '../../components/Quotes';
import { fetchCurrencies } from '../../services/currencies';
import { currencies as currenciesList } from '../../utils/constants';
import { LastUpdateContext } from '../../utils/Contexts';
import HomeWrapper from './styled';

const Home: React.FC = () => {
  const [currencies, setCurrencies] = useState<Record<string, number>>({});
  const { setLastUpdate } = useContext(LastUpdateContext);

  useEffect(() => {
    const loadCurrencies = async () => {
      const fetchedCurrencies = await fetchCurrencies(currenciesList);
      setCurrencies(fetchedCurrencies);
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
