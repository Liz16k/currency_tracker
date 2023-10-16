import React, { type MouseEvent } from 'react';

import S from './styled';
import type ModalProps from './types';

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if ((e.target as HTMLElement).closest('#modal') === null) {
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
