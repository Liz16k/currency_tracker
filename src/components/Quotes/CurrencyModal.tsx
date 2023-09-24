import React, { type ChangeEvent, useState } from 'react';

import Modal from '../Modal';
import Select from '../Select';
import { Currency } from './styled';

const currenciest = ['EUR', 'AUD', 'CAD', 'UAH', 'PLN', 'CNY', 'GBP'];

const CurrencyModal = ({ onClose, from }: any) => {
  const [currentCurrency, setCurrentCurrency] = useState(currenciest[0]);
  const [exchangeValues, setExchangeValues] = useState<{ from: number, to?: number }>({ from: 0 });

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExchangeValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleChangeCurrency = (value: string): void => {
    setCurrentCurrency(value);
  };

  return (
    <Modal onClose={onClose}>
      <Currency>
        <h3>{from}</h3>
        <input type="number" value={exchangeValues.from} onChange={handleChangeValue} name="from" />
      </Currency>
      <p>to</p>
      <Currency>
        <Select
          onChange={handleChangeCurrency}
          currentValue={currentCurrency}
          values={currenciest}
        />
        <input type="number" value={exchangeValues.to} disabled name="to" placeholder="0" />
      </Currency>
    </Modal>
  );
};

export default CurrencyModal;
