import React from 'react';

const Display = props => (
  {props.if ? <section>{props.children}</section> : null}
);

export default Display;
