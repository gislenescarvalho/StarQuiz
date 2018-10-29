import React, { Component, Fragment } from "react";
import styles from "./ModalInstructions.module.css";
import Modal from "react-modal";
import { func, bool } from "prop-types";
import close from "../close.svg";

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

class ModalInstructions extends Component {
  render() {
    const {
      modalInstructionsIsOpen,
      closeModal,
      modalIsClosed,
      instructionIsAccepted
    } = this.props;
    return (
      <Fragment>
        <Modal
          isOpen={modalInstructionsIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          className={styles.modalInstruction}
          ariaHideApp={false}
        >
          <div className={styles.closeModal}>
            <img src={close} alt="Fechar" onClick={modalIsClosed} />
          </div>
          <div className={styles.contentTitleInstruction}> Instruções</div>
          <div className={styles.contentInstruction}>
            <div className={styles.paddingBodyInstruction}>
              <p>
                StarQuiz! é um quiz para medir o seu conhecimento sobre os
                personagens do vasto universo Star Wars. As principais regras
                são:{" "}
              </p>
              <ol>
                <li>
                  Você tem o tempo máximo de 2 minutos para acertar o maior
                  número possível de personagens;
                </li>
                <li>
                  Para cada personagem que você acertar receberá 10 pontos;
                </li>
                <li>
                  Caso consulte os detalhes sobre o personagem você receberá
                  somente 5 pontos por cada acerto;
                </li>
                <li>
                  O usuário poderá errar quantas vezes quiser, sem afetar sua
                  pontuação;
                </li>
                <li>
                  O usuário não poderá responder mais de uma vez ao mesmo
                  personagem;
                </li>
                <li>
                  Ao finalizar o jogo abrirá um modal informando a pontuação
                  ganha com um formulário para informar o Nome e E-mail do
                  jogador a ser gravado no Ranking.
                </li>
              </ol>
              Observações importantes sobre os cards dos personagens:
              <ul>
                <li>
                  <b>'?'</b>: Exibe um input para o usuario digitar o nome do
                  personagem;
                </li>
                <li>
                  <b>'...'</b>: Exibe os dados do personagem (exceto o nome).
                </li>
              </ul>
              <div className={styles.line} />
              <div className={styles.alignButton}>
                <button
                  className={styles.buttonConfirm}
                  onClick={instructionIsAccepted}
                >
                  MAY THE FORCE BE WITH YOU
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

ModalInstructions.propTypes = {
  modalIsClosed: func.isRequired,
  modalInstructionsIsOpen: bool.isRequired,
  instructionIsAccepted: func.isRequired
};

export default ModalInstructions;
