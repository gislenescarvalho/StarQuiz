import React, { Component } from "react";
import _ from "lodash";
import Header from "../../components/Header/Header";
import Card from "../../components/Cards/Cards";
import styles from "./Game.module.css";
import { ModalDetails } from "../../components/Modal";
import { ModalInput } from "../../components/Modal";
import { ModalResult } from "../../components/Modal";

class Game extends Component {
  state = {
    title: "StarQuiz!",
    sizeLogo: {
      lg: 70,
      md: 50,
      sm: 40
    },
    //time: 120000,
    time: 10000,
    showModalDetails: false,
    showModalInput: false,
    showModalResult: false,
    value: "",
    inputsValues: []
  };

  openModalShowDetails = () => {
    this.setState({ showModalDetails: true });
  };

  openModalInput = () => {
    this.setState({ showModalInput: true });
  };

  closeModal = modal => this.setState({ [modal]: false });

  openModalResult = () => {
    const { time } = this.props;
    if (!time) return this.setState({ showModalResult: true });
  };

  handleSubmit(event) {
    const data = this.state;
    const valueTarget = event.target[0].value;
    event.preventDefault();

    Object.values(data)[0].map(value => {
      return value.name === valueTarget
        ? this.setState(prevState => ({
            inputsValues: prevState.inputsValues.concat(valueTarget)
          }))
        : "";
    });
  }

  render() {
    const {
      sizeLogo,
      value,
      title,
      time,
      showModalDetails,
      showModalInput,
      showModalResult
    } = this.state;
    return (
      <div className={`${styles.container} Grid-cell`}>
        <Header
          sizeLogo={sizeLogo}
          title={title}
          time={time}
          handleTimeIsUp={this.openModalResult}
        />

        <section>
          <div class="cf pa2">
            <div class="fl w-50 w-25-m w-20-l pa2">
              <Card
                showDetails={this.openModalShowDetails}
                showInput={this.openModalInput}
              />
            </div>
          </div>
        </section>
        <ModalDetails
          modalIsClosed={() => this.closeModal("showModalDetails")}
          modalDetailsIsOpen={showModalDetails}
        />
        <ModalInput
          modalIsClosed={() => this.closeModal("showModalInput")}
          modalInputIsOpen={showModalInput}
          onSubmit={this.handleSubmit}
          data={value}
        />
        <ModalResult
          modalIsClosed={() => this.closeModal("showModalResult")}
          modalResultIsOpen={showModalResult}
        />
      </div>
    );
  }
}

export default Game;
