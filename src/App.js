import React from 'react';
import Input from './components/Input';
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

  render() {
    let redPiece = (<div className="red piece"></div>);
    let blackPiece = (<div className="black piece"></div>);
    return (
      <div className="App">
        <Input updateSize={this.updateSize}/>
        {this.state.board.map((row, index) => {
          return (
            <div className="row" key={index}>
              {row.map((cube, index) => {
                if (cube === 'r') return (<div key={index} className="cube">{redPiece}</div>);
              if (cube === 'b') return (<div key={index} className="cube">{blackPiece}</div>);
                if (cube === 0) return (<div key={index} className="cube"></div>);
              })}
            </div>
          )
        })}
        <ControlPanel />
      </div>
    )
  }

}

export default App;
