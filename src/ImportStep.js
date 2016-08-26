import React, {Component} from 'react';
import { Button, ProgressBar, Panel } from 'react-bootstrap';

import Step from './Step';
import { importNotes } from './trello';

export default class ImportStep extends Component {
  state = {
    progress: 0,
    url: '',
  }

  handleImport = async () => {
    const url = await importNotes(this.props.notes, this.updateProgress);
    this.setState({url});
  }

  updateProgress = progress => {
    this.setState({ progress });
  }

  render() {
    const { active, notes }  = this.props;
    const { progress, url } = this.state;
    let infoPanel;
    if(progress) {
      const total = notes.length;
      const incomplete = progress !== total;
      const message = incomplete ? 'Uploading...' : (<a href={url}>{url}</a>);
      infoPanel = (
        <Panel header={message} bsStyle={incomplete ? 'warning' : 'success'}>
          <ProgressBar
            now={progress / total * 100}
            label={`${progress}/${total} cards`}
            active={incomplete}
            striped={incomplete}
          />
        </Panel>
      );
    }
    return (
      <Step info={infoPanel}>
        <Button disabled={!active} onClick={this.handleImport}>
          Upload Cards {this.state.progress}
        </Button>
      </Step>
    );
  }
}
