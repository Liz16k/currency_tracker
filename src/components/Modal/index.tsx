import React from 'react';

import S from './styled';

const Modal = ({ onClose, children }: any) => {
  const handleClick = (e: any) => {
    e.stopPropagation();
    if (e.target.closest('#modal') === null) {
      onClose();
    }
  };
  return (
    <S.ModalWrapper onClick={handleClick}>
      <S.ModalContent id="modal">{children}</S.ModalContent>
    </S.ModalWrapper>
  );
};

export default Modal;
