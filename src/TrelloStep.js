import React from 'react';
import { Button } from 'react-bootstrap';

import Trello from './Trello';
import Step from './Step';

const authorize = () => Trello.authorize();

export default ({active}) => (
  <Step>
    <Button disabled={!active} onClick={authorize}>
      Connect with Trello
    </Button>
  </Step>
);
