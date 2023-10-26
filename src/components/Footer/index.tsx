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

  const footerNavLinks = [
    { title: GENERAL.TITLE, links: [GENERAL.LINK1, GENERAL.LINK2] },
    { title: PRODUCT.TITLE, links: [PRODUCT.LINK1, PRODUCT.LINK2] },
    { title: COMMUNITY.TITLE, links: [COMMUNITY.LINK1, COMMUNITY.LINK2] },
  ];
  return (
    <>
      <FooterWrapper>
        <div>
          <h4>
            <Logo width={width} height={height} />
            {TITLE}
          </h4>
          <p>{DESCRIPTION}</p>
        </div>
        <nav>
          {footerNavLinks.map((category) => (
            <ul key={category.title}>
              <h4>{category.title}</h4>
              {category.links.map((link) => (
                <li key={link}>
                  <a href=".">{link}</a>
                </li>
              ))}
            </ul>
          ))}
        </nav>
      </FooterWrapper>
      <Copyright>{COPYRIGHT}</Copyright>
    </>
  );
};

export default Footer;
