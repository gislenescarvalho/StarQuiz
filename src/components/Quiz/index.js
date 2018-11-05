import React from "react";
import { withRouter } from "react-router-dom";
import {
  arrayOf,
  oneOfType,
  instanceOf,
  shape,
  Date,
  func,
  object,
  bool,
  string,
  number
} from "prop-types";

import Header from "../Header/Header";
import Card from "../Cards/Cards";
import { ModalDetails, ModalInput, ModalResult } from "../Modal";
import QuizLoading from "../QuizLoading/QuizLoading";
import Pagination from "../Pagination";
import QuizContainer from "./QuizContainer";
import styles from "./Quiz.module.css";

const Quiz = props => {
  const {
    answers,
    closeHintModal,
    dateTimeEnded,
    dateTimeLimit,
    dateTimeStart,
    email,
    goToNextPage,
    goToPreviousPage,
    handleItemGuessInputChange,
    hasNext,
    hasPrevious,
    isExpired,
    isGameFinished,
    isGameReady,
    itens,
    itensPerPage,
    loadCharacterInfo,
    name,
    openHintModal,
    play,
    saveGameData,
    score,
    startGame
  } = props;

  const array = Array(itensPerPage).fill(0);

  return (
    <div className={`${styles.container} Grid-cell`}>
      <Header
        sizeLogo={{
          lg: 70,
          md: 50,
          sm: 40
        }}
        title={"StarQuiz!"}
        dateTimeLimit={dateTimeLimit}
        isStarted={!!dateTimeStart}
        isVisible={!isGameFinished}
        timePlaceholder={props.timeLimit}
      />

      <div className={styles.items}>
        {itens
          ? itens.map(item => {
              const answer = answers.find(a => a.url == item.url);

              const playerGuess = answer ? answer.text : "";
              const openedModal = answer ? answer.openedModal : false;

              return (
                <Card
                  {...item}
                  closeHintModal={closeHintModal}
                  handleInputChange={handleItemGuessInputChange}
                  id={item.url}
                  imageUrl={item.imageUrl}
                  isPlaceholder={isGameFinished || !dateTimeStart}
                  key={item.url}
                  loadCharacterInfo={loadCharacterInfo}
                  openedModal={openedModal}
                  openHintModal={openHintModal}
                  play={play}
                  playerGuess={playerGuess}
                />
              );
            })
          : array.map((number, i) => <Card key={i} isPlaceholder={true} />)}
      </div>

      {!isGameFinished && (
        <Pagination
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      )}
      <QuizLoading isReadyToStart={isGameReady} startGame={startGame} />

      <ModalResult
        hasResult={isGameFinished && score != null}
        loading={score == null}
        playerEmail={email}
        playerName={name}
        saveGameData={saveGameData}
        score={score}
      />
    </div>
  );
};

Quiz.propTypes = {
  answers: arrayOf(
    shape({
      text: string, // Player answer
      url: string // Url of the actual char
    })
  ), //
  closeHintModal: func, // Function to close hint modal
  dateTimeEnded: oneOfType([
    // DateTime that the game was ended
    string,
    instanceOf(Date)
  ]),
  dateTimeLimit: oneOfType([
    // DateTime limit to finish the game
    string,
    instanceOf(Date)
  ]),
  dateTimeStart: oneOfType([
    // DateTime that the game was started
    string,
    instanceOf(Date)
  ]),
  email: string, // Email of the player
  goToNextPage: func, // Function to go to next page
  goToPreviousPage: func, // Function to go to previous page
  handleItemGuessInputChange: func, // Function to change input text of player guess
  hasNext: bool, // Has next page
  hasPrevious: bool, // Has previous page
  isExpired: bool, // Is game expired
  isGameFinished: bool, // Is game finished
  isGameReady: bool, // Is game ready to start
  itens: arrayOf(object), // Char itens to display
  itensPerPage: number, // Maximum itens on each page. Used to display placeholders.
  loadCharacterInfo: func, // Function to load character info
  name: string, // Player name
  openHintModal: func, // Function to open modal
  play: bool, // Is game playing
  saveGameData: func, // Function to save game data
  score: number, // Player score
  startGame: func // Function to start a game
};

export default withRouter(QuizContainer(Quiz));
