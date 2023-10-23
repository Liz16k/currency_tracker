import styled from 'styled-components';

const SwitchWrapper = styled.label`
  position: relative;
  display: inline-block;
  cursor: pointer;
  &:before {
    content: '';
    border: ${({ theme: { sizes, colors } }) => `${sizes.borderWidth} solid ${colors.primaryText}`};
    border-radius: 1.5rem;
    width: 2.75rem;
    height: 1.5rem;
    position: absolute;
    top: 0;
    transform: translateY(-50%);
  }
`;

const SwitchInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const SwitchSlider = styled.span`
  display: inline-block;
  width: 4rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.bg};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 2.125rem;

  &:before {
    position: absolute;
    content: '';
    height: 1.5rem;
    width: 1.5rem;
    border: ${({ theme: { sizes, colors } }) => `${sizes.borderWidth} solid ${colors.primaryText}`};
    right: 0;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${({ theme }) => `${theme.transform} translateY(-50%)`};
  }
`;

export { SwitchInput, SwitchSlider, SwitchWrapper };
