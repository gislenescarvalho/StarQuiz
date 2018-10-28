import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Grid from "../../components/Grid/Grid";
import styles from "./Game.module.css";

class Game extends Component {
  state = {
    title: "StarQuiz!",
    sizeLogo: {
      lg: 70,
      md: 50,
      sm: 40
    },
    time: 120000
  };
  render() {
    const { sizeLogo, title, time } = this.state;
    return (
      <div className={`${styles.container} Grid-cell`}>
        <Header sizeLogo={sizeLogo} title={title} time={time} />

        <Grid />
      </div>
    );
  }
}
export default Game;
