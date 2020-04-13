import React from 'react';
import Input from './components/Input';
import ControlPanel from './components/ControlPanel';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {size: 8}
    this.updateSize = this.updateSize.bind(this);
  }

  updateSize(n) {
    this.setState({size: n})
  }

  handleClick(e) {
    console.log(e.target.className)
    const piece = e.target;
    if (!piece.className.includes('piece')) return;
    piece.classList.add('active')
  }


  createBoard() {
    let board = [];
    let n = this.state.size;
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        if (i === 0 || i === 1) {
          row.push(<div className="cube" data-pos={i.toString() + j.toString()} key={i + j}><div className="red-piece piece"></div></div>);
        } else if (i === n - 1 || i === n - 2){
          row.push(<div className="cube" data-pos={i.toString() + j.toString()} key={i + j}><div className="black-piece piece"></div></div>);
        } else {
          row.push(<div className="cube" data-pos={i.toString() + j.toString()} key={i + j}></div>);
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
