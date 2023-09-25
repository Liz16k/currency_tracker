import styled from 'styled-components';

const ContactWrapper = styled.div`
  margin: 4rem 0;
  display: flex;
  justify-content: space-evenly;
  svg {
    margin: 5rem 0;
  }
  & > div {
    display: flex;
    flex-direction: column;
    width: 40%;
  }
  & > div:first-child {
    flex-grow: 2;
  }
  h3 {
    margin: 0 auto;
    font-size: 4rem;
    margin-bottom: 2.5rem;
    font-weight: 600;
    background: linear-gradient(90deg, #00ce2c, #aedf23, #a3dc00);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primaryText};
    > p {
      max-width: 12rem;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.accentText};
      margin-bottom: 1rem;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 0 auto;
  }
`;

const Button = styled.button`
  cursor: pointer;
  appearance: none;
  border: none;
  padding: 1rem 5rem;
  font: inherit;
  font-weight: 600;
  border-radius: 1rem;
  background: linear-gradient(90deg, #00ce2c, #aedf23, #a3dc00);
  color: ${({ theme }) => theme.colors.primaryText};
`;

const Input = styled.input`
  width: 100%;
  padding: 1.25rem;
  margin-bottom: 2rem;
  background-color: ${({ theme }) => theme.colors.cardBg};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primaryText};
  border: 0.125rem solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 0.5rem;
  &::placeholder {
    font-family: Poppins, sans-serif;
    color: ${({ theme }) => theme.colors.tertiaryText};
  }
`;

const Textarea = styled.textarea`
  appearance: none;
  background-color: ${({ theme }) => theme.colors.cardBg};
  resize: none;
  border: 0.125rem solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 0.5rem;
  padding: 1.25rem;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primaryText};
  &::placeholder {
    font-family: Poppins, sans-serif;
  }
`;

export default {
  ContactWrapper,
  Button,
  Input,
  Textarea,
};
