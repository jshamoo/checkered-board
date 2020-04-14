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
      ],
      targetPiece: null,
      lastMovedPiece: null,

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
    console.log(target);
    // find and highlight the potential moves
    const currentPosition = target.dataset.pos;
    const rowIndex = Number(currentPosition[0]);
    const colIndex = Number(currentPosition[1]);

    // if a piece is clicked
    if (target.className.includes('piece')) {
      // highlight the piece
      this.highlightPiece(target);
      // undo cube highlight
      this.setState(state => {
        //undo highlight of cube
        state.board.forEach((row, index) => {
          let highlighted = row.indexOf(1);
          if (highlighted !== -1) {
            state.board[index][highlighted] = 0;
          }
        });
        return state;
      })

      // record the target piece in state
      let piece;
      if (target.className.includes('red')) {
        piece = 'r';
      } else {
        piece = 'b'
      }
      const targetPiece = [piece, rowIndex, colIndex];
      this.setState({ targetPiece })
      // find next two positions and highlight it
      this.findNextPosition(rowIndex, colIndex);
    }

    // if a potential spot is clicked
    if (target.className.includes('highlight')) {
      const curColor = this.state.targetPiece[0];
      // check if this color is moved before
      if (curColor !== this.state.lastMovedPiece) {
        this.movePiece(rowIndex, colIndex);
      }
    }
  }

  highlightPiece(target) {
    target.style.border = "3px solid yellow";
  }

  findNextPosition(row, col) {
    const board = this.state.board;
    // if it is a red piece
    if (board[row][col] === 'r') {
      if (row + 1 < board.length && // row in bound
          col + 1 < board.length && // col in bound
          board[row + 1][col + 1] === 0) { // it is an empty
        // board[row + 1][col + 1] = 1;
        this.setState(state => {
          state.board[row + 1][col + 1] = 1;
          return state;
        })
      }
      if (row + 1 < board.length &&
          col - 1 >= 0 &&
          board[row + 1][col - 1] === 0) {
        // board[row + 1][col - 1] = 1;
        this.setState(state => {
          state.board[row + 1][col - 1] = 1;
          return state;
        })
      }
    }
    // if it is a black piece
    if (board[row][col] === 'b') {
      if (row - 1 >= 0 && // row in bound
        col + 1 < board.length && // col in bound
        board[row - 1][col + 1] === 0) { // it is an empty
        // board[row - 1][col + 1] = 1;
        this.setState(state => {
          state.board[row - 1][col + 1] = 1;
          return state;
        })
      }
      if (row - 1 >= 0 &&
        col - 1 >= 0 &&
        board[row - 1][col - 1] === 0) {
        // board[row - 1][col - 1] = 1;
        this.setState(state => {
          state.board[row - 1][col - 1] = 1;
          return state;
        })
      }
    }

  }

  movePiece(r, c) {
    const curRow = this.state.targetPiece[1];
    const curCol = this.state.targetPiece[2];

    this.setState(state => {
      // move the piece
      state.board[curRow][curCol] = 0;
      state.board[r][c] = state.targetPiece[0];

      //undo highlight of cube
      state.board.forEach((row, index) => {
        let highlighted = row.indexOf(1);
        if (highlighted !== -1) {
          state.board[index][highlighted] = 0;
        }
      })
      // record last moved piece
      state.lastMovedPiece = state.targetPiece[0];
      return state;
    })
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
                  const pos = i.toString() + j.toString();
                  if (cube === 'r') return (
                    <div key={j} className="cube">
                      <Piece color="red" position={pos} />
                    </div>);
                  if (cube === 'b') return (
                    <div key={j} className="cube">
                      <Piece color="black" position={pos} />
                    </div>);
                  if (cube === 0) return (
                    <div key={j} className="cube empty" data-pos={pos}>
                    </div>);
                  if (cube === 1) return (
                    <div key={j} className="cube highlight" data-pos={pos} style={highlightCubeStyle}>
                  </div>)
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
