import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import Card from '../Card';
import Modal from '../Modal';
import QuotesWrapper from './styled';

const Quotes = ({ quotes }: any) => {
  const [modal, setModal] = useState({ isShow: false, modalData: { name: '', value: 0 } });

  const modalClose = () => {
    setModal({ isShow: false, modalData: { name: '', value: 0 } });
  };

  const handleClick = (e: any) => {
    const cardName = e.target.closest('.card')?.id;
    if (cardName !== undefined) {
      const [name, value]: any = Object.entries(quotes).find((q) => q[0] === cardName);
      const cardData = { name, value };
      setModal({ isShow: !modal.isShow, modalData: cardData });
    }
  };

  return (
    <>
      <QuotesWrapper onClick={handleClick}>
        {Object.entries(quotes).map((q: any) => {
          const [name, value] = q;
          return <Card name={name} value={value.toFixed(4)} key={name + value} />;
        })}
      </QuotesWrapper>
      {modal.isShow
        && createPortal(<Modal cardData={modal.modalData} onClose={modalClose} />, document.body)}
    </>
  );
};

export default Quotes;
