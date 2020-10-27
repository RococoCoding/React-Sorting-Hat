import React from "react";
import {withRouter} from "react-router"
import styled from "styled-components";

const ClassPage = styled.div`
  text-align: center;
  .welcome-message {
    font-size: 1.1rem;
    text-align: center;
  }
  p{
    margin-top: 0;
  }
  button {
    margin: 0 auto;
  }
  @media (max-width: 500px) {
    margin: 0 2%;
    button {
      margin-top: 4%;
      margin-bottom: 7%;
    }
  }
`

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
      <ClassPage>
        <div className="welcome-message-container">
          <p className="welcome-message">Welcome dear traveler! I am the sorting hat. My solemn duty is to send you on the right path. Just answer these few questions and we'll direct you to the House you belong.</p>
          <button onClick={this.clickHandler}>Take the quiz</button>
        </div>
      </ClassPage>
    );
  };
};

export default withRouter(Welcome);