import React from "react";
import {withRouter} from "react-router-dom"
import styled from "styled-components";

const ResultsContainer = styled.div`
  text-align: center;
  p {
    margin-top: 0;
  }
  .saying {
    font-style: italic;
  }
`

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.reload = this.reload.bind(this);
    this.saying = {
      Lannister: "A Lannister Always Pays His Debts.",
      "The Watch": "I am the shield that guards the realms of men.",
      Targaryen: "Fire and Blood.",
      Stark: "Winter is Coming.",
      Baratheon: "Ours is the Fury.",
      Tyrell: "Growing Strong.",
      Martell: "Unbowed, Unbent, Unbroken.",
      Greyjoy: "What is Dead May Never Die."
    }
    this.message = {
      Lannister: "Enjoy being rich and having an extremely unhealthy relationship with your siblings!",
      "The Watch": "Enjoy living at the edge of the world with a bunch of outcasts!",
      Targaryen: "Enjoy being incredibly ambitious and slightly insane!",
      Stark: "Enjoy being honorable and suffering all the consquences that entails!",
      Baratheon: "Enjoy eating, drinking, and siring many, many children!",
      Tyrell: "Enjoy a blessed life of privilege before winter comes for you, sweet child!",
      Martell: "Enjoy being overly passionate and sharp but tragically doomed!",
      Greyjoy: "Enjoy becoming strong and hardy and pray you don't get seasick!"
    }
  }
  reload() {
    this.props.history.push('/questions/0');
    this.props.setWinner("");
    this.props.setHouses({houses: this.props.initialHouses});
  }
  render() {
    const {winner} = this.props.winner;
    return (
      <ResultsContainer>
        <p>Congratulations, you belong in House {winner}!</p>
        <p className="saying">"{this.saying[winner]}"</p>
        <p>{this.message[winner]}</p>
        <button onClick={this.reload}>Try again</button>
      </ResultsContainer>
    )
  }
}

export default withRouter(Results);