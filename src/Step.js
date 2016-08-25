import React from 'react';
import { Col, Well } from 'react-bootstrap';

export default ({children}) => (
  <Col xs={4}>
    <Well bsSize="large" className="text-center">
    {children}
    </Well>
  </Col>
);
