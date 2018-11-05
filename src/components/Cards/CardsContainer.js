import React from "react";
import {
  oneOfType,
  arrayOf,
  shape,
  func,
  string,
  number,
  bool
} from "prop-types";

const CardsContainer = Component =>
  class extends React.Component {
    static propTypes = {
      birth_year: string,
      eye_color: string,
      closeHintModal: func, // Function that treats when a modal is closed.
      films: oneOfType([
        arrayOf(
          shape({
            title: string
          })
        ),
        arrayOf(string)
      ]),
      gender: string,
      hair_color: string,
      handleInputChange: func, // Function that sets the user answer for this answer.
      height: string,
      homeworld: oneOfType([
        shape({
          name: string
        }),
        string
      ]),
      id: oneOfType([string, number]), // Necessary to verify the answers.
      imageUrl: string,
      isPlaceholder: bool,
      mass: string,
      openedModal: bool, // Open modal with hints.
      openHintModal: func, // Function that treats when a modal is opened.
      play: bool, // Is game playing
      playerGuess: string, // Player answer for that item.
      skin_color: string,
      species: oneOfType([
        arrayOf(
          shape({
            name: string
          })
        ),
        arrayOf(string)
      ]),
      starships: oneOfType([
        arrayOf(
          shape({
            name: string
          })
        ),
        arrayOf(string)
      ]),
      vehicles: oneOfType([
        arrayOf(
          shape({
            name: string
          })
        ),
        arrayOf(string)
      ]),
      showDetails: func.isRequired,
      showInput: func.isRequired
    };

    static defaultProps = {
      openedModal: false
    };

    constructor(props) {
      super(props);

      this.state = {};
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };

export default CardsContainer;
