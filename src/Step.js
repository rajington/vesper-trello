import React from 'react';
import { Col, Panel } from 'react-bootstrap';

export default ({children, info}) => (
  <div>
    <Col xs={4}>
      <Panel className="text-center">
      {children}
      </Panel >
      { info }
    </Col>
  </div>
);
