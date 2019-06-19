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
        <div className="back">
          <span className={this.props.card} />
        </div>
      </div>
    );
  }
}

export default Card;
