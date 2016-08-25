import React from 'react';
import { Button } from 'react-bootstrap';
import Step from './Step';

export default ({active}) => (
  <Step>
    <Button disabled={!active}>
      Upload Cards
    </Button>
  </Step>
);
