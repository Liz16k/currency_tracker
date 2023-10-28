import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    font-weight: 300;
    min-height: 100vh;
    max-width: 88.75rem;
    margin: auto;
    padding: 0 6.25rem;
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.primaryText}
  }

  h1 {
    text-align: center;
    padding: 3rem;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .marker-popup-content {
    color: black;
  }
`;

export default GlobalStyle;
