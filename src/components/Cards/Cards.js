import React, { Component } from "react";
import styles from "./Cards.module.css";
import { string, func } from "prop-types";

class Cards extends Component {
  render() {
    return (
      <article class="bg-white br3 center mw5 ba b--black-10 mv4">
        <img
          src="http://tachyons.io/img/cat-720.jpg"
          class="w-100 db"
          alt="Cat"
        />
        <div class="flex items-center justify-center pa4">
          <a
            href="#0"
            class="f5 no-underline dark-blue bg-animate hover-bg-white hover-white inline-flex items-center pa3 ba br2 border-box mr4"
          >
            <span className={styles.question}>?</span>
          </a>
          <a
            href="#0"
            class="f5 no-underline dark-green bg-animate hover-bg-white hover-white inline-flex items-center pa3 ba br2 border-box"
          >
            <span className={styles.more}>...</span>
          </a>
        </div>
      </article>
    );
  }
}

export default Cards;
