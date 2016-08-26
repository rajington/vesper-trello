import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

import logo from './logo.svg';
import './App.css';

import { authorized } from './trello';

import TrelloStep from './TrelloStep';
import VesperStep from './VesperStep';
import ImportStep from './ImportStep';

export default class App extends Component {
  state = {
    notes: [], // the processed notes
    authorized: authorized(), // whether the Trello client is authorized
  }

  handleNotes = notes => {
    this.setState({notes});
  }

  render() {
    const {authorized, notes} = this.state;

    return (
      <Grid>
        <Row>
          <Col>
            <Jumbotron>
              <Grid>
                <Row>
                  <Col xs={6}>
                    <h1>vesper-trello</h1>
                    <p>Import your Vesper notes into Trello.</p>
                    This tool requires:
                    <ul>
                      <li>
                        <a href="https://www.google.com/chrome/browser/desktop/index.html">Desktop Chrome</a>
                      </li>
                      <li>
                        <a href="https://itunes.apple.com/us/app/vesper/id655895325">Vesper notes</a> exported to a folder.
                      </li>
                      <li>
                        A <a href="https://trello.com/">Trello account</a>
                      </li>
                    </ul>
                    More information available on <a href="https://medium.com/p/vesper-trello-168732c63d97">medium</a> and <a href="https://github.com/rajington/vesper-trello">github</a>.
                  </Col>
                  <Col xs={6}>
                    <img src={logo} className="App-logo" alt="logo"/>
                  </Col>
                </Row>
              </Grid>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <TrelloStep active={!authorized} />
          <VesperStep active={authorized && notes.length === 0}
                      notes={notes}
                      handleNotes={this.handleNotes}/>
          <ImportStep active={notes.length !== 0}
                      notes={notes}/>
        </Row>
      </Grid>
    );
  }
}
