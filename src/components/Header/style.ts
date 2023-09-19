import styled from 'styled-components';

const HeaderWrapper = styled.div`
  height: 28.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  border-bottom: 1px solid #000;
  background: ${({ theme: { colors: { gradient } } }) => ((gradient !== undefined) ? `linear-gradient(-100deg, ${gradient.first}, ${gradient.second} , ${gradient.third})` : 'white')} ;
`;

const Caption = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  & > *:not(blockquote) {
    font-weight: 600;
    background: linear-gradient(90deg, #00ce2c, #aedf23, #a3dc00);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h2 {
    font-size: ${({ theme }) => theme.sizes.font.headline};
  }
  h3 {
    font-size: ${({ theme }) => theme.sizes.font.title};
  }
`;

const Quote = styled.blockquote`
  width: 24rem;
  text-align: center;
  align-self: flex-end;
  transform: translateX(15%);
  font-size: ${({ theme }) => theme.sizes.font.label};
  color: ${({ theme }) => theme.colors.quoteText};
  font-weight: 300;
  line-height: 2.9rem;
`;

export default { HeaderWrapper, Caption, Quote };
