import React from 'react';

import S from './styled';

export const symbols: any = {
  RUB: '₽',
  BYN: 'Br',
  PLN: 'zł',
  AUD: '$',
  CAD: '$',
  EUR: '€',
  UAH: '₴',
  CNY: '¥',
  GBP: '£',
};

const Card = ({ name, value }: any) => {
  const symbolNative = symbols[name];
  return (
    <S.Wrapper className="card" key={symbolNative} id={name}>
      <S.Icon>{symbolNative}</S.Icon>
      <div>
        <h4>{name}</h4>
        <p>{value}</p>
      </div>
    </S.Wrapper>
  );
};

export default Card;
