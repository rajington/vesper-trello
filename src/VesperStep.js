import React from 'react';
import Step from './Step';
import { Button } from 'react-bootstrap';

import FolderInput from './FolderInput';

const getNotes = handleNotes => () => handleNotes([1, 2, 3]);

export default ({active, notes, handleNotes}) => {
  let labelClass = 'btn btn-default';
  if(!active){
    labelClass += ' disabled';
  }
  return (
    <Step>
      <label className={labelClass}>
        Select "Vesper Export ƒ" Folder
        <FolderInput disabled={!active} onChange={getNotes} className='hidden'/>
      </label>
    </Step>
  );
}
