import React, { Component } from "react";
import Modal from "react-modal";
import { func, bool, string } from "prop-types";
import close from "../close.svg";
import styles from "./ModalInput.module.css";

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
    const { modalInputIsOpen, modalIsClosed, onSubmit, data } = this.props;
    return (
      <Modal
        isOpen={modalInputIsOpen}
        onRequestClose={modalIsClosed}
        style={customStyles}
        className={styles.modalInput}
        ariaHideApp={false}
      >
        <div className={styles.closeModal}>
          <img src={close} alt="Fechar" onClick={modalIsClosed} />
        </div>
        <title class="mt30">Escreva o nome do personagem:</title>
        <div class="flex items-center justify-center pa4 ">
          <form onSubmit={onSubmit}>
            <label>Nome:</label>
            <input type="text" name={data.name} id={data.name} />

            <button
              type="submit"
              class="f5 dark-green bg-animate hover-bg-yellow hover-black inline-flex items-center pa3 ba br2 border-box mr4 pointer"
            >
              ENVIAR
            </button>
          </form>
        </div>
      </Modal>
    );
  }
}

ModalInput.propTypes = {
  modalIsClosed: func.isRequired,
  modalInputIsOpen: bool.isRequired,
  onSubmit: func.isRequired,
  data: string.isRequired
};

export default ModalInput;
