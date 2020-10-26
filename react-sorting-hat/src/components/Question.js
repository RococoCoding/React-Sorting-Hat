import React from "react";
import { withRouter } from "react-router-dom";

let questions = [
  { 
    text: "What is your favorite color?",
    options: [
      {text: "Black",
      score: {
        "The Watch": 1,
        Greyjoy: 1,
        Stark: 1,
        Targaryen: 1,
      }},
      {text: "Red",
      score: {
        Lannister: 1,
        Martell: 1,
        Targaryen: 1,
      }},
      {text: "Green",
      score: {
        Tyrell: 1,
      }},
      {text: "Gold",
      score: {
        Baratheon: 1,
        Lannister: 1,
        Martell: 1,
      }},
    ],
  },
  {
    text: "Would you rather be hot or cold?",
    options: [
      {text: "Hot",
      score: {
        "The Watch": -1,
        Targaryen: 2,
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
        "The Watch": 2,
        Stark: 1,
        Targaryen: -1,
      }},
    ],
  },
  {
    text: "You're a...",
    options: [
      {text: "Lover",
      score: {
        Martell: 1,
        Baratheon: 1,
        Tyrell: 1,
        Targaryen: 1,
      }},
      {text: "Fighter",
      score: {
        Greyjoy: 1,
        Stark: 1,
        Martell: 1,
        "The Watch": 1,
      }},
      {text: "Survivor",
      score: {
        Targaryen: 1,
        Greyjoy: 1,
        "The Watch": 1,
      }},
      {text: "Thinker",
      score: {
        Stark: 1,
        Lannister: 1,
        Tyrell: 1,
      }},
    ],
  },
  {
    text: "You prefer to spend your nights with...",
    options: [
      {text: "Friends",
      score: {
        Baratheon: 1,
        Stark: 1,
        Tyrell: 1,
        Greyjoy: 1,
      }},
      {text: "Lovers",
      score: {
        Baratheon: 1,
        Lannister: 1,
        Martell: 1,
      }},
      {text: "Siblings",
      score: {
        Lannister: 2,
        "The Watch": 1,
        Tyrell: 1,
      }},
      {text: "Pets",
      score: {
        Stark: 1,
        Targaryen: 1,
      }},
    ],
  },
  {
    text: "How much money is in your wallet?",
    options: [
      {text: "Running on empty.",
      score: {
        "The Watch": 2,
      }},
      {text: "I've got a few bucks.",
      score: {
        Baratheon: 1,
        Greyjoy: 1,
        Stark: 1, 
        Tyrell: 1,
      }},
      {text: "I've got all the benjamins.",
      score: {
        Lannister: 1,
        Martell: 1,
      }},
      {text: "Who needs cash when you've got a credit card?",
      score: {
        Targaryen: 1,
        Lannister: 1,
      }},
    ],
  },
  {
    text: "Murder is an appropriate method of career advancement.",
    options: [
      {text: "Agree.",
      score: {
        Lannister: 2,
        Greyjoy: 1,
      }},
      {text: "Disagree.",
      score: {
        Stark: 1,
      }},
      {text: "Depends on who's getting axed.",
      score: {
        "The Watch": 1,
        Martell: 1,
        Targaryen: 1,
        Tyrell: 1, 
        Baratheon: 1,
      }},
    ],
  },
];

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      selection: null,
    };
    this.submit = this.submit.bind(this);
    this.pick = this.pick.bind(this);
  }

  pick(e) {
    this.setState({...this.state, selection: e.target.value});
    console.log(this.props.houses)
  }

  submit(e) {
    e.preventDefault();
    let hist = this.props.history;
    let scores = JSON.parse(this.state.selection);
    let newHouses = {...this.props.houses}; //create newHouses obj to edit then replace state
    let nextPage = this.state.page + 1;

    for (let key in scores) { //loop through selection values to add scores to newHouses
      newHouses[key] = newHouses[key] + scores[key];
    }

    if (nextPage < questions.length) { //if there are more questions, update state & page & go to next page
      this.props.setHouses({houses: newHouses});
      this.setState({...this.state, ["page"]: nextPage}, ()=> {
        if (hist) hist.push(`./${this.state.page}`);
      });
    }
    else { //if last question, update state, calculate highest score, set winner, go to results page
      this.props.setHouses({houses: newHouses});
      let highestNum = 0;
      let highestName = "";
      for (let key in this.props.houses) {
        if (this.props.houses[key] > highestNum) {
          highestNum = this.props.houses[key];
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