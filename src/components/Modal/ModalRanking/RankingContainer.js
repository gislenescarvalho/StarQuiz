import React from "react";
import { string, number, arrayOf, shape, func, bool } from "prop-types";
import _ from "lodash";

const RankingContainer = Component =>
  class extends React.Component {
    static propTypes = {
      data: arrayOf(
        shape({
          email: string,
          name: string,
          score: number
        })
      ).isRequired,
      modalIsClosed: func.isRequired,
      modalRankingIsOpen: bool.isRequired
    };

    constructor(props) {
      super(props);

      this.state = {};
      const myArray = [
        {
          name: "Anakin Skywalker",
          score: 100
        },
        {
          name: "Luke Skywalker",
          score: 200
        }
      ];

      this.data = _.orderBy(myArray, ["score"], ["desc"]);
    }

    render() {
      return <Component {...this.props} {...this.state} games={this.data} />;
    }
  };

export default RankingContainer;
