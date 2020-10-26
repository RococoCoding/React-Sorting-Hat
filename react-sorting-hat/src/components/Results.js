import React from "react";
import {withRouter} from "react-router-dom"

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.reload = this.reload.bind(this);
  }
  reload() {
    this.props.history.push('/questions/0');
    this.props.setWinner("");
    this.props.setHouses({houses: this.props.initialHouses});
  }
  render() {
    const {winner} = this.props.winner;
    return (
      <div>
        <p>{winner}</p>
        <button onClick={this.reload}>Try again</button>
      </div>
    )
  }
}

export default withRouter(Results);