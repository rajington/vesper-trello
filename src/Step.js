import React from 'react';
import { Col, Panel } from 'react-bootstrap';

export default ({message, error, log, children}) => {
  let infoPanel;
  if(message || error){
    infoPanel = (
      <Panel header={message || error} bsStyle={error ? 'danger' : 'success'}>
        {log}
      </Panel >
    )
  }
  return (
    <div>
      <Col xs={4}>
        <Panel className="text-center">
        {children}
        </Panel >
        { infoPanel }
      </Col>
    </div>
  );
}
