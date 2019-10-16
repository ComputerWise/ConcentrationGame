import React, { Component } from "react";
import "./Game.css";
import Card from "./Card";

const DECK_COLOURS = ["RED", "GREEN", "BLUE", "YELLOW", "PINK", "PURPLE"];
const DECK_POKEMON = [
  "PIKACHU",
  "SQUIRTLE",
  "CHARMANDER",
  "BULBASAUR",
  "JIGGLYPUFF",
  "MEW"
];

const DECKS = {
  POKEMON: DECK_POKEMON,
  COLOURS: DECK_COLOURS
};

const GAME_MODES = {
  POKEMON: "POKEMON",
  COLOURS: "COLOURS"
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      duplicatedCards: [],
      shuffledCards: [],
      finalDeck: [],
      openedCards: [],
      matchedCards: [],
      moves: 0,
      gameOver: false
    };
  }

  componentDidMount() {
    this.start();
  }

  showPrefs() {
    document.getElementById("popup-options").style.display = "block";
  }

  setPrefs = event => {
    const gameMode = event.target.value.toUpperCase();
    console.log("Saving " + gameMode);
    localStorage.setItem("deck", gameMode);
    console.log("New: " + gameMode);
  };

  start() {
    if (!localStorage.getItem("deck"))
      localStorage.setItem("deck", GAME_MODES.COLOURS);
    const gameMode = localStorage.getItem("deck");
    const deck = DECKS[gameMode];
    const duplicatedCards = deck.concat(deck);
    const shuffledCards = this.shuffle(duplicatedCards);
    let finalDeck = [];
    shuffledCards.map((name, index) => {
      return finalDeck.push({
        name,
        close: true,
        complete: false,
        fail: false
      });
    });

    const moves = 0;
    const gameOver = false;

    document.getElementById(
      "popup-over"
    ).style.display = document.getElementById("popup-options").style.display =
      "none";

    this.setState({
      cards: deck,
      duplicatedCards,
      shuffledCards,
      finalDeck,
      matchedCards: [],
      openedCards: [],
      moves,
      gameOver
    });
  }

  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  handleClick(name, index) {
    if (
      this.state.openedCards.length === 2 &&
      this.state.openedCards[0].index !== index
    ) {
      setTimeout(() => {
        this.checkMatch();
      }, 750);
    } else {
      let card = {
        name,
        index
      };
      let finalDeck = this.state.finalDeck;
      let cards = this.state.openedCards;
      finalDeck[index].close = false;

      cards.push(card);
      this.setState({
        openedCards: cards,
        finalDeck: finalDeck
      });
      if (this.state.openedCards.length === 2) {
        const moves = this.state.moves;
        this.setState({ moves: moves + 1 });
        setTimeout(() => {
          this.checkMatch();
        }, 750);
      }
    }
  }

  checkMatch() {
    let finalDeck = this.state.finalDeck;
    if (
      this.state.openedCards[0] &&
      this.state.openedCards[1] &&
      this.state.openedCards[0].name === this.state.openedCards[1].name &&
      this.state.openedCards[0].index !== this.state.openedCards[1].index
    ) {
      finalDeck[this.state.openedCards[0].index].complete = true;
      finalDeck[this.state.openedCards[1].index].complete = true;

      const currentMatches = this.state.matchedCards;
      const matchedCards = currentMatches.concat(
        finalDeck[this.state.openedCards[1].index].name
      );
      this.setState({ matchedCards });
    } else {
      if (this.state.openedCards[0])
        finalDeck[this.state.openedCards[0].index].close = true;
      if (this.state.openedCards[1])
        finalDeck[this.state.openedCards[1].index].close = true;
    }

    this.setState({
      finalDeck,
      openedCards: []
    });

    if (this.state.cards.length === this.state.matchedCards.length) {
      this.setState({ gameOver: true });
    }
  }

  render() {
    if (this.state.gameOver) {
      document.getElementById("popup-over").style.display = "block";
    }
    return (
      <div>
        <div className="header">
          <h1>Concentration</h1>
          <div className="header-right">
            <button
              className="button grey"
              onClick={() => {
                this.showPrefs();
              }}
            >
              OPTIONS
            </button>
            <button
              className="button purple"
              onClick={() => {
                this.start();
              }}
            >
              NEW GAME
            </button>
          </div>
        </div>
        <div className="game-board">
          {this.state.finalDeck.map((card, index) => {
            return (
              <Card
                key={index}
                deck={localStorage.getItem("deck")}
                card={card.name}
                click={() => {
                  this.handleClick(card.name, index);
                }}
                close={card.close}
                complete={card.complete}
              />
            );
          })}
        </div>
        <div id="popup-options">
          <div className="popup-inner">
            <h2>Options</h2>
            <form>
              <p>Select a tile set:</p>
              <select
                value={localStorage.getItem("deck")}
                onChange={this.setPrefs}
              >
                <option id="COLOURS" name="tiles" value="COLOURS">
                  Colours
                </option>
                <option id="POKEMON" name="tiles" value="POKEMON">
                  Pokemon
                </option>
              </select>
              <button
                className="button purple"
                onClick={() => {
                  this.start();
                }}
              >
                NEW GAME
              </button>
            </form>
          </div>
        </div>
        <div id="popup-over">
          <div className="popup-inner">
            <h2>You win!</h2>
            <p>It took {this.state.moves} moves</p>
            <button
              className="button purple"
              onClick={() => {
                this.start();
              }}
            >
              NEW GAME
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
