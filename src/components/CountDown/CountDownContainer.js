import React from "react";
import { oneOfType, instanceOf, Date, string, bool, number } from "prop-types";
import moment from "moment";

const CountDownContainer = Component =>
  class extends React.Component {
    static = {
      dateTimeLimit: oneOfType([instanceOf(Date), string]).isRequired, // DateTime limit to finish game
      isStarted: bool.isRequired, // Timer is started
      isVisible: bool, // Timer is visible
      timePlaceholder: number.isRequired // Display placeholder of how many time the player will have. In seconds
    };

    static defaultProps = {
      isVisible: true
    };

    constructor(props) {
      super(props);

      this.state = {
        timeWarning: false // Time warning
      };

      this.interval = setInterval(this.checkTimer, 1000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    checkTimer = () => {
      const { dateTimeLimit } = this.props;

      const secondsRemaining = moment().diff(dateTimeLimit, "seconds") * -1;
      const timeWarning = secondsRemaining < 30;

      this.setState({
        timeWarning
      });
    };

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };

export default CountDownContainer;
