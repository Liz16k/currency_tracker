import styled from 'styled-components';

const Wrapper = styled.div`
  width: 32.5rem;
  height: 9rem;
  padding: 1.625rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 1.8rem;
  border: 0.07rem solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.cardBg};

  p {
    color: ${({ theme }) => theme.colors.accentText};
  }
  h4 {
    font-weight: 400;
  }
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.cardBorder};
  }
`;

const Icon = styled.div`
  width: 5rem;
  height: 5rem;
  font-size: 3rem;
  font-family: 'Chakra Petch', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  border-radius: 1rem;
`;
export default { Wrapper, Icon };
