import Logo from '@assets/Logo';
import { HEADER } from '@config/constants';
import logoSize from '@config/index';
import React from 'react';

import { Caption, HeaderWrapper, Quote } from './styled';

const Header = () => {
  const { SUBTITLE, QUOTE, TITLE } = HEADER;
  const { headerSize: { width, height } } = logoSize;
  return (
    <HeaderWrapper>
      <Caption>
        <h3>{SUBTITLE}</h3>
        <h2>{TITLE}</h2>
        <Quote>{QUOTE}</Quote>
      </Caption>
      <Logo width={width} height={height} />
    </HeaderWrapper>
  );
};

export default Header;
