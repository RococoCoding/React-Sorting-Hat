import React from "react";

class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {winner} = this.props.winner;
    return (
      <div>
        {winner}
      </div>
    )
  }
}

export default Results;