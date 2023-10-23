import '@testing-library/jest-dom';
import 'jest-styled-components';

import { darkTheme, lightTheme } from '@config/theme';
import { ThemeContext } from '@contexts/index';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import ThemeSwitcher from '../components/NavBar/ThemeSwitcher';
import GlobalStyle from '../GlobalStyle';
// eslint-disable-next-line jest/no-mocks-import
import { fakeContextValue } from './__mocks__';

const renderWithProviders = (component: any, theme?: any, contextValue?: any) => render(
  <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <ThemeContext.Provider value={contextValue ?? fakeContextValue}>
      <GlobalStyle />
      {component}
    </ThemeContext.Provider>
  </ThemeProvider>,
);

describe('Theme switcher', () => {
  test('switcher is in the document', () => {
    const { getByRole } = renderWithProviders(<ThemeSwitcher />);
    const switcher = getByRole('checkbox');
    expect(switcher).toBeInTheDocument();
  });

  test('dark theme: black bg', () => {
    const theme = 'dark';
    const { getByTestId } = renderWithProviders(<ThemeSwitcher />, theme);
    expect(getByTestId('switcher')).toHaveStyleRule('background-color', '#030304');
  });

  test('light theme: white bg', () => {
    const theme = 'light';
    const { getByTestId } = renderWithProviders(<ThemeSwitcher />, theme);
    expect(getByTestId('switcher')).toHaveStyleRule('background-color', '#FFFFFF');
  });

  test('theme change function has been called', async () => {
    const theme = 'dark';
    const contextValue = {
      theme,
      switchTheme: jest.fn(),
    };
    const { getByRole } = renderWithProviders(<ThemeSwitcher />, theme, contextValue);
    const switcher = getByRole('checkbox');

    await userEvent.click(switcher);

    expect(contextValue.switchTheme).toHaveBeenCalled();
  });
});
