import styled from 'styled-components';

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 4rem;
  padding: 2rem 0;
  margin-top: 6rem;
  & > div {
    max-width: 30rem;
    h4 {
      margin-bottom: 1rem;
      font-weight: 600;
      font-size: 1.2rem;
      display: flex;
      align-items: end;
      gap: 0.5rem;
      background: linear-gradient(90deg, #00ce2c, #aedf23, #a3dc00);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      div {
        display: inline-block;
      }
    }
  }
  nav {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    width: 100%;
    max-width: 30rem;

    li {
      list-style: none;
      margin: 0.8rem 0;
    }
    a {
      text-decoration: none;
      color: ${({ theme: { colors } }) => colors.tertiaryText};
      font-weight: 400;
    }
    h4 {
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: ${({ theme }) => theme.colors.primaryText};
    }
  }
`;

const Copyright = styled.div`
  color: ${({ theme: { colors } }) => colors.tertiaryText};
  margin: 1rem auto 2rem;
  text-align: center;
`;

export { Copyright, FooterWrapper };
