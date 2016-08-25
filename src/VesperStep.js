import React, { Component } from 'react';

import Step from './Step';
import FolderInput from './FolderInput';
import vesper from './vesper';

export default class VesperStep extends Component {
  state = {
    status: '',
  }

  parseFolder = event => {
    try {
      const notes = vesper.parseFiles(event.target.files);
      this.props.handleNotes(notes);
      this.setState({
        status: `Found ${notes.length} Active and Archived notes`,
      });
    } catch (e) {
      this.setState({
        status: e.message,
      });
    }
  }

  render() {
    let labelClass = 'btn btn-default';
    if(!this.props.active){
      labelClass += ' disabled';
    }
    return (
      <Step>
        <label className={labelClass}>
          Select "Vesper Export ƒ" Folder
          <FolderInput disabled={!this.props.active} onChange={this.parseFolder} className='hidden'/>
        </label>
        {this.state.status}
      </Step>
    );
  }
}
