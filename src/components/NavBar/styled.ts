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
      color: ${({ theme }) => theme.colors.gradient.green};
    }
    &.active {
      font-weight: 600;
      padding-bottom: 0.5rem;
      border-bottom: 0.25rem solid ${({ theme }) => theme.colors.gradient.green};
    }
  }
`;

export default { Nav, NavRoutes };
