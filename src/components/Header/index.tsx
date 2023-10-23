import { HEADER } from '@utils/constants';
import React from 'react';

import Logo from '../../assets/Logo';
import { Caption, HeaderWrapper, Quote } from './styled';

const Header = () => {
  const { SUBTITLE, QUOTE, TITLE } = HEADER;
  return (
    <HeaderWrapper>
      <Caption>
        <h3>{SUBTITLE}</h3>
        <h2>{TITLE}</h2>
        <Quote>{QUOTE}</Quote>
      </Caption>
      <Logo width={252} height={288} />
    </HeaderWrapper>
  );
};

export default Header;
