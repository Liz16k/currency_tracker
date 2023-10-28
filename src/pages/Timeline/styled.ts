import styled from 'styled-components';

const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 1s ease-in-out;
  form {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    button {
      appearance: none;
      height: fit-content;
      width: fit-content;
      padding: 0.25rem 0.75rem;
      font: inherit;
      background-color: ${({ theme }) => theme.colors.cardBg};
      color: ${({ theme }) => theme.colors.primaryText};
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }
`;

const Message = styled.div<{ $isShow?: string }>`
  position: relative;
  bottom: 15rem;
  text-align: center;
  opacity: 0;
  font-family: inherit;
  font-size: 2rem;
  color: white;

  ${(p) => p.$isShow === 'true'
    && `
      animation: show 4s ease-out;
    @keyframes show{
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }}`}
`;

const SelectBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  text-align: center;
`;

const Input = styled.input.attrs(({
  type, name, onChange, value, required, placeholder, pattern, maxLength,
}) => ({
  type: type ?? 'text',
  name,
  value,
  onChange,
  pattern,
  maxLength,
  required: required ?? true,
  placeholder: placeholder ?? '0.000',

}))`
  margin-left: 0.5rem;
  appearance: none;
  font: inherit;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.primaryText};
  width: 5rem;
  padding: 0.25rem 0.5rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.primaryText};
  border-radius: 0.5rem;
`;

export {
  Input, Message,
  SelectBar, TimelineWrapper,
};
