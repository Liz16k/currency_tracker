import styled from 'styled-components';

const ModalWrapper = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(0.25rem);
`;

const ModalContent = styled.div`
  z-index: 1001;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 32rem;
  height: 16rem;
  padding: 1rem 3rem;
  background-color: white;
  border: 1px solid;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-evenly;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bg};
  border-radius: 0.6rem;
  & > div {
    display: flex;
    align-items: center;
    gap: 2rem;
`;

export default { ModalWrapper, ModalContent };
