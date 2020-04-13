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
    }
    this.updateSize = this.updateSize.bind(this);
    this.highlightPiece = this.highlightPiece.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePieceClick = this.handlePieceClick.bind(this);
    this.createBoard = this.createBoard.bind(this);
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
    } else {
      return;
    }
  }

  handlePieceClick(e) {
    console.log(e.target)
    const piece = e.target;
    this.highlightPiece(piece);

    const currentPosition = piece.dataset.pos;
    console.log(currentPosition);

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
    console.log('row:', curRow, 'col:', curCol)
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
    console.log('1',potentialPositionA, potentialPositionB);

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
    console.log('2',potentialPositionA, potentialPositionB)
    if (potentialPositionA !== null) {
      let potentialCubeA = document.querySelector(`.cube[data-pos='${potentialPositionA}']`);
      // had to use id to get a higher specificity in css (not recommended)
      potentialCubeA.id = 'suggestA';
      console.log(potentialCubeA);
    }
    if (potentialPositionB !== null) {
      let potentialCubeB = document.querySelector(`.cube[data-pos='${potentialPositionB}']`);
      potentialCubeB.id = 'suggestB';
      console.log(potentialCubeB);
    }
  }

  handleMove(newPosition, piecePosition) {
    const parentNode = document.querySelector(`.cube[data-pos='${piecePosition}']`);
    console.log('parentNode', parentNode)
    const childNode = document.querySelector(`.piece[data-pos='${piecePosition}']`);
    console.log('newPosition', newPosition)
    const newParentNode = document.querySelector(`.cube[data-pos='${newPosition}']`);
    console.log('newParentNode', typeof newParentNode)
    parentNode.removeChild(childNode);
    if (childNode.className.includes('red-piece')) {
      let newChild = document.createElement('div');
      newChild.classList.add('red-piece', 'piece');
      newChild.setAttribute('data-pos', newPosition);
      newParentNode.appendChild(newChild)
    } else {
      let newChild = document.createElement('div');
      newChild.classList.add('black-piece', 'piece');
      newChild.setAttribute('data-pos', newPosition);
      newParentNode.appendChild(newChild)
    }
  }

  highlightPiece(piece) {
    if (!piece.className.includes('piece')) return;
    piece.classList.add('active')
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
          <div className="cube" data-pos={pos} key={i + j}>
            <div className="red-piece piece" data-pos={pos}></div>
          </div>);
        } else if (i === n - 1 || i === n - 2){
          row.push(
          <div className="cube" data-pos={pos} key={i + j}>
            <div className="black-piece piece" data-pos={pos}></div>
          </div>);
        } else {
          row.push(<div className="cube" data-pos={pos} key={i + j}></div>);
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
        <div className="board" onClick={e => this.handleClick(e)}>
          {this.createBoard()}
        </div>
        <ControlPanel />
      </div>
    )
  }

}

export default App;
