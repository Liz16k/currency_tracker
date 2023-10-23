import { LastUpdateContext } from '@contexts/index';
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import ErrorBoundary from './ErrorBoundary';
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
      <ErrorBoundary>
        <UpdateStatus lastUpdate={lastUpdate} />
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </>
  );
};

export default Layout;
