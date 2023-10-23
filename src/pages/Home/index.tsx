import Quotes from '@components/Quotes';
import { currencies as currenciesList, LOADING } from '@config/constants';
import { fetchCurrencies } from '@services/currencies';
import { useQuery } from '@tanstack/react-query';
import { LastUpdateContext } from '@utils/Contexts';
import { type LastUpdateContextType } from '@utils/Contexts';
import React, { useContext, useEffect } from 'react';

import HomeWrapper from './styled';

const Home: React.FC = () => {
  const { setLastUpdate }: LastUpdateContextType = useContext(LastUpdateContext);

  const {
    dataUpdatedAt,
    isLoading,
    data,
  } = useQuery({
    queryKey: ['currencies', currenciesList],
    queryFn: async () => fetchCurrencies(currenciesList),
    retryDelay: (attempt) => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    staleTime: 1e3 * 60,
  });

  useEffect(() => {
    const event = new Date(dataUpdatedAt);
    setLastUpdate(event.toLocaleTimeString('it-IT'));
  }, [dataUpdatedAt, setLastUpdate]);

  return (
    <HomeWrapper>
      { isLoading ? <h3>{LOADING}</h3> : <><h3>1 USD:</h3><Quotes quotes={data} /></>}
    </HomeWrapper>
  );
};
export default Home;
