import React from 'react';

import Logo from '../NavBar/Logo';
import S from './style';

const Header = () => (
  <S.HeaderWrapper>
    <S.Caption>
      <h3>Modsen Currency</h3>
      <h2>Tracker</h2>
      <S.Quote>Quotes for the dollar and other international currencies.</S.Quote>
    </S.Caption>
    <Logo width={252} height={288} />
  </S.HeaderWrapper>
);

export default Header;
