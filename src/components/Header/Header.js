import React, { Component } from "react";
import { object, string, number } from "prop-types";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Title from "../Title";
import CountDown from "../CountDown/CountDown";
import Icon from "../Icons";
import ModalInstructions from "../Modal/ModalInstructions/ModalInstructions";
import ModalRanking from "../Modal/ModalRanking/ModalRanking";

class Header extends Component {
  state = {
    modalInstructionsIsOpen: false,
    modalRankingIsOpen: false
  };

  showInstructions = () => this.setState({ modalInstructionsIsOpen: true });

  showRanking = () => this.setState({ modalRankingIsOpen: true });

  closeModal = modal => this.setState({ [modal]: false });

  instructionIsAccepted = () =>
    this.setState({ modalInstructionsIsOpen: false });

  render() {
    const { sizeLogo, title, time } = this.props;
    const { modalInstructionsIsOpen, modalRankingIsOpen } = this.state;

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

          <Icon
            name="Ranking"
            height={28}
            width={28}
            className={styles.showRanking}
            onClick={this.showRanking}
          />
        </div>
        <div className="Grid-cell u-sm-size5of12 u-md-size4of12 u-lg-size4of12">
          <div className="Grid u-flexAlignItemsCenter">
            <Logo size={sizeLogo} />
            <Link to="/" className={styles.logoLink}>
              <Title> {title} </Title>
            </Link>
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
        <ModalRanking
          modalIsClosed={() => this.closeModal("modalRankingIsOpen")}
          modalRankingIsOpen={modalRankingIsOpen}
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
