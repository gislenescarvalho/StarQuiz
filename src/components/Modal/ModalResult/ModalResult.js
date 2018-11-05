import React from "react";
import { Link, withRouter } from "react-router-dom";
import Modal from "react-modal";
import Loading from "./../../Loading/Loading";
import ResultContainer from "./ResultContainer";
import { func, bool, string, number, object } from "prop-types";
import styles from "./ModalResult.module.css";
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
const ModalResult = props => {
  const {
    email,
    formErrors,
    handleInputChange,
    hasResult,
    loading,
    loadingMessage,
    name,
    playerEmail,
    playerName,
    saveGameData,
    score,
    modalResultIsOpen,
    modalIsClosed
  } = props;

  return (
    <Modal
      isOpen={modalResultIsOpen}
      onRequestClose={modalIsClosed}
      style={customStyles}
      className={styles.modalResult}
      ariaHideApp={false}
    >
      <div className={styles.closeModal}>
        <img src={close} alt="Fechar" onClick={modalIsClosed} />
      </div>
      <div className={styles.gameData}>
        {loading ? (
          <div className={styles.loading}>
            <Loading isOpen={loading} />
            <div key="info" className={styles.info}>
              {loadingMessage}
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.score}>
              Pontuação:
              <span> {score ? score : 0} </span>
              pontos
            </div>

            {!hasResult ? (
              <div>
                <div className={styles.text}>
                  Preencha o formulário abaixo para salvar sua pontuação:
                </div>

                <div className={styles.inputsContainer}>
                  <label>Nome:</label>
                  <input
                    {...formErrors.name && { error: !!formErrors.name }}
                    className={styles.textField}
                    name="name"
                    onChange={handleInputChange}
                    value={name}
                  />
                  <span class="mt0 dark-red">{formErrors.name}</span>
                  <label>E-mail:</label>
                  <input
                    {...formErrors.email && { error: !!formErrors.email }}
                    className={styles.textField}
                    name="email"
                    onChange={handleInputChange}
                    value={email}
                  />
                  <span class="mt0 dark-red">
                    {formErrors.email ? formErrors.email : ""}
                  </span>
                </div>

                <div
                  className={`f6 link dim ba bw1 ph3 pv2 mb2 pa10 dib dark-blue pointer ${
                    styles.button
                  }`}
                  onClick={saveGameData}
                >
                  Salvar
                </div>
              </div>
            ) : (
              <div className={styles.resultData}>
                <div>Nome: {playerName}</div>
                <div>Email: {playerEmail}</div>
                <Link to="/" className={styles.button}>
                  Voltar
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

ModalResult.propTypes = {
  email: string, // Email input if data has not been saved yet
  formErrors: object, // Object containing form validation data. Ex: {'input-name': 'error message'}
  handleInputChange: func.isRequired, // Function to change input text
  hasResult: bool.isRequired, // Game has a result
  loading: bool.isRequired, // Is result being loaded
  loadingMessage: string.isRequired, // Message to display while loading
  name: string, // Name input if data has not been saved yet
  playerEmail: string, // Player email if game has already been saved
  playerName: string, // Player name if game has already been saved
  saveGameData: func.isRequired, // Function to save game data
  score: number,
  modalIsClosed: func,
  modalResultIsOpen: bool // Game score
};
ModalResult.defaultProps = {
  modalResultIsOpen: false
};

export default withRouter(ResultContainer(ModalResult));
