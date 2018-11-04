import React, { Component } from "react";
import Modal from "react-modal";
import { func, bool } from "prop-types";
import close from "./close.svg";

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

class ModalInput extends Component {
  render() {
    return (
      <Modal
        isOpen={modalInputIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className={styles.modalInput}
        ariaHideApp={false}
      >
        <div className={styles.closeModal}>
          <img src={close} alt="Fechar" onClick={modalIsClosed} />
        </div>
        <h2>Escreva o nome do personagem:</h2>
        <form onSubmit={onSubmit}>
          <label>Nome:</label>
          <input type="text" name="characterName" />
          <div class="flex items-center justify-center pa4">
            <button
              type="submit"
              class="f5 no-underline dark-blue bg-animate hover-bg-white hover-white inline-flex items-center pa3 ba br2 border-box mr4 pointer"
            >
              ENVIAR
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

ModalInput.propTypes = {
  modalIsClosed: func.isRequired,
  modalInputIsOpen: bool.isRequired,
  onSubmit: func.isRequired
};

export default ModalInput;
