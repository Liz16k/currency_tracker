import React, { useEffect, useState } from 'react';

import { fetchBanks, type IBankPoint, mockSuggestions } from '../../services/geoapify';
import FilterSelect from './FilterSelect';
import MapComponent from './Map';

const BankCard = () => {
  const [currency, setCurrency] = useState('');
  const [data, setData] = useState<IBankPoint[] | []>([]);

  useEffect(() => {
    const loadData = async () => {
      const points = await fetchBanks();
      setData(points);
    };
    void loadData();
  }, []);

  useEffect(() => {
    if (currency !== '') {
      const filteredData = data.filter((point) => point.available_currencies.includes(currency));
      setData(filteredData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  return (
    <>
      <FilterSelect values={mockSuggestions} onChange={setCurrency} />
      <MapComponent points={data} />
    </>
  );
};

export default BankCard;
export type { IBankPoint };
