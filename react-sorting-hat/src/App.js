import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Question from "./components/Question";
import Welcome from "./components/Welcome";
import Results from "./components/Results";

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
        <div className="App">
          <header className="App-header">
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
        </div>
      </Router>
    ); 
  };
};

export default App;
