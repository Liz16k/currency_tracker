import React from 'react';

import { Indicator, UpdateWrapper } from './styled';

const UpdateStatus = ({ lastUpdate }: { lastUpdate: string }) => (
  <UpdateWrapper>
    <Indicator />
    <p>
      Last updated at <b>{lastUpdate}</b>
    </p>
  </UpdateWrapper>
);

export default UpdateStatus;
