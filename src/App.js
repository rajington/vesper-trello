import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron, Button } from 'react-bootstrap';
import Step from './Step';

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
          <Step>
            <Button>
              Connect with Trello
            </Button>
          </Step>
          <Step>
            <Button>
              Select "Vesper Export ƒ" Folder
            </Button>
          </Step>
          <Step>
            <Button>
              Upload Cards
            </Button>
          </Step>
        </Row>
      </Grid>
    );
  }
}

export default App;
