import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { orderBy } from 'lodash';

export default ({notes}) => {
  if(notes) {
    const notesList = orderBy(notes, 'title')
      .map((note, i) => (
        <ListGroupItem key={i} disabled={note.archived}>
          { note.title }
        </ListGroupItem>
      ));

    return (
      <ListGroup>
      {notesList}
      </ListGroup>
    );
  }
}
