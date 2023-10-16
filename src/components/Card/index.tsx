import { symbols } from '@utils/constants';
import React from 'react';

import S from './styled';
import type CardProps from './types';

const Card = ({ name, value }: CardProps) => {
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
