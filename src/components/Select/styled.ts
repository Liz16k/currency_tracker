import styled from 'styled-components';

const SelectWrapper = styled.div`
  width: 12rem;
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectLabelInput = styled.input`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding: 0.3rem 0.5rem;
  width: 80%;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.bg};
  color: #00bc4f;
  align-items: center;
  justify-content: space-between;
  border: none;
  border-radius: 0.5rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.cardBorder};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.cardBg};
  }
  &::placeholder {
    text-align: center;
  }
`;

const DropdownStyle = styled.div`
  z-index: 1000;
  position: absolute;
  top: 2rem;
  margin: 0 auto;
  margin-top: 1rem;
  max-height: 40vmax;
  width: fit-content;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.bg};
  border: 1.5px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: auto;
`;

const DropdownItem = styled.div<{ $active?: string }>`
  display: flex;
  align-items: center;
  margin: 0.15rem 0;
  padding: 0.3rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 400;
  border-radius: 0.3rem;
  cursor: pointer;

  ${(p) => p.$active === 'true'
    && `
      color: #00BC4F;
      font-weight: 600;
    `}
  &:hover, :focus, :focus:hover {
    background-color: ${({ theme }) => theme.colors.cardBg};
    color: ${({ theme }) => theme.colors.accentText};
    outline: none;
  }
`;

export {
  DropdownItem,
  DropdownStyle,
  SelectLabelInput,
  SelectWrapper,
};
