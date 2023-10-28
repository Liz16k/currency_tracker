import React, { type FC, type MouseEvent } from 'react';

import { ModalContent, ModalWrapper } from './styled';
import type ModalProps from './types';

const Modal: FC<ModalProps> = ({ onClose, children }) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if ((e.target as HTMLElement).closest('#modal') === null) {
      onClose();
    }
  };
  return (
    <ModalWrapper onClick={handleClick}>
      <ModalContent id="modal">{children}</ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
