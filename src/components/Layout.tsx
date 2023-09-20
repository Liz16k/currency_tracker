import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import NavBar from './NavBar';
import UpdateStatus from './UpdateStatus';

const Layout = () => (
  <>
    <NavBar />
    <Header />
    <UpdateStatus lastUpdate="11:52" />
    <Outlet />
    <Footer />
  </>
);

export default Layout;
