import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <Jumbotron>
              <h1>vesper-trello</h1>
              <p>Import your Vesper notes into Trello.</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            Connect to Trello
          </Col>
          <Col xs={4}>
            Select "Vesper Export ƒ" Folder
          </Col>
          <Col xs={4}>
            Upload Cards
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
