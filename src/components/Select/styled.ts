import styled from 'styled-components';

const SelectWrapper = styled.div`
  position: relative;
  margin: 0;
`;

const SelectLabelButton = styled.button`
  padding: 0.3rem 0.5rem;
  min-width: 5rem;
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
`;

const DropdownStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  max-height: 40vmax;
  min-width: 10rem;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.bg};
  border: 1.5px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: auto;
`;

const DropdownItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0.15rem 0;
  padding: 0.3rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 400;
  border-radius: 0.3rem;
  cursor: pointer;

  ${(p) => (p.active ?? false)
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

export default {
  DropdownItem,
  DropdownStyle,
  SelectLabelButton,
  SelectWrapper,
};
