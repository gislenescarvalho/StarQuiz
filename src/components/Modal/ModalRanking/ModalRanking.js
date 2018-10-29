import React, { Component } from "react";
import Modal from "react-modal";
import { func, bool, string, shape, arrayOf, number } from "prop-types";
import close from "../close.svg";
import RankingContainer from "./RankingContainer";
import styles from "./ModalRanking.module.css";

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
  const { games, modalRankingIsOpen, modalIsClosed } = props;

  return (
    <Modal
      isOpen={modalRankingIsOpen}
      onRequestClose={modalIsClosed}
      style={customStyles}
      className={styles.modalRanking}
      ariaHideApp={false}
    >
      <div className={styles.closeModal}>
        <img src={close} alt="Fechar" onClick={modalIsClosed} />
      </div>
      <div className={styles.rankingWrapper}>
        <div className={styles.title}>Ranking</div>

        <div className={styles.content}>
          {games.length
            ? games.map((game, i) => (
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
    </Modal>
  );
};

ModalRanking.propTypes = {
  games: arrayOf(
    shape({
      email: string,
      name: string,
      score: number
    })
  ).isRequired,
  modalIsClosed: func.isRequired,
  modalRankingIsOpen: bool.isRequired
};

export default RankingContainer(ModalRanking);
