import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

import Logo from './Logo';
import S from './styled';
import ThemeSwitcher from './ThemeSwitcher';

const NavBar = () => (
  <>
    <S.Nav>
      <Link to="/">
        <Logo width={38} height={39} />
      </Link>
      <S.NavRoutes>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/timeline">Timeline</NavLink>
        </li>
        <li>
          <NavLink to="/bank-card">Bank Card</NavLink>
        </li>
        <li>
          <NavLink to="/contacts">Contacts</NavLink>
        </li>
      </S.NavRoutes>
      <ThemeSwitcher />
    </S.Nav>
    <Outlet />
  </>
);

export default NavBar;
