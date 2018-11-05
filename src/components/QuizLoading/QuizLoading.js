import React from "react";
import { bool, string, number, func } from "prop-types";

import Loading from "../Loading/Loading";

import LoadingContainer from "./LoadingContainer";
import styles from "./QuizLoading.module.css";

const QuizLoading = props => {
  const { isReadyToStart, loadingMessage, timeLeft } = props;

  return (
    <div className={styles.gameLoadingWrapper}>
      {isReadyToStart ? (
        <div className={styles.contador}>{timeLeft}</div>
      ) : (
        [
          <div key="info" className={styles.info}>
            <Loading isOpen={!isReadyToStart} />
            {loadingMessage}
          </div>
        ]
      )}
    </div>
  );
};

QuizLoading.propTypes = {
  isReadyToStart: bool.isRequired, // Game is ready to start
  loadingMessage: string.isRequired, // Message to display while loading
  timeLeft: number.isRequired // Counter to start game
};

export default LoadingContainer(QuizLoading);
