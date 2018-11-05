import React, { Component, Fragment } from "react";
import { oneOfType, instanceOf, Date, string, bool, number } from "prop-types";
import _ from "lodash";
import moment from "moment";
import Countdown from "react-countdown-moment";
import Icon from "../Icons";
import CountdownContainer from "./CountDownContainer";
import styles from "./CountDown.module.css";

class Timer extends Component {
  renderFormatTime = secs => {
    let minutes = Math.floor(secs / 60);
    secs = secs % 60;

    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    return `${_.padStart(hours, 1, "0")}:${_.padStart(
      minutes,
      1,
      "0"
    )}:${_.padStart(secs, 1, "0")}`;
  };

  render() {
    const {
      dateTimeLimit,
      isStarted,
      isVisible,
      timePlaceholder,
      timeWarning
    } = this.props;

    return (
      <div className="Grid u-flex u-flexAlignItemsCenter">
        {isVisible && (
          <Fragment>
            <Icon
              name="CountDown"
              height={36}
              width={36}
              className={styles.icon}
              fill={timeWarning ? "#FFE919" : "#FFFFFF"}
            />

            {isStarted ? (
              <Countdown endDate={moment(dateTimeLimit)} />
            ) : (
              `${this.renderFormatTime(timePlaceholder)}`
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

Timer.propTypes = {
  dateTimeLimit: oneOfType([instanceOf(Date), string]).isRequired, // DateTime limit to finish game
  isStarted: bool.isRequired, // Timer is started
  isVisible: bool, // Timer is visible
  timePlaceholder: number.isRequired // Display placeholder of how many time the player will have. In seconds
};

Timer.defaultProps = {
  dateTimeLimit: 0
};

export default CountdownContainer(Timer);
