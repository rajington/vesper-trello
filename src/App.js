import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

import { authorized } from './trello';

import TrelloStep from './TrelloStep';
import VesperStep from './VesperStep';
import ImportStep from './ImportStep';

class App extends Component {
  state = {
    notes: [],
    authorized: authorized(),
  }

  handleNotes = notes => {
    this.setState({notes});
  }

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
          <TrelloStep active={!this.state.authorized} />
          <VesperStep active={this.state.authorized && this.state.notes.length === 0}
                      notes={this.state.notes}
                      handleNotes={this.handleNotes}/>
          <ImportStep active={this.state.notes.length !== 0} />
        </Row>
      </Grid>
    );
  }
}

export default App;
