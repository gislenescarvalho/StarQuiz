import React, { Component } from "react";
import { object, string, number } from "prop-types";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import Title from "../Title";
import CountDown from "../CountDown/CountDown";
import Icon from "../Icons";
import ModalInstructions from "../Modal/ModalInstructions/ModalInstructions";

class Header extends Component {
  state = {
    modalInstructionsIsOpen: false
  };

  showInstructions = () => this.setState({ modalInstructionsIsOpen: true });

  closeModal = modal => this.setState({ [modal]: false });

  instructionIsAccepted = () =>
    this.setState({ modalInstructionsIsOpen: false });

  render() {
    const { sizeLogo, title, time } = this.props;
    const { modalInstructionsIsOpen } = this.state;

    return (
      <div className="Grid">
        <div className="Grid-cell u-sm-size5of12 u-md-size4of12 u-lg-size4of12 u-flex u-flexJustifyStart">
          <Icon
            name="Question"
            height={25}
            width={25}
            className={styles.showInstructions}
            onClick={this.showInstructions}
          />
        </div>
        <div className="Grid-cell u-sm-size5of12 u-md-size4of12 u-lg-size4of12">
          <div className="Grid u-flexAlignItemsCenter">
            <Logo size={sizeLogo} />
            <Title> {title} </Title>
          </div>
        </div>
        <div className="Grid-cell u-sm-size5of12 u-md-size4of12 u-lg-size4of12 u-flex u-flexJustifyEnd">
          <CountDown time={time} />
        </div>
        <ModalInstructions
          modalInstructionsIsOpen={modalInstructionsIsOpen}
          modalIsClosed={() => this.closeModal("modalInstructionsIsOpen")}
          instructionIsAccepted={this.instructionIsAccepted}
        />
      </div>
    );
  }
}

Header.propTypes = {
  sizeLogo: object,
  title: string,
  time: number
};

Header.defaultProps = {
  sizeLogo: {},
  title: "",
  time: 0
};

export default Header;
