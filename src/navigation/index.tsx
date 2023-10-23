import Layout from '@components/Layout';
import { PAGE_NOT_FOUND } from '@config/constants';
import BankCard from '@pages/BankCard';
import Contacts from '@pages/Contact';
import Home from '@pages/Home';
import Timeline from '@pages/Timeline';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const Navigation = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/bank-card" element={<BankCard />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="*" element={<h1>{PAGE_NOT_FOUND}</h1>} />
    </Route>
  </Routes>
);

export default Navigation;
