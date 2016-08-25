import React from 'react';
import { Button } from 'react-bootstrap';

import Step from './Step';
import InfoPanel from './InfoPanel';
import { authorize } from './trello';

export default ({active}) => (
  <Step info={!active && (<InfoPanel message='Authorized' />)}>
    <Button disabled={!active} onClick={authorize}>
      Connect to Trello
    </Button>
  </Step>
);
