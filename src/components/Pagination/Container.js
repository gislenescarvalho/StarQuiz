import React from "react";
import { func, bool } from "prop-types";

const Container = Component =>
  class extends React.Component {
    static propTypes = {
      goToNextPage: func.isRequired, // Function to go to next page
      goToPreviousPage: func.isRequired, // Function to go to previous page
      hasNext: bool.isRequired, // Has next page
      hasPrevious: bool.isRequired // Has previous page
    };

    constructor(props) {
      super(props);

      this.state = {};
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };

export default Container;
