import React, { Component } from "react";
import Modal from "react-modal";
import { func, bool } from "prop-types";
import close from "./close.svg";

class ModalInput extends Component {
  render() {
    return (
      <Modal show={this.state.isOpen} onClose={this.toggleModal}>
        <h2>Escreva o nome do personagem:</h2>
        <form onSubmit={this.props.onSubmit}>
          <Label>Nome:</Label>
          <InputText type="text" name={data.name} id={data.name} />
          <div class="flex items-center justify-center pa4">
            <button class="f5 no-underline dark-blue bg-animate hover-bg-white hover-white inline-flex items-center pa3 ba br2 border-box mr4 pointer">
              ENVIAR
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

export default ModalInput;
