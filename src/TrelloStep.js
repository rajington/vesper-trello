import React from 'react';
import { Button, Panel } from 'react-bootstrap';

import Step from './Step';
import { authorize } from './trello';

export default ({active}) => (
  <Step info={!active && (<Panel header='Authorized' bsStyle='success'/>)}>
    <Button disabled={!active} onClick={authorize}>
      Connect to Trello
    </Button>
  </Step>
);
