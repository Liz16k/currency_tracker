import styled from 'styled-components';

const QuotesWrapper = styled.div`
  display: flex;
  gap: 4rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Currency = styled.div`
  display: flex;
  height: 60%;
  flex-direction: column;
  justify-content: space-between;
  h3 {
    padding: 0.16rem 0.5rem;
    font-size: 1.2rem;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input {
    appearance: none;
    font: inherit;
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.primaryText};
    width: 10rem;
    padding: 0.25rem 0.5rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.primaryText};
    border-radius: 0.5rem;
  }
`;

export default QuotesWrapper;
export { Currency };
