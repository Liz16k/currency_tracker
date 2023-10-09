import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { LastUpdateContext } from '../Contexts';
import Footer from './Footer';
import Header from './Header';
import NavBar from './NavBar';
import UpdateStatus from './UpdateStatus';

const Layout = () => {
  const { lastUpdate } = useContext(LastUpdateContext);
  return (
    <>
      <NavBar />
      <Header />
      <UpdateStatus lastUpdate={lastUpdate} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
