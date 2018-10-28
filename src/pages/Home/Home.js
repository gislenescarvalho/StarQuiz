import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { object } from "prop-types";

import styles from "./Home.module.css";
import Icon from "../../components/Icons";

class Home extends Component {
  state = {
    title: "StarQuiz!",
    description: "Teste os seus conhecimentos!",
    btnStart: "Começar"
  };

  handleStartGame = () => this.props.history.push("/game");

  render() {
    const { title, description, btnStart } = this.state;
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <Icon
          name="DarthVader"
          className={styles.icon}
          alt="Darth Vader Icon"
        />
        <p className={styles.description}>{description}</p>
        <button onClick={this.handleStartGame} className={styles.btnStart}>
          {btnStart}
        </button>
      </div>
    );
  }
}

Home.propTypes = {
  history: object
};

Home.defaultProps = {
  history: {}
};

export default withRouter(Home);
