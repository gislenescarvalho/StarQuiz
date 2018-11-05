import React from "react";
import {
  string,
  oneOfType,
  arrayOf,
  shape,
  number,
  func,
  bool
} from "prop-types";

const DetailsContainer = Component =>
  class extends React.Component {
    static propTypes = {
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
      id: oneOfType([number, string]),
      imageUrl: string,
      loadDetailsCharacter: func, // Function to load char info
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

    constructor(props) {
      super(props);

      this.state = {};
    }

    componentDidMount() {
      // const { id, loadDetailsCharacter } = this.props;
      // loadDetailsCharacter(id);
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };

export default DetailsContainer;
