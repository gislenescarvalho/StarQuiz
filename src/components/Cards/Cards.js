import React, { Component } from "react";
import styles from "./Cards.module.css";
import { string, func } from "prop-types";

class Cards extends Component {
  render() {
    const { showDetails, showInput } = this.props;
    return (
      <article class="bg-white br3 center mw5 ba b--black-10 mv4">
        <img
          src="http://tachyons.io/img/cat-720.jpg"
          class="w-100 db"
          alt="Cat"
        />
        <div class="flex items-center justify-center pa4">
          <div
            class="f5 no-underline dark-blue bg-animate hover-bg-white hover-white inline-flex items-center pa3 ba br2 border-box mr4 pointer"
            onClick={showDetails}
          >
            <span className={styles.question}>?</span>
          </div>
          <div
            class="f5 no-underline dark-green bg-animate hover-bg-white hover-white inline-flex items-center pa3 ba br2 border-box pointer"
            onClick={showInput}
          >
            <span className={styles.more}>...</span>
          </div>
        </div>
      </article>
    );
  }
}

Cards.propTypes = {
  showDetails: func.isRequired,
  showInput: func.isRequired
};

export default Cards;
