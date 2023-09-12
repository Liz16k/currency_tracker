import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => (
  <>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/timeline">Timeline</Link>
        </li>
        <li>
          <Link to="/bank-card">Bank Card</Link>
        </li>
        <li>
          <Link to="/contacts">Contacts</Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </>
);

export default Layout;
