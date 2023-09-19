import React from 'react';

import Logo from '../NavBar/Logo';
import S from './styled';

const Footer = () => (
  <>
    <S.FooterWrapper>
      <div>
        <h4>
          <Logo width={28} height={29} />
          Modsen Currency Tracker
        </h4>
        <p>
          Since then, the company has grown organically to. Starsup is the world&apos;s largest
          trading platform, with $12 billion worth of currency trading and 500,000 tickets sold
          daily to tens of thousands of traders worldwide.
        </p>
      </div>
      <nav>
        <ul>
          <h4>General</h4>
          <li>
            <a href=".">Market</a>
          </li>
          <li>
            <a href=".">Services</a>
          </li>
        </ul>
        <ul>
          <h4>Product</h4>
          <li>
            <a href=".">Sparks</a>
          </li>
          <li>
            <a href=".">Snaps</a>
          </li>
        </ul>
        <ul>
          <h4>Community</h4>
          <li>
            <a href=".">Ideas</a>
          </li>
          <li>
            <a href=".">Streams</a>
          </li>
        </ul>
      </nav>
    </S.FooterWrapper>
    <S.Copyright>Startsup © 2023-2024, All Rights Reserved</S.Copyright>
  </>
);

export default Footer;
