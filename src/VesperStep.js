import React from 'react';
import { Button } from 'react-bootstrap';
import Step from './Step';

const getNotes = handleNotes => () => handleNotes([1, 2, 3]);

export default ({active, notes, handleNotes}) => (
  <Step>
    <Button disabled={!active} onClick={getNotes(handleNotes)}>
      Select "Vesper Export ƒ" Folder {notes}
    </Button>
  </Step>
);
