import React, {
  type ChangeEvent, type FocusEvent, useEffect, useState,
} from 'react';

import { fetchExchangeRate } from '../../services/currencies';
import { currencies } from '../../utils/constants';
import Modal from '../Modal';
import Select from '../Select';
import { Currency } from './styled';

const CurrencyModal = ({ onClose, from }: any) => {
  const [toCurrency, setToCurrency] = useState(currencies[0]);
  const [exchangeValues, setExchangeValues] = useState<{ from: number | '', to: number | '' }>({
    from: '',
    to: '',
  });
  const [exchangeRate, setExchangeRate] = useState<{
    fromCode: string
    toCode: string
    rate: number
    lastUpdate: string
  }>({
    rate: 1,
    fromCode: from,
    toCode: from,
    lastUpdate: 'today',
  });

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'from') {
      const convertValue = +(+value * exchangeRate.rate).toFixed(4);
      setExchangeValues({ from: +value, to: convertValue });
    } else {
      const convertValue = +(+value / exchangeRate.rate).toFixed(4);
      setExchangeValues({ from: convertValue, to: +value });
    }
  };

  const handleFocusValue = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setExchangeValues((prevValues) => ({ ...prevValues, [name]: '' }));
  };

  useEffect(() => {
    const loadExchangeRate = async () => {
      const newExchangeRate = await fetchExchangeRate({ from, to: toCurrency });
      if (newExchangeRate != null) {
        setExchangeRate(newExchangeRate);
      }
    };
    void loadExchangeRate();
  }, [from, toCurrency]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setExchangeValues(({ from }) => ({
      from,
      to: +(+from * exchangeRate.rate).toFixed(4),
    }));
  }, [exchangeRate]);

  return (
    <Modal onClose={onClose}>
      <Currency>
        <h3>{from}</h3>
        <input
          type="number"
          value={exchangeValues.from}
          onChange={handleChangeValue}
          onFocus={handleFocusValue}
          placeholder="0"
          name="from"
        />
      </Currency>
      <p>→</p>
      <Currency>
        <Select
          onChange={(value) => {
            setToCurrency(value);
          }}
          currentValue={toCurrency}
          values={currencies}
        />
        <input
          type="number"
          value={exchangeValues.to}
          onChange={handleChangeValue}
          onFocus={handleFocusValue}
          name="to"
          placeholder="0"
        />
      </Currency>
    </Modal>
  );
};

export default CurrencyModal;
