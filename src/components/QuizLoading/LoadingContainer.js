import React from "react";
import { bool, string, func } from "prop-types";

const LoadingContainer = Component =>
  class extends React.Component {
    static propTypes = {
      isReadyToStart: bool.isRequired, // Game is ready to start
      loadingMessage: string, // Message to display while loading
      startGame: func.isRequired // Function to start a game
    };

    static defaultProps = {
      loadingMessage: "O seu jogo começará em instantes...."
    };

    constructor(props) {
      super(props);

      this.state = {
        timeLeft: 3
      };
    }

    componentDidUpdate() {
      const { isReadyToStart } = this.props;

      if (isReadyToStart) {
        setTimeout(this.countdown, 1000);
      }
    }

    countdown = () => {
      const { timeLeft } = this.state;
      const { startGame } = this.props;

      timeLeft > 1
        ? this.setState({
            timeLeft: timeLeft - 1
          })
        : startGame();
    };

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };

export default LoadingContainer;
