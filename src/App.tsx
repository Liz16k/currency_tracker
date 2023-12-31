import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './GlobalStyle';
import Navigation from './routes';
import { LastUpdateProvider, ThemeContext } from './utils/Contexts';
import { darkTheme, lightTheme } from './utils/theme';

const App = () => {
  const [theme, setTheme] = useState('dark');
  const queryClient = new QueryClient();
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
    <QueryClientProvider client={queryClient}>
      <LastUpdateProvider>
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
          <ThemeContext.Provider value={themeContextValue}>
            <Navigation />
            <GlobalStyle />
          </ThemeContext.Provider>
        </ThemeProvider>
      </LastUpdateProvider>
    </QueryClientProvider>
  );
};

export default App;
