import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6.25rem;

  & > :last-child {
    display: flex;
    justify-content: flex-end;
  }

  & > * {
    flex-grow: 2;
  }
`;

const NavRoutes = styled.ul`
  list-style: none;
  max-width: 78.5rem;
  display: flex;
  flex-grow: 2;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      color: #00ce2c;
    }
    &.active {
      cursor: default;
      font-weight: 600;
      padding-bottom: 0.5rem;
      border-bottom: 0.25rem solid #00ce2c;
      &:hover {
        color: inherit;
      }
    }
  }
`;

export { Nav, NavRoutes };
