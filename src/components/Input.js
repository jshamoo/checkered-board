import React from 'react';

class Input extends React.Component {
  constructor(props){
    super(props);
    this.state = { n: 8 }
  }

  handleChange(val) {
    this.setState({n: val});
    this.props.updateSize(val);
  }

  render(){
    return (
      <div>
        <label>Enter the board size (N): </label>
        <input type="number" min="1" value={this.state.n} onChange={e => this.handleChange(e.target.value)}/>
      </div>
    )
  }
}

export default Input;
