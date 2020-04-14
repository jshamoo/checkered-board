import React from 'react';

const ControlPanel = (props) => {
  const handleChange = (e) => {
    if (e.target.name === 'redPieceColor' || e.target.name === 'blackPieceColor') {
      document.documentElement.style.setProperty(`--${e.target.name}`, `${e.target.value}`)
    } else {
      if (e.target.value === 'circle') {
        document.documentElement.style.setProperty(`--${e.target.name}`, `50%`)
      } else {
        document.documentElement.style.setProperty(`--${e.target.name}`, `0%`)
      }
    }
  }

  return (
    <div className="controls" onChange={e => handleChange(e)}>
      <div className="shape-control">
        <p>Change the piece shape</p>
        <input type="radio" id="circle" name="shape" value="circle" />
        <label forid="circle">Circle</label>
        <input type="radio" id="square" name="shape" value="square" />
        <label forid="square">Square</label>
      </div>
      <div className="color-control">
        <p>Change the red piece color</p>
        <input type="radio" id="orange" name="redPieceColor" value="orange" />
        <label forid="orange">Orange</label>
        <input type="radio" id="purple" name="redPieceColor" value="purple" />
        <label forid="purple">Purple</label>
        <p>Change the black piece color</p>
        <input type="radio" id="blue" name="blackPieceColor" value="blue" />
        <label forid="blue">Blue</label>
        <input type="radio" id="green" name="blackPieceColor" value="green" />
        <label forid="green">Green</label>
      </div>
    </div>
  )

}

export default ControlPanel;
