import React, { Component } from "react";
import ProgressiveImage from "react-progressive-image";
import styles from "./Cards.module.css";
import {
  oneOfType,
  arrayOf,
  shape,
  func,
  string,
  number,
  bool
} from "prop-types";
import CardsContainer from "./CardsContainer";
import { ModalDetails } from "../Modal";

class Cards extends Component {
  render() {
    const {
      closeHintModal,
      handleInputChange,
      id,
      imageUrl,
      isPlaceholder,
      openedModal,
      openHintModal,
      play,
      playerGuess
    } = this.props;
    return (
      <article class="bg-white br3 center mw5 ba b--black-10 mv4">
        <ProgressiveImage src={imageUrl}>
          {(src, loading) => (
            <img
              style={{ opacity: loading ? 0.5 : 1 }}
              src={imageUrl}
              className={`db center ${styles.imageCard}`}
              alt="Star Wars Character"
            />
          )}
        </ProgressiveImage>

        <div class="flex items-center justify-center pa4">
          {!isPlaceholder
            ? [
                <div
                  class="f5 no-underline dark-blue bg-animate hover-bg-white hover-white inline-flex items-center pa3 ba br2 border-box mr4 pointer"
                  onClick={() => {
                    openHintModal(id);
                  }}
                >
                  <span className={styles.question}>?</span>
                </div>,
                <form class="pa4 black-80">
                  <div class="measure">
                    <input
                      id="name"
                      class="input-reset ba b--black-20 pa2 mb2 db w-100"
                      placeholder="Personagem"
                      value={playerGuess}
                      onChange={event => {
                        handleInputChange(event, id);
                      }}
                    />
                  </div>
                </form>
              ]
            : [
                <div key="placeholder-1" className={styles.placeholder} />,
                <div
                  key="placeholder-2"
                  className={`${styles.placeholder} ${styles.isButton}`}
                />
              ]}
        </div>
        <ModalDetails
          modalIsClosed={() => {
            closeHintModal(id);
          }}
          modalDetailsIsOpen={openedModal && play}
        />
      </article>
    );
  }
}

Cards.propTypes = {
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
  ])
};

export default CardsContainer(Cards);
