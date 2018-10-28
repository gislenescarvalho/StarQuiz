import React, { Component } from "react";
import Modal from "react-modal";
import { func, bool, string, shape, arrayOf } from "prop-types";
import close from "../close.svg";
import RankingContainer from "./RankingContainer";

const customStyles = {
  content: {
    overflow: "hidden",
    background: "#fff",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "left"
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .6)"
  }
};

const ModalRanking = props => {
  const { games } = props;

  const gamesDefault = {
    name: "Chewie",
    email: "chewie@chewie.com",
    score: 3000
  };

  return (
    <div className={styles.rankingWrapper}>
      <div className={styles.title}>Ranking</div>

      <div className={styles.content}>
        {gamesDefault.length
          ? gamesDefault.map((game, i) => (
              <div key={`${game}-${i}`} className={styles.item}>
                <div className={styles.position}>
                  {i + 1} - {game.name}
                </div>
                <div>Pontuação: {game.score}</div>
              </div>
            ))
          : "huurh uughghhhgh"}
      </div>
    </div>
  );
};

ModalRanking.propTypes = {
  games: arrayOf(
    shape({
      // Data to display at the ranking
      email: string,
      name: string,
      score: number
    })
  ).isRequired,
  modalIsClosed: func.isRequired,
  modalRankingIsOpen: bool.isRequired
};

export default RankingContainer(ModalRanking);
