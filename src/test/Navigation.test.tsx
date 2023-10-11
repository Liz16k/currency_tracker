import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from '../App';
import NavBar from '../components/NavBar';
import { ThemeContext } from '../Contexts';
import GlobalStyle from '../GlobalStyle';
import { fakeContextValue, fakeLightTheme } from './mockData';

const renderWithProviders = (component: any, theme: any, contextValue: any) => render(
  <ThemeProvider theme={theme ?? fakeLightTheme}>
    <ThemeContext.Provider value={contextValue ?? fakeContextValue}>
      <GlobalStyle />
      {component}
    </ThemeContext.Provider>
  </ThemeProvider>,
);

describe('Navigation', () => {
  const pages = ['Home', 'Timeline', 'Bank Card', 'Contacts'];

  test('renders navigation links', () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <NavBar />
      </Router>,
      fakeLightTheme,
      fakeContextValue,
    );

    pages.forEach((p) => {
      const link = screen.getByText(p);
      expect(link).toBeInTheDocument();
    });
  });

  test('navigation link should active when match location pathname', () => {
    renderWithProviders((
      <MemoryRouter initialEntries={['/timeline']}>
        <NavBar />
      </MemoryRouter>), fakeLightTheme, fakeContextValue);

    const timelineLink = screen.getByText('Timeline');
    expect(timelineLink).toHaveClass('active');
  });

  test('onClick navigation link becomes active', () => {
    renderWithProviders((
      <MemoryRouter initialEntries={['/timeline']}>
        <NavBar />
      </MemoryRouter>), fakeLightTheme, fakeContextValue);

    const timelineLink = screen.getByText('Timeline');
    expect(timelineLink).toHaveClass('active');
  });

  test('navigates when link is clicked', async () => {
    const history = createMemoryHistory();

    renderWithProviders((
      <Router location={history.location} navigator={history}>
        <NavBar />
      </Router>), fakeLightTheme, fakeContextValue);

    expect(history.location.pathname).toBe('/');

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    pages.forEach(async (p) => {
      const link = screen.getByText(p);
      await userEvent.click(link);
      expect(history.location.pathname).toBe(`/${p.toLowerCase().replace(' ', '-')}`);
    });
  });

  test('renders page-not-found for non-existing route', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-page']}>
        <App />
      </MemoryRouter>,
    );

    const notFoundText = screen.getByText('Page not Found');
    expect(notFoundText).toBeInTheDocument();
  });
});
