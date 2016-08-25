import React from 'react';
import { Panel } from 'react-bootstrap';

export default ({message, error, children}) => (
  <Panel header={message} bsStyle={error ? 'danger' : 'success'}>
    {children}
  </Panel >
);
