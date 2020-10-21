import React from "react";
import { withRouter } from "react-router-dom";

let questions = [
  { text: "What is your favorite color?",
    options: [
      {text: "Black",
      score: {
        TheWatch: 2,
        Greyjoy: 1,
        Stark: 1,
      }},

      {text: "Red",
      score: {
        Baratheon: 2,
        Lannister: 1,
      }},

      {text: "Green",
      score: {
        Martell: 1,
        Tyrell: 1,
      }},

      {text: "Gold",
      score: {
        Lannister: 1,
        Targaryean: 1,
      }},
    ],
  },
  {text: "Would you rather be hot or cold?",
    options: [
      {text: "Hot",
      score: {
        TheWatch: -1,
        Targaryean: 2,
      }}, 
      {text: "Cold",
      score: {
        Stark: 2,
        Greyjoy: 1,
      }},
      {text: "Warm",
      score: {
        Lannister: 1,
        Martell: 1,
        Tyrell: 1,
      }},
      {text: "Freezing",
      score: {
        TheWatch: 2,
        Stark: 1,
        Targaryean: -1,
      }},
    ],
  },
  // {text: "Why would you kill a family member?",
  // options: ["Love", "Power", "No reason (for fun)", "No reason (would never)"],
  // score: null,},
  // {text: "Who would you spend the night with?",
  // options: ["Friends", "My lover", "My sister/brother", "My pets"],
  // answer: null,},
  // {text: "How much money is in your wallet?",
  // options: ["It's empty", "Wads of cash", "A few bucks", "Who needs money when you've got a credit card?"],
  // answer: null,},
  // {text: "Murder is an appropriate method of career advancement.",
  // options: ["Agree", "Disagree", "Depends on who's getting axed", "Neither agree nor disagree"],
  // answer: null,},
]

let houses = {
  Lannister: 0,
  Baratheon: 0,
  TheWatch: 0,
  Tyrell: 0,
  Martell: 0,
  Greyjoy: 0,
  Targaryean: 0,
  Stark: 0,
}

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      selection: null,
      houses: houses,
    };
    this.submit = this.submit.bind(this);
    this.pick = this.pick.bind(this);
  }

  pick(e) {
    this.setState({...this.state, selection: e.target.value});
  }

  submit(e) {
    e.preventDefault();
    let hist = this.props.history;
    let scores = JSON.parse(this.state.selection);
    let newHouses = {...this.state.houses}; //create newHouses obj to edit then replace state
    let nextPage = this.state.page + 1;

    for (let key in scores) { //loop through selection values to add scores to newHouses
      newHouses[key] = newHouses[key] + scores[key];
    }

    if (nextPage < questions.length) { //if there are more questions, update state & page & go to next page
      this.setState({...this.state, ["houses"]: newHouses, ["page"]: nextPage}, ()=> {
        if (hist) hist.push(`./${this.state.page}`);
      });
    }
    else { //if last question, update state, calculate highest score, set winner, go to results page
      this.setState({...this.state, ["houses"]: newHouses});
      let highestNum = 0;
      let highestName = "";
      for (let key in this.state.houses) {
        if (this.state.houses[key] > highestNum) {
          highestNum = this.state.houses[key];
          highestName = key;
        }
      }
      this.props.setWinner(highestName);
      if(hist) hist.push("/results");
    }
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <p>{questions[this.state.page].text}</p>
        {questions[this.state.page].options.map(option => {
          return (
            <label key={option.text} htmlFor={option.text}>
              <input 
                type="radio"
                name="options"
                value={JSON.stringify(option.score)}
                onChange={this.pick}
              />{option.text}
            </label>
          );
        })}
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default withRouter(Question);