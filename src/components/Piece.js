import React from 'react';

const Piece = (props) => {
  const classes = `${props.color} piece`;
  return (
    <div className={classes} data-pos={props.position}></div>
  )
}

export default Piece;
