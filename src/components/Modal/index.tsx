import React from 'react';

import { symbols } from '../Card';
import Card from '../Card/styled';
import Select from '../Select';
import S from './styled';

const Modal = ({ cardData: { name, value }, onClose }: any) => {
  const symbolNative = symbols[name];

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (e.target.closest('#modal') === null) {
      onClose();
    }
  };
  return (
    <S.ModalWrapper onClick={handleClick}>
      <S.ModalContent id="modal">
        <div>
          <Card.Icon>{symbolNative}</Card.Icon>
          <p>
            1 USD = {value} {name}
            <p>
              1 {name} = {(1 / value).toFixed(5)} USD
            </p>
          </p>
        </div>
        <Select
          values={['EUR', 'RUB', 'BYN', 'AUD', 'CAD', 'UAH', 'PLN', 'CNY', 'GBP']}
          label="choose currency"
        />
      </S.ModalContent>
    </S.ModalWrapper>
  );
};

export default Modal;
