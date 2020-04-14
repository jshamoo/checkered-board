import React from 'react';
import Input from './components/Input';
import ControlPanel from './components/ControlPanel';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      size: 8,
      piecePosition: null,
      lastPieceMoved: null,
    }
    this.updateSize = this.updateSize.bind(this);

  }

  updateSize(n) {
    this.setState({size: n})
  }

  handleClick(e) {
    if (e.target.className.includes('piece')) {
      this.setState({ piecePosition: e.target.dataset.pos})
      this.handlePieceClick(e);
    } else if (e.target.id === 'suggestA' || e.target.id === 'suggestB') {
      let newPosition = e.target.dataset.pos;
      this.handleMove(newPosition, this.state.piecePosition);
      document.querySelector('#suggestA').removeAttribute('id');
      document.querySelector('#suggestB').removeAttribute('id');
    } else {
      return;
    }
  }

  handlePieceClick(e) {
    const piece = e.target;
    this.highlightPiece(piece);

    const currentPosition = piece.dataset.pos;

    let pieceMoveDirection;
    if (piece.className.includes("red-piece")) {
      pieceMoveDirection = 1;
    } else {
      pieceMoveDirection = -1;
    }

    this.suggestMove(currentPosition, pieceMoveDirection);
  }

  suggestMove(currentPosition, direction) {
    // parse current position
    const curRow = Number(currentPosition[0]);
    const curCol = Number(currentPosition[1]);

    // get the two potential positions
    let potentialPositionA = null;
    let potentialPositionB = null;
    let newRow = curRow + direction;
    if (newRow >= 0 && newRow < this.state.size && curCol + 1 < this.state.size) {
      potentialPositionA = (curRow + direction).toString() + (curCol + 1).toString();
    }
    if (newRow >= 0 && newRow < this.state.size && curCol - 1 >= 0) {
      potentialPositionB = (curRow + direction).toString() + (curCol - 1).toString();
    }

    // check if there is a piece
    const pieces = document.querySelectorAll('.piece');
    for (let i = 0; i < pieces.length; i++) {
      if (pieces[i].dataset.pos === potentialPositionA) {
        potentialPositionA = null;
      }
      if (pieces[i].dataset.pos === potentialPositionB) {
        potentialPositionB = null;
      }
    }

    if (potentialPositionA !== null) {
      let potentialCubeA = document.querySelector(`.cube[data-pos='${potentialPositionA}']`);
      // had to use id to get a higher specificity in css (not recommended)
      potentialCubeA.id = 'suggestA';
    }
    if (potentialPositionB !== null) {
      let potentialCubeB = document.querySelector(`.cube[data-pos='${potentialPositionB}']`);
      potentialCubeB.id = 'suggestB';
    }
  }

  handleMove(newPosition, piecePosition) {
    const parentNode = document.querySelector(`.cube[data-pos='${piecePosition}']`);
    const childNode = document.querySelector(`.piece[data-pos='${piecePosition}']`);
    const newParentNode = document.querySelector(`.cube[data-pos='${newPosition}']`);

    if (childNode.className.includes('red-piece') && this.state.lastPieceMoved === 'red') return;
    if (childNode.className.includes('black-piece') && this.state.lastPieceMoved === 'black') return;

    if (childNode.className.includes('red-piece')) {
      parentNode.removeChild(childNode);
      let newChild = document.createElement('div');
      newChild.classList.add('red-piece', 'piece');
      newChild.setAttribute('data-pos', newPosition);
      newParentNode.appendChild(newChild)
      this.setState({lastPieceMoved: 'red'})
    }
    if (childNode.className.includes('black-piece')){
      parentNode.removeChild(childNode);
      let newChild = document.createElement('div');
      newChild.classList.add('black-piece', 'piece');
      newChild.setAttribute('data-pos', newPosition);
      newParentNode.appendChild(newChild)
      this.setState({ lastPieceMoved: 'black' })
    }
  }

  highlightPiece(piece) {
    if (!piece.className.includes('piece')) return;
    piece.classList.add('active')
  }

  removeTransition(e) {
    e.target.classList.remove('active');
  }


  createBoard() {
    let board = [];
    let n = this.state.size;
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        let pos = i.toString() + j.toString();
        if (i === 0 || i === 1) {
          row.push(
            <div className="cube"
              data-pos={pos} key={i + j}
            >
              <div className="red-piece piece"
                data-pos={pos}
              ></div>
          </div>);
        } else if (i === n - 1 || i === n - 2){
          row.push(
          <div className="cube" data-pos={pos} key={i + j}>
              <div className="black-piece piece" data-pos={pos}></div>
          </div>);
        } else {
          row.push(<div className="cube" data-pos={pos} key={i + j} ></div>);
        }

      }
    board.push(<div className="row" key={i}>{row}</div>);
    }
    return board;
  }

  render() {
    return (
      <div className="App">
        <Input updateSize={this.updateSize}/>
        <div className="board"
          onClick={e => this.handleClick(e)}
          onTransitionEnd={e => this.removeTransition(e)}
        >
          {this.createBoard()}
        </div>
        <ControlPanel />
      </div>
    )
  }

}

export default App;
