import React from 'react';

const giveCustomAttributes = (input) => {
  input.setAttribute('webkitdirectory', '');
}

export default (props) => (
  <input type='file' ref={giveCustomAttributes} {...props} />
)
