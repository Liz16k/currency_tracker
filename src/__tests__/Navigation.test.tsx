import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeContext } from '@utils/Contexts';
import { createMemoryHistory } from 'history';
import React, { type ReactElement } from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from '../App';
import NavBar from '../components/NavBar';
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

jest.mock('mapbox-gl/dist/mapbox-gl.css', () => '');

describe('Navigation', () => {
  const pages = ['Home', 'Timeline', 'Bank Card', 'Contacts'];

  test('renders navigation links', () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <NavBar />
      </Router>,
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
      </MemoryRouter>));

    const timelineLink = screen.getByText('Timeline');
    expect(timelineLink).toHaveClass('active');
  });

  test('onClick navigation link becomes active', () => {
    renderWithProviders((
      <MemoryRouter initialEntries={['/timeline']}>
        <NavBar />
      </MemoryRouter>));

    const timelineLink = screen.getByText('Timeline');
    expect(timelineLink).toHaveClass('active');
  });

  test('navigates when link is clicked', async () => {
    const history = createMemoryHistory();

    renderWithProviders((
      <Router location={history.location} navigator={history}>
        <NavBar />
      </Router>));

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
