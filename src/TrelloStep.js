import React from 'react';
import { Button } from 'react-bootstrap';

import { authorize } from './trello';
import Step from './Step';

export default ({active}) => (
  <Step>
    <Button disabled={!active} onClick={authorize}>
      Connect with Trello
    </Button>
  </Step>
);
