import { HEADER } from '@utils/constants';
import React from 'react';

import Logo from '../../assets/Logo';
import S from './style';

const Header = () => {
  const { SUBTITLE, QUOTE, TITLE } = HEADER;
  return (
    <S.HeaderWrapper>
      <S.Caption>
        <h3>{SUBTITLE}</h3>
        <h2>{TITLE}</h2>
        <S.Quote>{QUOTE}</S.Quote>
      </S.Caption>
      <Logo width={252} height={288} />
    </S.HeaderWrapper>
  );
};

export default Header;
