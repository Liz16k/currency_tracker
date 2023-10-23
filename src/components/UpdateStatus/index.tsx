import { LAST_UPDATED } from '@utils/constants';
import React from 'react';

import { Indicator, UpdateWrapper } from './styled';

const UpdateStatus = ({ lastUpdate }: { lastUpdate: string }) => (
  <UpdateWrapper>
    <Indicator />
    <p>
      {LAST_UPDATED} <b>{lastUpdate}</b>
    </p>
  </UpdateWrapper>
);

export default UpdateStatus;
