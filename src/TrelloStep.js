import React from 'react';
import { Button } from 'react-bootstrap';

import { authorize } from './trello';
import Step from './Step';

export default ({active}) => (
  <Step message={active ? null : 'Authenticated'}>
    <Button disabled={!active} onClick={authorize}>
      Connect to Trello
    </Button>
  </Step>
);
