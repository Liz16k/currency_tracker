import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import CurrencyModal from '../components/Quotes/CurrencyModal';
import { ThemeContext } from '../Contexts';
import GlobalStyle from '../GlobalStyle';
// eslint-disable-next-line jest/no-mocks-import
import { fakeContextValue, fakeLightTheme } from './__mocks__';

const renderWithProviders = (component: any, theme?: any, contextValue?: any) => render(
  <ThemeProvider theme={theme ?? fakeLightTheme}>
    <ThemeContext.Provider value={contextValue ?? fakeContextValue}>
      <GlobalStyle />
      {component}
    </ThemeContext.Provider>
  </ThemeProvider>,
);

jest.mock('../api/currencies', () => ({
  fetchExchangeRate: jest.fn(async () => Promise.resolve({
    rate: 1.5,
    fromCode: 'USD',
    toCode: 'EUR',
    lastUpdate: 'today',
  })),
}));

describe('Currency converter', () => {
  test('changes toValue when fromValue changes', async () => {
    renderWithProviders(<CurrencyModal from="USD" />);
    const [fromInput, toInput]: any = screen.getAllByPlaceholderText('0');

    await userEvent.type(fromInput, '100');
    expect(toInput.value).toBe('150');
  });

  test('changes fromValue when toValue changes', async () => {
    renderWithProviders(<CurrencyModal from="USD" />);
    const [fromInput, toInput]: any = screen.getAllByPlaceholderText('0');

    await userEvent.type(toInput, '30');
    expect(fromInput.value).toBe('20');
  });
});
