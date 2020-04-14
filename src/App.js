import React from 'react';
import Input from './components/Input';
import Piece from './components/Piece';
import ControlPanel from './components/ControlPanel';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      board: [
        ['r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'],
        ['r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
      ]
    }
    this.updateSize = this.updateSize.bind(this);
  }

  updateSize(n) {
    const board = [];
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        if (i === 0 || i === 1) {
          row.push('r');
        } else if (i === n - 1 || i === n - 2) {
          row.push('b');
        } else {
          row.push(0);
        }
      }
      board.push(row);
    }
    this.setState({ board })
  }

  handleClick(target) {
    // if a piece is clicked
    console.log(target);
    if (target.className.includes('piece')) {
      // highlight the piece
      this.highlight(target);
      // find and highlight the potential moves
      let currentPosition = target.dataset.pos;
      this.findNextPosition(currentPosition);

    }

    // if a potential spot is clicked

  }

  highlight(target) {
    target.style.border = "3px solid yellow";
  }

  findNextPosition(pos) {

  }


  render() {
    return (
      <div className="App">
        <Input updateSize={this.updateSize}/>
        <div className="board" onClick={e => this.handleClick(e.target)}>
          {this.state.board.map((row, i) => {
            return (
              <div className="row" key={i}>
                {row.map((cube, j) => {
                  if (cube === 'r') return (
                    <div key={j} className="cube">
                      <Piece color="red" position={i.toString() + j.toString()} />
                    </div>);
                  if (cube === 'b') return (
                    <div key={j} className="cube">
                      <Piece color="black" position={i.toString() + j.toString()} />
                    </div>);
                  return (<div key={j} className="cube"></div>);
                })}
              </div>
            )
          })}
        </div>
        <ControlPanel />
      </div>
    )
  }

}

export default App;
