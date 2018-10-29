import React, { Component } from "react";
import Modal from "react-modal";
import { string, bool, oneOfType, arrayOf, shape, func } from "prop-types";
import close from "../close.svg";
import styles from "./ModalDetails.module.css";
import DetailsContainer from "./DetailsContainer";

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

const ModalDetails = props => {
  const {
    films,
    hair_color,
    height,
    homeworld,
    species,
    vehicles,
    imageUrl,
    modalDetailsIsOpen,
    modalIsClosed
  } = props;

  const imageStyles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  };

  //"http://tachyons.io/img/cat-720.jpg"

  return (
    <Modal
      isOpen={modalDetailsIsOpen}
      onRequestClose={modalIsClosed}
      style={customStyles}
      className={styles.modalDetails}
      ariaHideApp={false}
    >
      <div className={styles.closeModal}>
        <img src={close} alt="Fechar" onClick={modalIsClosed} />
      </div>
      <div class="bg-white br3 center mw5 ba b--black-10 mv4">
        <title>Detalhes</title>
        <div className={styles.detailsWrapper}>
          <div className="w-100 db" style={imageStyles} />
          <div class="pa3">
            <small class="gray db pv2">
              Espécie -{" "}
              <b>
                {species.length
                  ? species.map(
                      (specie, i) =>
                        `${specie.name}${i + 1 < species.length ? ", " : "."}`
                    )
                  : "-"}
              </b>
            </small>
            <small class="gray db pv2">
              Altura - <b>{height}</b>
            </small>
            <small class="gray db pv2">
              Cor do cabelo - <b>{hair_color.length ? hair_color : "-"}</b>
            </small>
            <small class="gray db pv2">
              Planeta - <b>{homeworld.length ? homeworld.name : "-"}</b>
            </small>
            <small class="gray db pv2">
              Filmes -{" "}
              <i>
                {films.length
                  ? films.map(
                      (film, i) =>
                        `${film.title}${i + 1 < films.length ? ", " : "."}`
                    )
                  : "-"}
              </i>
            </small>
            <small class="gray db pv2">
              Veículos -{" "}
              <i>
                {vehicles.length
                  ? vehicles.map(
                      (vehicle, i) =>
                        `${vehicle.name}${i + 1 < vehicles.length ? ", " : "."}`
                    )
                  : "-"}
              </i>
            </small>
          </div>
        </div>
      </div>
    </Modal>
  );
};

ModalDetails.propTypes = {
  birth_year: string,
  eye_color: string,
  films: oneOfType([
    arrayOf(string),
    arrayOf(
      shape({
        title: string
      })
    )
  ]),
  gender: string,
  hair_color: string,
  height: string,
  homeworld: oneOfType([
    string,
    shape({
      name: string
    })
  ]),
  imageUrl: string,
  mass: string,
  skin_color: string,
  species: oneOfType([
    arrayOf(string),
    arrayOf(
      shape({
        name: string
      })
    )
  ]),
  starships: oneOfType([
    arrayOf(string),
    arrayOf(
      shape({
        name: string
      })
    )
  ]),
  vehicles: oneOfType([
    arrayOf(string),
    arrayOf(
      shape({
        name: string
      })
    )
  ]),
  modalIsClosed: func.isRequired,
  modalDetailsIsOpen: bool.isRequired
};
// ModalDetails.defaultProps = {
//   specie: "Human",
//   height: 172,
//   hair: "Blond",
//   planet: "Tatooine",
//   movies:
//     "The Empire Strikes Back, A New Hope, The Force Awakens, Revenge of Sith, The Last Jedi",
//   vehicles: "Snowspeeder, Imperial Speeder Bike"
// };

export default DetailsContainer(ModalDetails);
