import React, { Component } from 'react';

import Step from './Step';
import InfoPanel from './InfoPanel';
import FolderInput from './FolderInput';
import NotesList from './NotesList';
import { parseFiles } from './vesper';

export default class VesperStep extends Component {
  state = {
    message: '',
    error: false,
  }

  parseFolder = async event => {
    try {
      const notes = await parseFiles(event.target.files);
      this.props.handleNotes(notes);
      this.setState({
        message: `Found ${notes.length} Active and Archived notes`,
        error: false,
      });
    } catch (e) {
      this.setState({
        message: e.message,
        error: true,
      });
    }
  }

  render() {
    let labelClass = 'btn btn-default';
    if(!this.props.active){
      labelClass += ' disabled';
    }
    let infoPanel;
    if(this.state.message){
      let notesList;
      if(this.props.notes.length) {
        notesList = <NotesList notes={this.props.notes} />;
      }
      infoPanel = (
        <InfoPanel message={this.state.message} error={this.state.error}>
          {notesList}
        </InfoPanel>
      )
    }
    return (
      <Step info={infoPanel}>
        <label className={labelClass}>
          Select "Vesper Export ƒ" Folder
          <FolderInput disabled={!this.props.active} onChange={this.parseFolder} className='hidden'/>
        </label>
      </Step>
    );
  }
}
