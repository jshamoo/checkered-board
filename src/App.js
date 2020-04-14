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
      this.highlightPiece(target);
      // find and highlight the potential moves
      const currentPosition = target.dataset.pos;
      const rowIndex = Number(currentPosition[0]);
      const colIndex = Number(currentPosition[1]);

      this.findNextPosition(rowIndex, colIndex);
    }

    // if a potential spot is clicked

  }

  highlightPiece(target) {
    target.style.border = "3px solid yellow";
  }

  findNextPosition(row, col) {
    const board = this.state.board.slice();
    // if it is a red piece
    if (board[row][col] === 'r') {
      if (row + 1 < board.length && // row in bound
          col + 1 < board.length && // col in bound
          board[row + 1][col + 1] === 0) { // it is an empty
        board[row + 1][col + 1] = 1;
      }
      if (row + 1 < board.length &&
          col - 1 >= 0 &&
          board[row + 1][col - 1] === 0) {
        board[row + 1][col - 1] = 1;
      }
    }
    // if it is a black piece
    if (board[row][col] === 'b') {
      if (row - 1 >= 0 && // row in bound
        col + 1 < board.length && // col in bound
        board[row - 1][col + 1] === 0) { // it is an empty
        board[row - 1][col + 1] = 1;
      }
      if (row - 1 >= 0 &&
        col - 1 >= 0 &&
        board[row - 1][col - 1] === 0) {
        board[row - 1][col - 1] = 1;
      }
    }

    this.setState({ board });
  }


  render() {
    const highlightCubeStyle = {
      backgroundColor: 'lightblue'
    }
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
                  if (cube === 0) return (<div key={j} className="cube"></div>);
                  if (cube === 1) return (<div key={j} className="cube" style={highlightCubeStyle}></div>)
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
