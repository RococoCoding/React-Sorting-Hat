import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Question from "./components/Question";
import Welcome from "./components/Welcome";
import Results from "./components/Results";

class App extends React.Component {
  constructor() {
    super();
    this.state = "";
    this.setWinner = this.setWinner.bind(this);
  }

  setWinner(winner) {
    this.setState({"winner": winner});
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
              winner={this.state}
              />
            </Route>
            <Route path="/questions/:idx">
              <Question 
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
