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
    const { active, notes } = this.props;
    const { message, error } = this.state;

    let labelClass = 'btn btn-default';
    if(!active){
      labelClass += ' disabled';
    }
    let infoPanel;
    if(message){
      let notesList;
      if(notes.length) {
        notesList = <NotesList notes={notes} />;
      }
      infoPanel = (
        <InfoPanel message={message} error={error}>
          {notesList}
        </InfoPanel>
      )
    }
    return (
      <Step info={infoPanel}>
        <label className={labelClass}>
          Select "Vesper Export ƒ" Folder
          <FolderInput disabled={!active} onChange={this.parseFolder} className='hidden'/>
        </label>
      </Step>
    );
  }
}
