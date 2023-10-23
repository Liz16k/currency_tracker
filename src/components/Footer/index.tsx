import Logo from '@assets/Logo';
import { FOOTER } from '@config/constants';
import logoSize from '@config/index';
import React from 'react';

import { Copyright, FooterWrapper } from './styled';

const Footer = () => {
  const {
    COPYRIGHT, DESCRIPTION, GROUPS: { GENERAL, COMMUNITY, PRODUCT }, TITLE,
  } = FOOTER;
  const { footerSize: { width, height } } = logoSize;
  return (
    <>
      <FooterWrapper>
        <div>
          <h4>
            <Logo width={width} height={height} />
            {TITLE}
          </h4>
          <p>
            {DESCRIPTION}
          </p>
        </div>
        <nav>
          <ul>
            <h4>{GENERAL.TITLE}</h4>
            <li>
              <a href=".">{GENERAL.LINK1}</a>
            </li>
            <li>
              <a href=".">{GENERAL.LINK2}</a>
            </li>
          </ul>
          <ul>
            <h4>{PRODUCT.TITLE}</h4>
            <li>
              <a href=".">{PRODUCT.LINK1}</a>
            </li>
            <li>
              <a href=".">{PRODUCT.LINK2}</a>
            </li>
          </ul>
          <ul>
            <h4>{COMMUNITY.TITLE}</h4>
            <li>
              <a href=".">{COMMUNITY.LINK1}</a>
            </li>
            <li>
              <a href=".">{COMMUNITY.LINK2}</a>
            </li>
          </ul>
        </nav>
      </FooterWrapper>
      <Copyright>{COPYRIGHT}</Copyright>
    </>
  );
};

export default Footer;
