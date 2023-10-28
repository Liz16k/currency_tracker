import '@testing-library/jest-dom';

import CurrencyModal from '@components/Quotes/CurrencyModal';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeContext } from '@utils/Contexts';
import React, { type ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../GlobalStyle';
// eslint-disable-next-line jest/no-mocks-import
import { fakeContextValue, fakeLightTheme } from './__mocks__';

const renderWithProviders = (component: ReactElement) => render(
  <ThemeProvider theme={fakeLightTheme}>
    <ThemeContext.Provider value={fakeContextValue}>
      <GlobalStyle />
      {component}
    </ThemeContext.Provider>
  </ThemeProvider>,
);

jest.mock('../services/currencies', () => ({
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
    const [fromInput, toInput]: HTMLInputElement[] = screen.getAllByPlaceholderText('0');

    await userEvent.type(fromInput, '100');
    expect(toInput.value).toBe('150');
  });

  test('changes fromValue when toValue changes', async () => {
    renderWithProviders(<CurrencyModal from="USD" />);
    const [fromInput, toInput]: HTMLInputElement[] = screen.getAllByPlaceholderText('0');

    await userEvent.type(fromInput, '20');
    expect(toInput.value).toBe('30');
  });
});
