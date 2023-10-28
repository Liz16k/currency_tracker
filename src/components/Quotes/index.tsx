import React, { type FC, type MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';

import Card from '../Card';
import CurrencyModal from './CurrencyModal';
import QuotesWrapper from './styled';
import { type CardData, type QuotesProps } from './types';

const Quotes: FC<QuotesProps> = ({ quotes }) => {
  const [modal, setModal] = useState<{ isShow: boolean, modalData: CardData }>({
    isShow: false,
    modalData: { name: '', value: 0 },
  });

  const modalClose = () => {
    setModal({ isShow: false, modalData: { name: '', value: 0 } });
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const { target } = e;
    const cardName = (target as HTMLElement).closest('.card')?.id;

    if (cardName !== undefined) {
      const entry = Object.entries(quotes).find((q) => q[0] === cardName);

      if (entry !== undefined) {
        const [name, value] = entry;
        const cardData = { name, value };
        setModal((prev) => ({ isShow: !prev.isShow, modalData: cardData }));
      }
    }
  };

  return (
    <>
      <QuotesWrapper onClick={handleClick}>
        {Object.entries(quotes).map(([name, value]) => (
          <Card name={name} value={value.toFixed(4)} key={name + value} />
        ))}
      </QuotesWrapper>
      {modal.isShow
        && createPortal(
          <CurrencyModal from={modal.modalData.name} onClose={modalClose} />,
          document.body,
        )}
    </>
  );
};

export default Quotes;
