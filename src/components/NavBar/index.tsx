import { NAVIGATION_LINKS } from '@utils/constants';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Logo from './Logo';
import S from './styled';
import ThemeSwitcher from './ThemeSwitcher';

const NavBar = () => {
  const {
    HOME, TIMELINE, BANK_CARD, CONTACTS,
  } = NAVIGATION_LINKS;
  return (
    <S.Nav>
      <Link to="/">
        <Logo width={38} height={39} />
      </Link>
      <S.NavRoutes>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            {HOME}
          </NavLink>
        </li>
        <li>
          <NavLink to="/timeline">{TIMELINE}</NavLink>
        </li>
        <li>
          <NavLink to="/bank-card">{BANK_CARD}</NavLink>
        </li>
        <li>
          <NavLink to="/contacts">{CONTACTS}</NavLink>
        </li>
      </S.NavRoutes>
      <ThemeSwitcher />
    </S.Nav>
  );
};

export default NavBar;
