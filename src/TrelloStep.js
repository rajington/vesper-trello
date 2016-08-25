import React from 'react';
import { Button } from 'react-bootstrap';
import Step from './Step';

export default ({active, authenticate}) => (
  <Step>
    <Button disabled={!active} onClick={authenticate}>
      Connect with Trello
    </Button>
  </Step>
);
