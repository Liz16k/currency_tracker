import React, { useEffect, useState } from 'react';

import { fetchBanks, type IBankPoint } from '../../api/geoapify';
import MapComponent from './Map';

const BankCard = () => {
  const [data, setData] = useState<IBankPoint[] | []>([]);
  useEffect(() => {
    const loadData = async () => {
      const points = await fetchBanks();
      setData(() => points);
    };
    void loadData();
  }, []);
  return <MapComponent points={data} />;
};

export default BankCard;
export type { IBankPoint };
