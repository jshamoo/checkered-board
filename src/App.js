import React from 'react';
import Input from './components/Input';

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

  createBoard() {
    let board = [];
    let n = this.state.size;
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        if (i === 0 || i === 1) {
          row.push(<div className="cube" key={i + j}><div className="red-piece"></div></div>);
        } else if (i === n - 1 || i === n - 2){
          row.push(<div className="cube" key={i + j}><div className="black-piece"></div></div>);
        } else {
          row.push(<div className="cube" key={i + j}></div>);
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
        <div className="board">
          {this.createBoard()}
        </div>
      </div>
    )
  }

}

export default App;
