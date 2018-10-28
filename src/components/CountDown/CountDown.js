import React, { Component } from "react";
import { number } from "prop-types";
import Countdown from "react-countdown-now";
import Icon from "../Icons";
import styles from "./CountDown.module.css";

class CountDown extends Component {
  // Stop game when the time done.
  handleTimeIsUp = () => console.log("Your time is over !!!!!");

  // Renderer callback with condition
  renderFormatTime = ({ minutes, seconds, completed }) => {
    if (completed)
      return (
        <p className={styles.timer}>
          {minutes}:{seconds}
        </p>
      );
    return (
      <p className={styles.timer}>
        {minutes}:{seconds}
      </p>
    );
  };

  render() {
    const { time } = this.props;
    return (
      <div className="Grid u-flex u-flexAlignItemsCenter">
        <Icon name="CountDown" height={36} width={36} className={styles.icon} />
        <Countdown
          date={Date.now() + time}
          onComplete={this.handleTimeIsUp}
          renderer={this.renderFormatTime}
        />
      </div>
    );
  }
}

CountDown.propTypes = {
  time: number
};

CountDown.defaultProps = {
  time: 0
};

export default CountDown;
