import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/NavBar';
import BankCard from './pages/BankCard';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import Timeline from './pages/Timeline';

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/bank-card" element={<BankCard />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="*" element={<h2>Page not Found</h2>} />
    </Route>
  </Routes>
);

export default App;
