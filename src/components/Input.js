import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { size: 8}
  }
  handleChange = (val) => {
    this.props.updateSize(val);
    this.setState({size: val})
  }

  render(){
    return (
      <div>
        <label>Enter the board size (N): </label>
        <input
          type="number"
          min="1"
          value={this.state.size}
          onChange={e => this.handleChange(e.target.value)}
        />
      </div>
    )
  }
}

export default Input;
