/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import '@testing-library/jest-dom';
import 'jest-styled-components';

import {
  render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import CandlestickChart from '../components/Chart/index';
import { ThemeContext } from '../Contexts';
import GlobalStyle from '../GlobalStyle';
import Timeline from '../pages/Timeline';
import { darkTheme, lightTheme } from '../theme';
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

jest.mock('../api/currencies', () => ({
  fetchTimeseries: jest.fn(async () => Promise.resolve([{
    datetime: '01.01',
    low: 2.21,
    open: 2.33,
    close: 2.34,
    high: 2.36,
  }, {
    datetime: '01.02',
    low: 2.11,
    open: 2.15,
    close: 2.34,
    high: 2.36,
  }, {
    datetime: '01.03',
    low: 2.21,
    open: 2.31,
    close: 2.25,
    high: 2.36,
  }, {
    datetime: '01.04',
    low: 2.13,
    open: 2.21,
    close: 2.34,
    high: 2.36,
  }, {
    datetime: '01.05',
    low: 2.13,
    open: 2.15,
    close: 2.24,
    high: 2.26,
  }])),
}));

describe('Timeline (candlestick graphic)', () => {
  test('click on select trigger causes a dropdown-menu to appear, and disappear after selection', async () => {
    const { getByTestId, getByText } = renderWithProviders(<Timeline />);

    const selects: HTMLInputElement[] = screen.getAllByPlaceholderText('choose option');
    const mockValues = ['USD', 'PLN', 'DAILY'];
    selects.forEach(async (select, i) => {
      await waitFor(async () => {
        userEvent.click(select);
        const menu = getByTestId('dropdown-menu');
        expect(menu).toBeInTheDocument();

        const item = getByText(mockValues[i]);
        await userEvent.click(item);
        expect(menu).not.toBeInTheDocument();
      });
    });
  });

  test('choosed option from dropdown-menu becomes select value', async () => {
    renderWithProviders(<Timeline />);

    const selects: HTMLInputElement[] = screen.getAllByPlaceholderText('choose option');
    const mockValues = ['EUR', 'PLN', 'DAILY'];
    selects.forEach(async (select, i) => {
      await waitFor(async () => {
        userEvent.click(select);
        const item = screen.getByText(mockValues[i]);
        userEvent.click(item);
        expect(select).toHaveValue(mockValues[i]);
      });
    });
  });

  test.skip('Chart test', async () => {
    const data = [
      ['01.01', 2.21, 2.33, 2.34, 2.36],
      ['01.02', 2.11, 2.15, 2.34, 2.36],
      ['01.03', 2.21, 2.31, 2.25, 2.36],
      ['01.04', 2.13, 2.21, 2.34, 2.36],
      ['01.05', 2.13, 2.15, 2.24, 2.26],
    ];

    const { getByTestId } = renderWithProviders(<CandlestickChart data={[['day', 'l', 'o', 'c', 'h'], ...data]} />);

    const chart = getByTestId('chart');
    expect(chart).toBeInTheDocument();
  });
});
