import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Question from "./components/Question";
import Welcome from "./components/Welcome";
import Results from "./components/Results";
import styled from "styled-components";

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Average', serif;
  h1 {
    font-family: 'Grenze', serif;
  }
   
  img {
    margin: 2% auto;
    display: block;
    width: 30%;
  }
  @media (max-width: 500px) {
    img {
      width: 80%;
      margin-top: 5%;
    }
  }
`

let houses = {
  Lannister: 0,
  Baratheon: 0,
  "The Watch": 0,
  Tyrell: 0,
  Martell: 0,
  Greyjoy: 0,
  Targaryen: 0,
  Stark: 0,
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      houses: houses,
    };
    this.setWinner = this.setWinner.bind(this);
    this.setHouses = this.setHouses.bind(this);
  }

  setWinner(winner) {
    this.setState({"winner": winner});
  }

  setHouses(obj){
    this.setState(obj);
  }

  render() {
    return (
      <Router> 
        <PageContainer>
          <header className="App-header">
            <h1>THE GoT SORTING HAT</h1>
          </header>
          <Switch>
            <Route path="/results">
              <Results
              setHouses={this.setHouses}
              setWinner={this.setWinner}
              winner={this.state}
              initialHouses={houses}
              />
            </Route>
            <Route path="/questions/:idx">
              <Question
                houses={this.state.houses}
                setHouses={this.setHouses}
                setWinner={this.setWinner}
              />
            </Route>
            <Route exact path="/">
              <Welcome 
              />
            </Route>
          </Switch>
          <img src="/assets/hat.jpg" alt="smiling jack 'o lantern wearing a black witch hat"/>
        </PageContainer>
      </Router>
    ); 
  };
};

export default App;
