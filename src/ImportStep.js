import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

import Step from './Step';
import { importNotes } from './trello';

export default class ImportStep extends Component {
  state = {
    progress: 0
  }
  
  handleImport = () => {
    importNotes(this.props.notes, this.updateProgress);
  }

  updateProgress = progress => {
    this.setState({ progress });
  }

  render() {
    const { active }  = this.props;
    return (
      <Step>
        <Button disabled={!active} onClick={this.handleImport}>
          Upload Cards {this.state.progress}
        </Button>
      </Step>
    );
  }
}
