import React, { Component } from "react";
import {
  oneOfType,
  instanceOf,
  Date,
  object,
  string,
  bool,
  number
} from "prop-types";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Title from "../Title";
import CountDown from "../CountDown/CountDown";
import Icon from "../Icons";
import { ModalInstructions } from "../Modal";
import { ModalRanking } from "../Modal";

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
    const {
      sizeLogo,
      title,
      dateTimeLimit,
      isStarted,
      isVisible,
      timePlaceholder
    } = this.props;
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
          <CountDown
            dateTimeLimit={dateTimeLimit}
            isStarted={isStarted}
            isVisible={isVisible}
            timePlaceholder={timePlaceholder}
          />
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
  dateTimeLimit: oneOfType([instanceOf(Date), string]).isRequired, // DateTime limit to finish game
  isStarted: bool.isRequired, // Timer is started
  isVisible: bool, // Timer is visible
  timePlaceholder: number.isRequired
};

Header.defaultProps = {
  sizeLogo: {},
  title: "",
  dateTimeLimit: 0
};

export default Header;
