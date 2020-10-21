import React from "react";
import {withRouter} from "react-router"

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  };

  clickHandler() {
    let hist = this.props.history
    if(hist) hist.push(`questions/0`);
  };

  render() {
    return (
      <div className="welcome-page">
        <div className="welcome-message-container">
          <p className="welcome-message">Welcome dear traveler! I am the sorting hat. My solemn duty is to send you on the right path. Just answer these few questions and we'll direct you to the House you belong.</p>
          <button onClick={this.clickHandler}>Take the quiz</button>
        </div>
      </div>
    );
  };
};

export default withRouter(Welcome);