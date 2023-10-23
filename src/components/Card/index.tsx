import { symbols } from '@utils/constants';
import React from 'react';

import { Icon, Wrapper } from './styled';
import type CardProps from './types';

const Card = ({ name, value }: CardProps) => {
  const symbolNative = symbols[name];
  return (
    <Wrapper className="card" key={symbolNative} id={name}>
      <Icon>{symbolNative}</Icon>
      <div>
        <h4>{name}</h4>
        <p>{value}</p>
      </div>
    </Wrapper>
  );
};

export default Card;
