import React from 'react';

import { symbols } from '../../utils/constants';
import S from './styled';

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
