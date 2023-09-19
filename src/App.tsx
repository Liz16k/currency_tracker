import React, { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Footer from './components/Footer';
import Header from './components/Header';
import NavBar from './components/NavBar';
import UpdateStatus from './components/UpdateStatus';
import ThemeContext from './Contexts';
import GlobalStyle from './GlobalStyle';
import BankCard from './pages/BankCard';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import { darkTheme, lightTheme } from './theme';

const App = () => {
  const [theme, setTheme] = useState('dark');

  const themeContextValue = useMemo(
    () => ({
      theme,
      switchTheme: () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      },
    }),
    [theme],
  );

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <ThemeContext.Provider value={themeContextValue}>
        <Routes>
          <Route
            element={(
              <>
                <NavBar />
                <Header />
                <UpdateStatus lastUpdate="11:52" />
                <Footer />
              </>
            )}
          >
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/bank-card" element={<BankCard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="*" element={<h2>Page not Found</h2>} />
          </Route>
        </Routes>
        <GlobalStyle />
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default App;
