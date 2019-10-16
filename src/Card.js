import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  clicked(card) {
    this.props.click(card);
  }
  render() {
    console.log("Deck: " + this.props.deck);
    const card = (
      <img
        src={"tiles/" + this.props.deck + "/" + this.props.card + ".png"}
        alt={this.props.card}
      />
    );
    return (
      <div
        className={
          "card" +
          (!this.props.close ? " opened" : "") +
          (this.props.complete ? " matched" : "")
        }
        onClick={() => this.clicked(this.props.card)}
      >
        <div className="front">?</div>
        <div className="back">{card}</div>
      </div>
    );
  }
}

export default Card;
