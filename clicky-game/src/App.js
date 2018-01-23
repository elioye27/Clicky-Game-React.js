import React, { Component } from "react";
import CharacterCard from "./components/CharacterCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Instructions from "./components/Instructions";
import characters from "./characters.json";
import "./App.css";

class App extends Component {
  state = {
    score: 0,
    highScore: 0,
    characters: characters
  };

  randomRender = id => {
    this.state.characters.forEach((image) => {
      if (image.id === id) {
        if (image.cliked) {
          // $("#myModal").modal('toggle');
          alert('YOU LOST!! This card was previously selected.');
          this.setState({})
          this.resetGame();
          return false;
        }
        else {
          this.updateScore();
          image.cliked = true;
        }
        if (this.state.score >= this.state.highScore) {
          this.newHighScore();
        }
      }
    });
  }

  randomOrganize = (array) => {
    let copy = [], n = array.length, i;
    while (n) {
      i = Math.floor(Math.random() * array.length);
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }
    this.setState({ characters: copy });
  }

  updateScore = () => {
    this.setState((newState) => ({
      score: newState.score + 1
    }), () => this.winning())
  }

  newHighScore = () => {
    this.setState((newState) => ({
      highScore: newState.score
    }))
  }

  winning = () => {
    if (this.state.score === this.state.characters.length) {
      alert('YOU WIN!! congratulations!')
      this.setState({});
      this.resetGame();
    }
    else {
      setTimeout(() => {
        this.randomOrganize(this.state.characters)
      }, 500);
    }
  }

  resetGame = () => {
    this.state.characters.forEach((image) => {
      image.cliked = false;
    })
    this.setState({ score: 0 })
  }

  // Map over this.state.characters and render a CharacterCard component for each friend object
  render() {
    return (
      <Wrapper>
          <Nav score={this.state.score} highScore={this.state.highScore} />
          <Instructions />
        {this.state.characters.map(friend => {
          return <CharacterCard
            {...friend}
            key={friend.id}
            randomRender={this.randomRender}
            randomOrganize={() => this.randomOrganize(this.state.characters)}
          />;
        })}
      </Wrapper>
  )};
}

export default App;