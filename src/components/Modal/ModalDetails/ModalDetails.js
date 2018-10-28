import React, { Component } from "react";
import { string, number } from "prop-types";

class ModalDetails extends Component {
  render() {
    const { specie, height, hair, planet, movies, vehicles } = this.props;

    return (
      <article class="bg-white br3 center mw5 ba b--black-10 mv4">
        <title>Detalhes</title>
        <img
          src="http://tachyons.io/img/cat-720.jpg"
          class="w-100 db"
          alt="Closeup photo of a tabby cat yawning."
        />
        <div class="pa3">
          <small class="gray db pv2">
            Espécie - <b>{specie}</b>
          </small>
          <small class="gray db pv2">
            Altura - <b>{height}</b>
          </small>
          <small class="gray db pv2">
            Cor do cabelo - <b>{hair}</b>
          </small>
          <small class="gray db pv2">
            Planeta - <b>{planet}</b>
          </small>
          <small class="gray db pv2">
            Filmes - <i>{movies}</i>
          </small>
          <small class="gray db pv2">
            Veículos - <i>{vehicles}</i>
          </small>
        </div>
      </article>
    );
  }
}

ModalDetails.propTypes = {
  specie: string,
  height: number,
  hair: string,
  planet: string,
  movies: string,
  vehicles: string
};
ModalDetails.defaultProps = {
  specie: "Human",
  height: 172,
  hair: "Blond",
  planet: "Tatooine",
  movies:
    "The Empire Strikes Back, A New Hope, The Force Awakens, Revenge of Sith, The Last Jedi",
  vehicles: "Snowspeeder, Imperial Speeder Bike"
};

export default BackCard;
